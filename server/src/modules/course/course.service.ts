import { Attachment, Course, Purchase } from "./course.model";
import logger from "../../utils/logger";
import { ICourse } from "../../types";
import ApiError from "../../utils/apiError";
import { Chapter } from "../chapter/chapter.model";

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

  static async getCourseByIdService(data: { id: string; userId: string }) {
    const course = await Course.findOne({ _id: data.id, authorId: data.userId })
      .populate("attachments")
      .populate("chapters");

    if (!course) throw new ApiError(404, "Course not found or unauthorized");

    logger.info(`Fetched course: ${course.title}`);
    return course;
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

  static async deleteCourseService(id: string, userId: string) {
    const course = await Course.findOne({ _id: id, userId });
    if (!course) {
      throw new ApiError(404, "Course not found or unauthorized");
    }
    // Cascade delete related documents
    await Attachment.deleteMany({ courseId: id });
    await Chapter.deleteMany({ courseId: id });
    // await Purchase.deleteMany({ courseId: id });
    await course.deleteOne();
    logger.info(`Course deleted: ${course.title}`);
    return course;
  }
}

export default CourseService;
