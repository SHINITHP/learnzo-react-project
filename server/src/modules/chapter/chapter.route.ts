import express from "express";
import { authMiddleware } from "../../middleware/auth";
import {
  createChapter,
  updatePosition,
  getChapterById,
  updateChapter,
  publishChapter,
  createDirectUpload,
  finalizeMuxUpload,
} from "./chapter.controller";

const router = express.Router();

router.post("/create", authMiddleware, createChapter);
router.post("/mux/upload-video", authMiddleware, createDirectUpload);
router.post("/mux/upload-video/complete", authMiddleware, finalizeMuxUpload);
router.put("/reorder/:id", authMiddleware, updatePosition);
router
  .route("/:courseId/:id")
  .get(authMiddleware, getChapterById)
  .put(authMiddleware, updateChapter);
router.patch("/:courseId/:id/publish", authMiddleware, publishChapter)


export default router;
