import express from "express";
import {
  getCourseById,
  getCourses,
} from "./course.controller";
import { authMiddleware } from "../../middleware/auth";

const router = express.Router();

router.get("/", authMiddleware, getCourses);
router.get("/:id", authMiddleware, getCourseById);

export default router;
