import { Attachment, Course, Purchase } from "./course.model";
import logger from "../../utils/logger";
import { IChapter, ICourse, IModule } from "../../types";
import ApiError from "../../utils/apiError";
import { Chapter } from "../chapter/chapter.model";
import mongoose from "mongoose";
import { Module } from "../module/module.model";

class CourseService {
  static async createCourseService(courseData: {
    authorId: string;
    title: string;
  }) {
    if (!courseData.title) throw new ApiError(400, "Title required!");

    const course = new Course(courseData);
    await course.save();

    logger.info(`Course created: ${course.title}`);
    return course;
  }
  

  static async createAttachmentService(
    AttachmentsData: {
      name: string;
      url: string;
      courseId: string;
      authorId: string;
    }[]
  ) {
    const attachment = await Attachment.insertMany(AttachmentsData);

    const attachmentIds = attachment.map((att) => att._id);

    return attachmentIds;
  }

  static async togglePublishCourseService({
    authorId,
    id,
    publish,
  }: {
    authorId: string;
    id: string;
    publish: boolean;
  }) {
    if (!authorId || !id) throw new ApiError(400, "Missing required fields");

    const course = await Course.findOne({
      _id: new mongoose.Types.ObjectId(id),
      authorId,
    })  .populate<{ modules: IModule[] }>("modules");
    if (!course) throw new ApiError(404, "Course not found or unauthorized");

    const hasPublishedModule = course.modules.some(
      (module) => module.isPublished
    );

    if (
      !course.title ||
      !course.description ||
      !course.imageUrl ||
      !course.categoryId ||
      !hasPublishedModule
    )
      throw new ApiError(401, "Missing required fields");

    // Update the chapter to published
    course.isPublished = publish;
    await course.save();

    return course;
  }

  static async getCourseByIdService(data: { id: string; userId: string }) {
    const course = await Course.findOne({ _id: data.id, authorId: data.userId })
      .populate("attachments")
      .populate("chapters")
      .populate("modules");

    if (!course) throw new ApiError(404, "Course not found or unauthorized");

    logger.info(`Fetched course: ${course.title}`);
    return course;
  }

  static async getCoursesService() {
    const courses = await Course.find({})
      .populate('chapters')
      .populate("attachments")
      .populate("categoryId", "name")
      .populate("authorId", "fullName email")
      .lean();

    if (!courses) throw new ApiError(404, "No courses found");

    return courses;
  }

  static async updateCourseService(data: {
    id: string;
    updates: Partial<ICourse>;
    userId: string;
  }) {
    const course = await Course.findOne({
      _id: data.id,
      authorId: data.userId,
    });
    if (!course) {
      throw new ApiError(404, "Course not found or unauthorized");
    }
    Object.assign(course, data.updates);
    await course.save();
    logger.info(`Course updated: ${course.title}`);
    return course;
  }

  static async deleteCourseService(id: string, authorId: string) {
    const course = await Course.findOne({ _id: id, authorId });
    if (!course) {
      throw new ApiError(404, "Course not found or unauthorized");
    }
    // Cascade delete related documents
    await Attachment.deleteMany({ courseId: id });
    await Module.deleteMany({ courseId: id });
    await Chapter.deleteMany({ courseId: id });
    // await Purchase.deleteMany({ courseId: id });
    await course.deleteOne();
    logger.info(`Course deleted: ${course.title}`);
    return course;
  }
}

export default CourseService;
