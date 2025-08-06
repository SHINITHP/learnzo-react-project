import express from "express";
import {
  getCourseById,
  getCourses,
} from "./user.course.controller";
import { authMiddleware } from "../../middleware/auth.middleware";

const router = express.Router();

router.get("/",  getCourses);
router.get("/:id", authMiddleware , getCourseById);

export default router;
