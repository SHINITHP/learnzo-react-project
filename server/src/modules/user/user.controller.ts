import { Request, Response, NextFunction } from "express";
import logger from "../../utils/logger";
import AuthService from "./user.service";
import ApiResponse from "../../utils/apiResponse";
import ApiError from "../../utils/apiError";
import { User } from "./user.model";

export const signUpUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    logger.info(`Received sign-up request : ${JSON.stringify(req.body)}`);

    const { fullName, email, password, confirmPassword } = req.body;
    const result = await AuthService.signUp({
      fullName,
      email,
      password,
      confirmPassword,
    });

    ApiResponse.success(res, "OTP sended successfully!", result, 201);
  } catch (error) {
    logger.error("Error in sign-up:", error);
    next(error);
  }
};

export const verify = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, otp, token } = req.body;
    const result = await AuthService.verifyOTP({ email, otp, token });

    res.cookie("refreshToken", result.refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    ApiResponse.success(
      res,
      "User Created successfully!",
      { user: result.user, token: result.accessToken },
      201
    );
  } catch (error) {
    logger.error("Error in verify:", error);
    next(error);
  }
};

export const signInUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    logger.info(`Received sign-in request : ${JSON.stringify(req.body)}`);

    const { email, password } = req.body;

    const result = await AuthService.signIn({ email, password });

    res.cookie("refreshToken", result.refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    logger.info(`User logged in successfully: ${email}`);

    ApiResponse.success(
      res,
      "User logged successfully!",
      { user: result.user, token: result.accessToken },
      200
    );
  } catch (error) {
    logger.error("Error in sign-in:", error);
    next(error);
  }
};

export const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const refreshToken = req.cookies.refreshToken;
    logger.info(`Refresh Token  called!!, : ${refreshToken}`);

    if (!refreshToken) {
      return next(new ApiError(401, "No token provided"));
    }

    const result = await AuthService.refreshToken(refreshToken);

    res.cookie("refreshToken", result.refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    ApiResponse.success(
      res,
      "New access token generated",
      { token: result.accessToken, user: result.user },
      200
    );
  } catch (error: any) {
    console.log("error in refreshTOken", error);
    next(new ApiError(403, error));
  }
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.cookies.refreshToken;

    const user = await User.findOne({ refreshToken: token });

    if (user) {
      user.refreshToken = undefined;
      await user.save();
    }

    res.clearCookie("refreshToken", {
      httpOnly: true,
      sameSite: "strict",
      secure: false,
    });

    ApiResponse.success(res, "logout successful", {}, 204);

  } catch (error: any) {
    console.log("error in Logout", error);
    next(new ApiError(403, error));
  }
};
