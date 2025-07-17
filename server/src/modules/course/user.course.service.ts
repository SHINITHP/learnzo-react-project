import ApiError from "../../utils/apiError";
import logger from "../../utils/logger";
import { Course } from "./course.model";

class UserCourseService {
  static async getCourseByIdService(id: string) {
    const course = await Course.findOne({ _id: id, isPublished: true })
      .populate("attachments")
      .populate("chapters");

    if (!course) throw new ApiError(404, "Course not found or unauthorized");

    logger.info(`Fetched course: ${course.title}`);
    return course;
  }

  static async getCoursesService() {
    const course = await Course.find({ isPublished: true })
      .populate({
        path: "chapters",
        match: { isPublished: true },
      })
      .populate("attachments")
      .lean();

    if (!course) throw new ApiError(404, "No courses found");

    return course;
  }
}


export default UserCourseService;
