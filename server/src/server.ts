import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import logger from "./utils/logger";
import { connectDB } from "./config/db";
dotenv.config();

import userRoutes from './modules/user/user.routes';
import adminRoutes from './modules/admin/admin.routes';
import adminCourseRoutes from './modules/course/admin.course.routes';
import userCourseRoute from './modules/course/user.course.routes';
import courseRoutes from './modules/course/admin.course.routes';
import categoryRoutes from './modules/category/category.route';
import userCategoryRoutes from './modules/category/user.category.route';
import chapterRoutes from './modules/chapter/chapter.route';
import { errorHandler } from "./middleware/errorHandler";
import cookieParser from "cookie-parser";
import { uploadthingRouter } from "./utils/uploadthings";
const PORT = process.env.PORT || 3000;


const app = express();

// Middleware
app.use(
  cors({
    origin: ["http://localhost:4000" , "http://localhost:5000"], // Allow all origins (Change this in production)
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH","OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "authorization"],
  })
);
app.use(cookieParser()); 
app.use(express.json());
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});


// Routes
app.use("/api/auth", userRoutes);
app.use("/api/admin/auth", adminRoutes);
app.use("/api/admin/courses", adminCourseRoutes);
app.use("/api/user/courses", userCourseRoute);
app.use("/api/admin/categories", categoryRoutes);
app.use("/api/user/categories", userCategoryRoutes);
app.use("/api/admin/chapter", chapterRoutes);

//Error handling
app.use(errorHandler);

app.listen(PORT, async () => {
  await connectDB();
  logger.info(`Server running on port ${PORT}`);
});
