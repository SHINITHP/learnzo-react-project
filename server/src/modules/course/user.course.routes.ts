import express from "express";
import {
  getCourseById,
  getCourses,
} from "./user.course.controller";
import { authMiddleware } from "../../middleware/auth";

const router = express.Router();

router.get("/",  getCourses);
router.get("/:id", getCourseById);

export default router;
