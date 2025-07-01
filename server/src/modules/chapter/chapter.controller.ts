import { Request, Response, NextFunction } from "express";
import logger from "../../utils/logger";
import ChapterServices from "./chapter.services";
import ApiResponse from "../../utils/apiResponse";

export const createChapter = async (
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

    const newChapter = await ChapterServices.chapterCreationService(
      chapterData
    );

    logger.info(`Chapter Created successful: ${newChapter}`);

    ApiResponse.success(res, "Chapter created successfully", newChapter, 201);
  } catch (error) {
    logger.error("Error in [ChapterCreation]:", error);
    next(error);
  }
};

export const getChapterById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    logger.info(`Received fetch request : ${JSON.stringify(req.params.id)}`);

    const { id } = req.params;
    const userId = (req as any).user.id;

    const chapter = await ChapterServices.getChapterByIdService({ id, userId });
    logger.info(`Chapter fetched successful: ${chapter.title}`);

    ApiResponse.success(res, "Chapter Fetched successfull", chapter, 200);
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

    const course = await ChapterServices.updateChapterPositions(
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
    logger.error("Error in [ChapterUpdation]:", error);
    next(error);
  }
};

export const publishChapter = async (
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

    const chapter = await ChapterServices.togglePublishChapterService({
      chapterId: id,
      courseId,
      authorId,
      publish
    });

    logger.info(`Chapter successfully ${publish? "published" : "unpublished"}: ${chapter.title}`);
    ApiResponse.success(res, `Chapter ${publish? "published" : "unpublished"} successful`, chapter, 200);
    
  } catch (error) {
    logger.error("Error in [ChapterPublish]:", error);
    next(error);
  }
};

export const updateChapter = async (
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
    const userId = (req as any).user.id;
    const updates = req.body;

    const chapter = await ChapterServices.updateChapterService({
      id,
      courseId,
      updates,
      userId,
    });

    logger.info(`Chapter updated successfull: ${chapter.title}`);
    ApiResponse.success(res, "Chapter updated successfull", chapter, 200);
  } catch (error) {
    logger.error("Error in [ChapterCreation]:", error);
    next(error);
  }
};
