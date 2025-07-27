import { Request, Response, NextFunction } from "express";
import logger from "../../utils/logger";
import ChapterServices from "./chapter.services";
import ApiResponse from "../../utils/apiResponse";
import { mux } from "../../utils/mux";

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

export const createDirectUpload = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    logger.info(
      `Received Mux direct upload request: ${JSON.stringify(req.body)}`
    );

    const result = await ChapterServices.UploadChapterVideoService();

    logger.info(`Mux direct upload created successfully: ${result.upload_id}`);

    ApiResponse.success(
      res,
      "Mux direct upload created successfully",
      {
        url: result.url,
        upload_id: result.upload_id,
      },
      201
    );
  } catch (err) {
    logger.error("Failed to create Mux direct upload", err);
    next(err);
  }
};

export const finalizeMuxUpload = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    logger.info(
      `Received Mux finalizeMuxUpload request: ${JSON.stringify(req.body)}`
    );

    const { upload_id } = req.body;
    if (!upload_id) {
      throw new Error("Upload ID is required");
    }

    const result = await ChapterServices.finalizeMuxUploadService(upload_id);

    logger.info(`Mux direct upload created successfully: ${result.playbackId}`);

    ApiResponse.success(
      res,
      "Mux direct upload created successfully",
      {
        asset_id: result.assetId,
        playback_id: result.playbackId,
      },
      201
    );
  } catch (err) {
    logger.error("Failed to create Mux direct upload", err);
    next(err);
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
    logger.error("Error in [ChapterPositionUpdation]:", error);
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
    logger.error("Error in [ChapterUpdation]:", error);
    next(error);
  }
};
