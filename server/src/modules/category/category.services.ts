import ApiError from "../../utils/apiError";
import logger from "../../utils/logger";
import { Category } from "./category.model";

class CategoryService {
  static async getCategoriesService() {
      const categories = await Category.find();
      if(!categories) throw new ApiError(404,"No category found")
      logger.info(`Fetched ${categories.length} categories`);
      return categories;
  }
}

export default CategoryService;
