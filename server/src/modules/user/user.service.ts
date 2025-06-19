import { ISignInData, ISignUpData, IVerifyOTP } from "../../types";
import ApiError from "../../utils/apiError";
import { generateToken } from "../../utils/generateToken";
import logger from "../../utils/logger";
import {
  createOTPToken,
  generateOTP,
  sendOTP,
  verifyOTPToken,
} from "../../utils/otp";
import RefreshToken from "./refreshToken.model";
import { User } from "./user.model";

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
}

export default AuthService;
