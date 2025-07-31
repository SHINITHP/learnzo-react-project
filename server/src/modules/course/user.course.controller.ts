import { NextFunction, Request, Response } from "express";
import CourseService from "./admin.course.service";
import logger from "../../utils/logger";
import ApiResponse from "../../utils/apiResponse";
import UserCourseService from "./user.course.service";

export const getCourseById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    logger.info(`Received fetch request : ${JSON.stringify(req.body)}`);

    const { id } = req.params;

    const course = await UserCourseService.getCourseByIdService(id);
    logger.info(`Course fetched successful: ${course.title}`);

    ApiResponse.success(res, "Course Fetched successfull", course, 200);
  } catch (error) {
    logger.error("Error in [CourseGetByID]:", error);
    next(error);
  }
};

export const getCourses = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    logger.info(`Received fetch request : ${JSON.stringify(req.body)}`);

    const course = await CourseService.getCoursesService();
    logger.info(`Fetched course: ${course.length} courses found`);

    ApiResponse.success(res, "Course Fetched successfull", course, 200);
  } catch (error) {
    logger.error("Error in [CourseGetByID]:", error);
    next(error);
  }
};
