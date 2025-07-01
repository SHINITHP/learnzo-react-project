import express from "express";
import { authMiddleware } from "../../middleware/auth";
import {
  createChapter,
  updatePosition,
  getChapterById,
  updateChapter,
  publishChapter,
} from "./chapter.controller";

const router = express.Router();

router.post("/create", authMiddleware, createChapter);
router
  .route("/:courseId/:id")
  .get(authMiddleware, getChapterById)
  .put(authMiddleware, updateChapter);
router.patch("/:courseId/:id/publish", authMiddleware, publishChapter)

router.put("/reorder/:id", authMiddleware, updatePosition);

export default router;
