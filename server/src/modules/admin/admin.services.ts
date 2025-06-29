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
import jwt from 'jsonwebtoken';

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

  static async refreshToken(refreshToken: string) {
    try {
      if (!refreshToken) {
        throw new ApiError(403, "No refresh token provided.");
      }

      const decoded = jwt.decode(refreshToken) as jwt.JwtPayload | null;

      if (decoded && decoded.exp && Date.now() >= decoded.exp * 1000) {
        throw new ApiError(403, "Refresh token expired.");
      }

      const admin = verifyJWTToken(refreshToken);
      logger.info(`user :: ${admin}`);
      if (!admin) {
        throw new ApiError(403, "Invalid refresh token.");
      }

      const { accessToken } = await generateToken({
        userId: admin.userId,
        email: admin.email,
      });

      logger.info(`New access token generated for user: ${admin.userId}`);

      return { token: accessToken, admin };
    } catch (error: any) {
      logger.error(`Refresh token error: ${error.message}`);
      throw new ApiError(403, "Invalid or expired refresh token.");
    }
  }
}

export default AuthService;
