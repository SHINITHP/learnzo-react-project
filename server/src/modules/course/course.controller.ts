import { NextFunction, Request, Response } from "express";
import CourseService from "./course.service";
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

    const attachmentIds = await CourseService.createAttachmentService(AttachmentsData);
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
  } catch (error) {}
};
