import express from "express";
import { authMiddleware } from "../../middleware/auth.middleware";
import {
  createChapter,
  updatePosition,
  getChapterById,
  updateChapter,
  publishChapter,
  createDirectUpload,
  finalizeMuxUpload,
  deleteChapter,
} from "./chapter.controller";

const router = express.Router();

router.post("/create", authMiddleware, createChapter);
router.post("/mux/upload-video", authMiddleware, createDirectUpload);
router.post("/mux/upload-video/complete", authMiddleware, finalizeMuxUpload);
router.put("/reorder/:id/:moduleId", authMiddleware, updatePosition);
router
  .route("/:courseId/:id")
  .get(authMiddleware, getChapterById)
  .put(authMiddleware, updateChapter);
router.patch("/:courseId/:id/publish", authMiddleware, publishChapter)
router.delete("/:courseId/module/:moduleId/delete-chapter/:chapterId", authMiddleware, deleteChapter)


export default router;
