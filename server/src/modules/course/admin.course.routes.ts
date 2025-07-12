import express from "express";
import {
  createAttachments,
  createCourse,
  getCourseById,
  publishChapter,
  updateCourse,
} from "./course.controller";
import { authMiddleware } from "../../middleware/auth";

const router = express.Router();

router.post("/", authMiddleware, createCourse);
router.post("/attachments", authMiddleware, createAttachments);
router
  .route("/:id")
  .get(authMiddleware, getCourseById)
  .patch(authMiddleware, updateCourse);
router.patch("/:id/publish", authMiddleware, publishChapter);

export default router;
