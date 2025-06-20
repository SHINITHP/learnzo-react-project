import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import logger from "./utils/logger";
import { connectDB } from "./config/db";
dotenv.config();

import userRoutes from './modules/user/user.routes'
import { errorHandler } from "./middleware/errorHandler";
const PORT = process.env.PORT || 3000;


const app = express();

// Middleware
app.use(
  cors({
    origin: ["http://localhost:4000" , "http://localhost:5000"], // Allow all origins (Change this in production)
    credentials: true,
    methods: "GET, POST, PUT, DELETE, PATCH",
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

// Routes
app.use("/api/auth", userRoutes);

//Error handling
app.use(errorHandler);

app.listen(PORT, async () => {
  console.log("API Key:", process.env.SENDGRID_API_KEY);
  await connectDB();
  logger.info(`Server running on port ${PORT}`);
});
