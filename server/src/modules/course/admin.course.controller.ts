import { NextFunction, Request, Response } from "express";
import CourseService from "./admin.course.service";
import logger from "../../utils/logger";
import ApiResponse from "../../utils/apiResponse";
import ApiError from "../../utils/apiError";

export const createCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    logger.info(
      `Received Course creation request : ${JSON.stringify(req.body)}`
    );

    const courseData = {
      title: req.body.title,
      authorId: (req as any).user.id,
    };

    const course = await CourseService.createCourseService(courseData);
    logger.info(`User created course successfully: ${course}`);
    ApiResponse.success(res, "Course created successfull", course, 200);
  } catch (error: any) {
    logger.error("Error in [CourseCreation]:", error);
    next(error);
  }
};

export const deleteCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    logger.info(
      `Received Course deletion request : ${JSON.stringify(req.body)}`
    );

    const { id } = req.params;
    const authorId = (req as any).user.id;

    const course = await CourseService.deleteCourseService(id, authorId);
    logger.info(`User deleted course successfully: ${course}`);
    ApiResponse.success(res, "Course deleted successfull", course, 200);

  } catch (error: any) {
    logger.error("Error in [CourseDeletion]:", error);
    next(error);
  }
};

export const publishCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    logger.info(
      `Received Course publish updation request: ${JSON.stringify(req.params.id)} ${
        (req as any).user.id
      }`
    );

    const { id } = req.params;
    const authorId = (req as any).user.id;
    console.log("authorId", authorId)
    const { publish } = req.body;

    const course = await CourseService.togglePublishCourseService({
      id,
      authorId,
      publish,
    });

    logger.info(
      `Course successfully ${publish ? "published" : "unpublished"}: ${
        course.title
      }`
    );
    ApiResponse.success(
      res,
      `Course ${publish ? "published" : "unpublished"} successful`,
      course,
      200
    );
  } catch (error) {
    logger.error("Error in [CoursePublish]:", error);
    next(error);
  }
};

export const createAttachments = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    logger.info(
      `Received Attachment creation request : ${JSON.stringify(req.body)}`
    );

    const { attachments } = req.body;
    const authorId = (req as any).user.id;

    if (!Array.isArray(attachments) || attachments.length === 0) {
      throw new ApiError(400, "No attachments provided");
    }

    const AttachmentsData = attachments.map((att) => ({
      ...att,
      authorId,
    }));

    const attachmentIds = await CourseService.createAttachmentService(
      AttachmentsData
    );
    logger.info(`Attachment created successfully: ${attachmentIds}`);

    res.json({ ids: attachmentIds });
  } catch (error: any) {
    logger.error("Error in [AttachmentCreation]:", error);
    next(error);
  }
};

export const getCourseById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    logger.info(`Received fetch request : ${JSON.stringify(req.body)}`);

    const { id } = req.params;
    const userId = (req as any).user.id;

    const course = await CourseService.getCourseByIdService({ id, userId });
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

export const updateCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    logger.info(
      `Received Course updation request : ${JSON.stringify(req.body)}`
    );

    const { id } = req.params;
    const userId = (req as any).user.id;
    const updates = req.body;

    const course = await CourseService.updateCourseService({
      id,
      updates,
      userId,
    });

    logger.info(`course updated successfull: ${course}`);
    ApiResponse.success(res, "Course updated successfull", course, 200);
  } catch (error) {
    logger.error("Error in [CourseCreation]:", error);
    next(error);
  }
};
