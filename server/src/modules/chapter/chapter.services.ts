import mongoose from "mongoose";
import ApiError from "../../utils/apiError";
import { Course } from "../course/course.model";
import { Chapter } from "./chapter.model";
import logger from "../../utils/logger";
import { IChapter } from "../../types";

export default class ChapterServices {
  static async chapterCreationService(chapterData: {
    courseId: string;
    title: string;
    authorId: string;
  }) {
    if (!chapterData.title) throw new ApiError(400, "Chapter title required!");

    const courseOwner = await Course.findOne({
      _id: new mongoose.Types.ObjectId(chapterData.courseId),
      authorId: chapterData.authorId,
    }).lean();

    console.log(
      "authorId :",
      chapterData.courseId,
      chapterData.authorId,
      courseOwner
    );

    if (!courseOwner) {
      throw new ApiError(401, "Unauthorized or chapter not found");
    }

    const lastChapter = await Chapter.findOne({
      courseId: chapterData.courseId,
    }).sort({ position: -1 });
    const newPosition = lastChapter ? lastChapter.position + 1 : 1;

    const chapter = await Chapter.create({
      title: chapterData.title,
      courseId: chapterData.courseId,
      position: newPosition,
    });

    const updateResult = await Course.updateOne(
      { _id: chapterData.courseId },
      { $push: { chapters: chapter._id } }
    );

    if (updateResult.modifiedCount === 0) {
      throw new ApiError(500, "Failed to update course with new chapter");
    }

    return chapter;
  }

  static async updateChapterService(data: {
    id: string;
    courseId: string;
    updates: Partial<IChapter>;
    userId: string;
  }) {
    const chapter = await Chapter.findOne({
      _id: data.id,
      courseId: data.courseId,
    });
    if (!chapter) {
      throw new ApiError(404, "Chapter not found or unauthorized");
    }
    Object.assign(chapter, data.updates);
    await chapter.save();
    logger.info(`Chapter updated: ${chapter.title}`);
    return chapter;
  }

  static async getChapterByIdService({
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

    const chapter = await Chapter.findOne({ _id: id }).populate("courseId");

    if (
      !chapter ||
      !chapter.courseId ||
      (chapter.courseId as any).authorId?.toString() !== userId
    ) {
      throw new ApiError(404, "Chapter not found or unauthorized");
    }

    logger.info(`Fetched chapter : ${chapter.title}`);
    return chapter;
  }

  static async togglePublishChapterService({
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

    const chapter = await Chapter.findOne({
      _id: new mongoose.Types.ObjectId(chapterId),
      courseId,
    });
    if (!chapter) throw new ApiError(404, "Chapter not found or unauthorized");

    // Update the chapter to published
    chapter.isPublished = publish;
    await chapter.save();

    if (!publish) {
      const publishedChapterInCourse = await Chapter.find({
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

  static async updateChapterPositions(
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
        await Chapter.findByIdAndUpdate(id, { position }, { new: true });
      }

      // Update course.chapters array to reflect new order
      const sortedChapters = updateData
        .sort((a, b) => a.position - b.position)
        .map(({ id }) => new mongoose.Types.ObjectId(id));
      course.chapters = sortedChapters;
      await course.save();

      logger.info(`Reordered chapters for course ${courseId}`);
      return course.populate("chapters");
    } catch (error) {
      logger.error("Error in updateChapterPositions:", error);
      throw error;
    }
  }
}
