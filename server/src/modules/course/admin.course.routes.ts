import express from "express";
import {
  createAttachments,
  createCourse,
  deleteCourse,
  getCourseById,
  getCourses,
  publishCourse,
  updateCourse,
} from "./admin.course.controller";
import { authMiddleware } from "../../middleware/auth.middleware";

const router = express.Router();

router.post("/", authMiddleware, createCourse);
router.get("/get-courses",  getCourses);
router.post("/attachments", authMiddleware, createAttachments);
router
  .route("/:id")
  .get(authMiddleware, getCourseById)
  .patch(authMiddleware, updateCourse);
router.patch("/:id/publish", authMiddleware, publishCourse);
router.delete("/delete-course/:id", authMiddleware, deleteCourse)


export default router;
