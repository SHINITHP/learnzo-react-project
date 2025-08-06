import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import logger from "../utils/logger";

export interface AuthRequest extends Request {
  user?: { id: string; email: string; role: string };
}

export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (
    !authHeader ||
    typeof authHeader !== "string" ||
    !authHeader.startsWith("Bearer ")
  ) {
    logger.error("Unauthorized access attempt: No token provided or invalid format");
    res.status(401).json({ message: "Unauthorized: No token provided" });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
      email: string;
      role: string;
    };

    req.user = { id: decoded.userId, email: decoded.email, role: decoded.role };
    next(); // no return needed here
  } catch (err: any) {
    logger.error("JWT verification failed:", err);
    if (err) {
      res.status(401).json({ message: "Access token expired" });
      return;
    }

    res.status(403).json({ message: "Invalid token" });
    return;
  }
};
