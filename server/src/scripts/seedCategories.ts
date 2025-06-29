import mongoose from 'mongoose';
import dotenv from 'dotenv';
import logger from '../utils/logger';
import { Category } from '../modules/course/course.model';

dotenv.config();

const categories = [
  { name: 'Programming' },
  { name: 'Data Science' },
  { name: 'Web Development' },
  { name: 'Machine Learning' },
  { name: 'Design' },
  { name: 'Business' },
];

async function seedCategories() {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    logger.info('Connected to MongoDB');

    await Category.deleteMany({});
    logger.info('Cleared existing categories');

    await Category.insertMany(categories);
    logger.info('Inserted sample categories');

    await mongoose.disconnect();
    logger.info('Disconnected from MongoDB');
  } catch (error) {
    logger.error('Error seeding categories:', error);
    process.exit(1);
  }
}

seedCategories();