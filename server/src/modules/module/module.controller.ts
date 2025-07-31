import { Request, Response, NextFunction } from "express";
import logger from "../../utils/logger";
import ModuleServices from "./module.services";
import ApiResponse from "../../utils/apiResponse";
import { mux } from "../../utils/mux";

export const createModule = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    logger.info(
      `Received Chapter creation request: ${JSON.stringify(req.body)}`
    );

    const chapterData = {
      authorId: (req as any).user.id,
      title: req.body.title,
      courseId: req.body.courseId,
    };

    const newChapter = await ModuleServices.ModuleCreationService(
      chapterData
    );

    logger.info(`Chapter Created successful: ${newChapter}`);

    ApiResponse.success(res, "Chapter created successfully", newChapter, 201);
  } catch (error) {
    logger.error("Error in [ChapterCreation]:", error);
    next(error);
  }
};

export const getModuleById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    logger.info(`Received fetch request : ${JSON.stringify(req.params.id)}`);

    const { id } = req.params;
    const userId = (req as any).user.id;

    const module = await ModuleServices.getModuleByIdService({ id, userId });
    logger.info(`Module fetched successful: ${module.title}`);

    ApiResponse.success(res, "Module Fetched successfull", module, 200);
  } catch (error) {
    logger.error("Error in [ChapterGetByID]:", error);
    next(error);
  }
};

export const updatePosition = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    logger.info(
      `Received Chapter update position request: ${JSON.stringify(
        req.params.id
      )} ${(req as any).user.id}`
    );

    const { id: courseId } = req.params;
    const { list: updateData } = req.body;
    const authorId = (req as any).user.id;

    console.log("Update Data:", updateData, courseId, authorId);

    const course = await ModuleServices.updateModulePositions(
      courseId,
      updateData,
      authorId
    );

    logger.info(`Chapter Updated successful`);

    ApiResponse.success(
      res,
      "Chapter re-ordered successfully",
      course.chapters,
      200
    );
  } catch (error) {
    logger.error("Error in [ChapterPositionUpdation]:", error);
    next(error);
  }
};

export const publishModule = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    logger.info(
      `Received Chapter updation request: ${JSON.stringify(req.params.id)} ${
        (req as any).user.id
      }`
    );

    const { id, courseId } = req.params;
    const authorId = (req as any).user.id;
    const { publish } = req.body;

    const chapter = await ModuleServices.togglePublishModuleService({
      chapterId: id,
      courseId,
      authorId,
      publish,
    });

    logger.info(
      `Chapter successfully ${publish ? "published" : "unpublished"}: ${
        chapter.title
      }`
    );
    ApiResponse.success(
      res,
      `Chapter ${publish ? "published" : "unpublished"} successful`,
      chapter,
      200
    );
  } catch (error) {
    logger.error("Error in [ChapterPublish]:", error);
    next(error);
  }
};

export const updateModule = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    logger.info(
      `Received Module updation request: ${JSON.stringify(req.params.id)} ${
        (req as any).user.id
      }`
    );

    const { id, courseId } = req.params;
    const userId = (req as any).user.id;
    const updates = req.body;

    const chapter = await ModuleServices.updateModuleService({
      id,
      courseId,
      updates,
      userId,
    });

    logger.info(`Module updated successfull: ${chapter.title}`);
    ApiResponse.success(res, "Module updated successfull", chapter, 200);
  } catch (error) {
    logger.error("Error in [ModuleUpdation]:", error);
    next(error);
  }
};

export const deleteModule = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    logger.info(
      `Received Module deletion request : ${JSON.stringify(req.body)}`
    );

    const { courseId, moduleId } = req.params;
    const authorId = (req as any).user.id;

    const course = await ModuleServices.deleteModuleService(courseId, moduleId, authorId);
    logger.info(`User deleted Module successfully: ${course}`);
    ApiResponse.success(res, "Module deleted successfull", course, 200);

  } catch (error: any) {
    logger.error("Error in [ModuleDeletion]:", error);
    next(error);
  }
};
