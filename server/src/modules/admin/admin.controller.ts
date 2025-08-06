import { Request, Response, NextFunction } from "express";
import logger from "../../utils/logger";
import ApiResponse from "../../utils/apiResponse";
import AuthService from "./admin.services";
import ApiError from "../../utils/apiError";

export const signInAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    logger.info(`Received admin sign-in request : ${JSON.stringify(req.body)}`);

    const { email, password } = req.body;

    const result = await AuthService.signIn({ email, password });
    logger.warn(`Refresh Token : ${result.refreshToken}`)
    res.cookie("refreshToken", result.refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    logger.info(`Admin logged in successfully: ${email}`);

    ApiResponse.success(
      res,
      "Admin logged successfully!",
      { admin: result.admin, token: result.accessToken },
      200
    );
  } catch (error) {
    logger.error("Error in admin sign-in:", error);
    next(error);
  };

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
      { token: result.accessToken, admin: result.user },
      200
    );
  } catch (error: any) {
    console.log("error in refreshTOken", error);
    next(new ApiError(403, error));
  }
};
