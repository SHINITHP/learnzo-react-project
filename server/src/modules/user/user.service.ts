import { ISignInData, ISignUpData, IVerifyOTP } from "../../types";
import ApiError from "../../utils/apiError";
import { generateToken, verifyJWTToken } from "../../utils/generateToken";
import logger from "../../utils/logger";
import {
  createOTPToken,
  generateOTP,
  sendOTP,
  verifyOTPToken,
} from "../../utils/otp";
import RefreshToken from "./refreshToken.model";
import { User } from "./user.model";
import jwt from "jsonwebtoken";

class AuthService {
  static async signUp(data: ISignUpData) {
    const { fullName, email, password, confirmPassword } = data;

    // check if the user is already exist or not :-
    const isUserExist = await User.findOne({ email });
    if (isUserExist) throw new ApiError(400, "Email already exists");

    const user = new User({ fullName, email, password, status: "pending" });
    await user.save();

    const otp = generateOTP();
    const token = createOTPToken(email, otp);

    await sendOTP(email, otp, token);

    logger.info(`User registered, OTP sent: ${email}`);

    return { email, token };
  }

  static async refreshToken(token: string) {
    try {
      if (!token) {
        throw new ApiError(401, "No refresh token provided.");
      }

      const payload: any = jwt.verify(token, process.env.JWT_SECRET!);
      console.log("payload : -", payload)
      const user = await User.findById(payload.userId);

      if (!user || user.refreshToken !== token)
        throw new ApiError(403, "Refresh token expired.");

      const { accessToken, refreshToken: newRefreshToken } =
        await generateToken({
          userId: user._id.toString(),
          email: user.email,
          role: user.role,
        });

      user.refreshToken = newRefreshToken;
      await user.save();

      return {
        user: {
          userId: user._id,
          email: user.email,
        },
        accessToken,
        refreshToken: newRefreshToken,
      };
      // const decoded = jwt.decode(refreshToken) as jwt.JwtPayload | null;

      // if (decoded && decoded.exp && Date.now() >= decoded.exp * 1000) {
      //   throw new ApiError(403, "Refresh token expired.");
      // }

      // const admin = verifyJWTToken(refreshToken);
      // logger.info(`user :: ${admin}`);
      // if (!admin) {
      //   throw new ApiError(403, "Invalid refresh token.");
      // }

      // const { accessToken } = await generateToken({
      //   userId: admin.userId,
      //   email: admin.email,
      //   role: admin.role,
      // });

      // logger.info(`New access token generated for user: ${admin.userId}`);

      // return { token: accessToken, admin };
    } catch (error: any) {
      logger.error(`Refresh token error: ${error.message}`);
      throw new ApiError(403, "Invalid or expired refresh token.");
    }
  }

  static async verifyOTP(data: IVerifyOTP) {
    const { email: verifiedEmail } = verifyOTPToken(data.token, data.otp);
    if (verifiedEmail !== data.email) {
      logger.warn(`Email mismatch for OTP verification: ${data.email}`);
      throw new ApiError(400, "Invalid email");
    }

    const user = await User.findOne({ email: data.email }).select("-password");
    if (!user || user.status !== "pending") {
      logger.warn(`Invalid user or already verified: ${data.email}`);
      throw new ApiError(400, "Invalid user or already verified");
    }

    user.status = "verified";
    await user.save();

    //generate token
    const { accessToken, refreshToken } = await generateToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    });

    await RefreshToken.create({
      user: user._id,
      token: refreshToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    logger.info(`OTP verified for ${data.email}`);
    return {
      user: {
        userId: user._id,
        email: user.email,
      },
      accessToken,
      refreshToken,
    };
  }

  static async signIn(data: ISignInData) {
    const { email, password } = data;

    // check user exist or not
    const user = await User.findOne({ email });
    if (!user) {
      logger.warn(`Login failed - User not found: ${email}`);
      throw new ApiError(400, "User not Found.");
    }

    if (user.role !== "student") {
      logger.warn(
        `Login failed - Access denied for non-student user: ${email}`
      );
      throw new ApiError(400, "Access denied for non-student user.");
    }

    //compare hashed password
    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      logger.warn(`Login failed - Incorrect password for user: ${email}`);
      throw new ApiError(400, "Incorrect password.");
    }

    //Generate JWT token
    const { accessToken, refreshToken } = await generateToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    });

    //set refreshToken to user DB.
    user.refreshToken = refreshToken;
    await user.save();

    // Fallback to store in DB if Redis fails
    // try {
    //   await RefreshToken.create({
    //     user: user._id,
    //     token: refreshToken,
    //     expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    //   });
    // } catch (error) {
    //   logger.error(`Error While storing refresh Token to DB ${error}`);
    // }

    // Return success response with tokens
    return {
      user: {
        userId: user._id,
        email: user.email,
      },
      accessToken,
      refreshToken,
    };
  }
}

export default AuthService;
