import { ISignInData } from "../../types";
import ApiError from "../../utils/apiError";
import { generateToken, verifyJWTToken } from "../../utils/generateToken";
import logger from "../../utils/logger";
import {
  createOTPToken,
  generateOTP,
  sendOTP,
  verifyOTPToken,
} from "../../utils/otp";
import { User } from "../user/user.model";
import jwt from "jsonwebtoken";

class AuthService {
  static async signIn(data: ISignInData) {
    const { email, password } = data;

    // check user exist or not
    const admin = await User.findOne({ email, role: "admin" });
    if (!admin) {
      logger.warn(`Login failed - User not found: ${email}`);
      throw new ApiError(400, "User not Found.");
    }

    if (admin.role !== "admin") {
      logger.warn(`Login failed - Access denied for non-admin user: ${email}`);
      throw new ApiError(400, "Access denied for non-admin user.");
    }

    //compare hashed password
    const isPasswordMatch = await admin.comparePassword(password);
    if (!isPasswordMatch) {
      logger.warn(`Login failed - Incorrect password for user: ${email}`);
      throw new ApiError(400, "Incorrect password.");
    }

    //Generate JWT token
    const { accessToken, refreshToken } = await generateToken({
      userId: admin._id.toString(),
      email: admin.email,
      role: admin.role,
    });

    // Return success response with tokens
    return {
      admin: {
        adminId: admin._id,
        email: admin.email,
      },
      accessToken,
      refreshToken,
    };
  }

  static async refreshToken(token: string) {
    try {
      if (!token) {
        throw new ApiError(401, "No refresh token provided.");
      }

      const payload: any = jwt.verify(token, process.env.JWT_SECRET!);
      console.log("payload : -", payload);
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
    } catch (error: any) {
      logger.error(`Refresh token error: ${error.message}`);
      throw new ApiError(403, "Invalid or expired refresh token.");
    }
  }
}

export default AuthService;
