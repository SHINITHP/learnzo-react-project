import { Request, Response, NextFunction } from "express";
import ApiError from "../utils/apiError";
import logger from "../utils/logger"; // adjust if needed

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err instanceof ApiError ? err.statusCode : 500;
  const message = err instanceof ApiError ? err.message : "Internal Server Error";

  logger.error(`[${statusCode}] ${message}`);

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
  });
};
