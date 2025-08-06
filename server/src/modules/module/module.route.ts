import express from "express";
import { authMiddleware } from "../../middleware/auth.middleware";
import {
  createModule,
  updatePosition,
  getModuleById,
  updateModule,
  publishModule,
  deleteModule,
} from "./module.controller";

const router = express.Router();

router.post("/create", authMiddleware, createModule);
router.put("/reorder/:id", authMiddleware, updatePosition);
router
  .route("/:courseId/:id")
  .get(authMiddleware, getModuleById)
  .put(authMiddleware, updateModule);
router.patch("/:courseId/:id/publish", authMiddleware, publishModule)
router.delete("/:courseId/delete-course/:moduleId", authMiddleware, deleteModule)


export default router;
