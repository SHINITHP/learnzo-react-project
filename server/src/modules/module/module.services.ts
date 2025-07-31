import mongoose from "mongoose";
import ApiError from "../../utils/apiError";
import { Attachment, Course } from "../course/course.model";
import { Module } from "./module.model";
import logger from "../../utils/logger";
import { IChapter } from "../../types";
import { mux } from "../../utils/mux";
import { Chapter } from "../chapter/chapter.model";

export default class ModuleServices {
  static async ModuleCreationService(chapterData: {
    courseId: string;
    title: string;
    authorId: string;
  }) {
    if (!chapterData.title) throw new ApiError(400, "Chapter title required!");

    const courseOwner = await Course.findOne({
      _id: new mongoose.Types.ObjectId(chapterData.courseId),
      authorId: chapterData.authorId,
    }).lean();

    if (!courseOwner) {
      throw new ApiError(401, "Unauthorized or chapter not found");
    }

    const lastModule = await Module.findOne({
      courseId: chapterData.courseId,
    }).sort({ position: -1 });
    const newPosition = lastModule ? lastModule.position + 1 : 1;

    const module = await Module.create({
      title: chapterData.title,
      courseId: chapterData.courseId,
      position: newPosition,
    });

    const updateResult = await Course.updateOne(
      { _id: chapterData.courseId },
      { $push: { modules: module._id } }
    );

    if (updateResult.modifiedCount === 0) {
      throw new ApiError(500, "Failed to update course with new chapter");
    }

    return module;
  }

  static async deleteModuleService(courseId: string, moduleId: string, authorId: string) {
    const course = await Course.findOne({ _id: courseId, authorId });
    if (!course) {
      throw new ApiError(404, "Course not found or unauthorized");
    }

    const module = await Module.findOne({ _id: moduleId, courseId: courseId });
    if (!module) {
      throw new ApiError(404, "Module not found or unauthorized");
    }

    // Cascade delete related documents
    await Chapter.deleteMany({ moduleId: moduleId });

    await module.deleteOne();

    //remove the module form course
    course.modules = course.modules.filter((id) => id.toString() !== moduleId);
    await course.save();
    
    logger.info(`Module deleted: ${course.title}`);
    return module;
  }

  static async updateModuleService(data: {
    id: string;
    courseId: string;
    updates: Partial<IChapter>;
    userId: string;
  }) {
    const module = await Module.findById(data.id);
    if (!module) {
      throw new ApiError(404, "Module not found or unauthorized");
    }
    Object.assign(module, data.updates);
    await module.save();
    logger.info(`Course Module: ${module.title}`);
    return module;
  }

  static async getModuleByIdService({
    id,
    userId,
  }: {
    id: string;
    userId: string;
  }) {
    if (!id) {
      throw new ApiError(404, "ChapterId not found!!");
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ApiError(400, "Invalid chapter ID format");
    }

    const module = await Module.findById(id).populate("chapters");

    if (!module) {
      throw new ApiError(404, "Module not found or unauthorized");
    }

    logger.info(`Fetched module : ${module.title}`);
    return module;
  }

  static async togglePublishModuleService({
    authorId,
    courseId,
    chapterId,
    publish,
  }: {
    authorId: string;
    courseId: string;
    chapterId: string;
    publish: boolean;
  }) {
    if (!authorId || !courseId || !chapterId)
      throw new ApiError(400, "Missing required fields");

    const course = await Course.findOne({
      _id: new mongoose.Types.ObjectId(courseId),
      authorId,
    });
    if (!course) throw new ApiError(404, "Course not found or unauthorized");

    const chapter = await Module.findById(chapterId);
    if (!chapter) throw new ApiError(404, "Chapter not found or unauthorized");

    // Update the chapter to published
    chapter.isPublished = publish;
    await chapter.save();

    if (!publish) {
      const publishedChapterInCourse = await Module.find({
        courseId,
        isPublished: true,
      });

      if (!publishedChapterInCourse.length) {
        await Course.updateOne(
          { _id: courseId },
          { $set: { isPublished: false } }
        );
      }
    }

    return chapter;
  }

  static async updateModulePositions(
    courseId: string,
    updateData: { id: string; position: number }[],
    authorId: string
  ) {
    try {
      const course = await Course.findOne({
        _id: new mongoose.Types.ObjectId(courseId),
        authorId,
      });
      if (!course) {
        throw new ApiError(401, "Course not found or unauthorized");
      }

      // Update chapter positions
      for (const { id, position } of updateData) {
        await Module.findByIdAndUpdate(id, { position }, { new: true });
      }

      // Update course.chapters array to reflect new order
      const sortedModules = updateData
        .sort((a, b) => a.position - b.position)
        .map(({ id }) => new mongoose.Types.ObjectId(id));
      course.modules = sortedModules;
      await course.save();

      logger.info(`Reordered modules for course ${courseId}`);
      return course.populate("modules");
    } catch (error) {
      logger.error("Error in updateModulePositions:", error);
      throw error;
    }
  }
}
