import mongoose from 'mongoose';
import dotenv from 'dotenv';
import logger from '../utils/logger';
import { Category } from '../modules/category/category.model';
import { Course } from '../modules/course/course.model';
import { Chapter } from '../modules/chapter/chapter.model';

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

// seedCategories();

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI as string); // replace with your actual DB URI

    const coursesData = [
      {
        title: "Mastering JavaScript Fundamentals",
        description: "Learn the core principles of modern JavaScript.",
        authorId: new mongoose.Types.ObjectId(),
        imageUrl: "https://placehold.co/600x400",
        price: 1999,
        categoryId: new mongoose.Types.ObjectId(),
        isPublished: true,
        outcomes: [
          "Understand variable scoping and hoisting clearly",
          "Master array and object manipulation techniques",
          "Build real-world projects using ES6+ features",
          "Understand asynchronous JavaScript and promises",
          "Learn DOM manipulation and event handling",
          "Gain clarity on closures and functional programming",
        ],
        languages: ["English"],
        hours: "10",
      },
      {
        title: "Backend APIs with Node and Express",
        description: "Create powerful REST APIs using Node.js and Express.",
        authorId: new mongoose.Types.ObjectId(),
        imageUrl: "https://placehold.co/600x400",
        price: 2499,
        categoryId: new mongoose.Types.ObjectId(),
        isPublished: true,
        outcomes: [
          "Build scalable REST APIs using Express framework",
          "Understand routing, middleware, and request handling",
          "Connect and query data from MongoDB database",
          "Implement authentication and authorization techniques",
          "Write clean and modular Express code structure",
          "Debug and test APIs with Postman and Jest",
        ],
        languages: ["English"],
        hours: "12",
      },
    ];

    for (const courseData of coursesData) {
      const course = new Course(courseData);
      await course.save();

      const chapters = [
        {
          title: "Introduction & Setup",
          position: 1,
          courseId: course._id,
          isPublished: true,
          isFree: true,
          description: "Setup environment and understand the course structure",
        },
        {
          title: "Deep Dive into Core Concepts",
          position: 2,
          courseId: course._id,
          isPublished: true,
          isFree: false,
          description: "Explore important programming principles in depth.",
        },
        {
          title: "Final Project",
          position: 3,
          courseId: course._id,
          isPublished: true,
          isFree: false,
          description: "Build a full-featured project to apply concepts.",
        },
      ];

      await Chapter.insertMany(chapters);
    }

    console.log("✅ Seeding complete");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
}

seed();


