import { Request, Response, NextFunction } from 'express';
import logger from '../../utils/logger';
import ChapterServices from './chapter.services';
import ApiResponse from '../../utils/apiResponse';

export const createChapter = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    logger.info(`Received Chapter creation request: ${JSON.stringify(req.body)}`);

    const chapterData = {
      authorId: (req as any).user.id,
      title: req.body.title,
      courseId: req.body.courseId,
    };

    const newChapter = await ChapterServices.chapterCreationService(chapterData);

    logger.info(`Chapter Created successful: ${newChapter}`);

    ApiResponse.success(res, 'Chapter created successfully', newChapter, 201);
  } catch (error) {
    logger.error('Error in [ChapterCreation]:', error);
    next(error);
  }
};

export const updateChapter = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    logger.info(
      `Received Chapter updation request: ${JSON.stringify(req.params.id)} ${(req as any).user.id}`
    );

    const { id: courseId } = req.params;
    const { list: updateData } = req.body;
    const authorId = (req as any).user.id;

    const course = await ChapterServices.updateChapterPositions(courseId, updateData, authorId);

    logger.info(`Chapter Updated successful`);

    ApiResponse.success(res, 'Chapter re-ordered successfully', course.chapters, 200);
  } catch (error) {
    logger.error('Error in [ChapterUpdation]:', error);
    next(error);
  }
};