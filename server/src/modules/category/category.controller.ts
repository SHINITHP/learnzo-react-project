import { NextFunction, Request, Response } from "express";
import logger from "../../utils/logger";
import ApiResponse from "../../utils/apiResponse";
import CategoryService from "./category.services";

export const getCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
    try {
    logger.info(
      `Received getCategories request : ${JSON.stringify(req.body)}`
    );

    const categories = await CategoryService.getCategoriesService();
    logger.info(`Category data fetched successfull: ${categories}`);
    ApiResponse.success(res, "Category data fetched successfull", categories, 200);
  } catch (error: any) {
    logger.error("Error in [CategoryFetch]:", error);
    next(error);
  }
}