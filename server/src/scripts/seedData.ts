import mongoose, { Types } from "mongoose";
import dotenv from "dotenv";
import { Module } from "../modules/module/module.model";
import { Course } from "../modules/course/course.model";
import { Chapter } from "../modules/chapter/chapter.model";
import { IChapter } from "../types";

dotenv.config();
async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("✅ Connected to DB");

    const authorId = new Types.ObjectId("6858f3d2160b1d15c8c0fa48");

    const courseData = [
      {
        title: "Frontend Mastery with React",
        description: "Deep dive into modern React development.",
        outcomes: [
          "Build reusable React components effectively",
          "Understand the React rendering lifecycle clearly",
          "Master hooks including useEffect and useMemo",
          "Implement context API and global state",
          "Integrate API data using fetch and axios",
          "Optimize performance with React best practices",
        ],
      },
      {
        title: "Fullstack Web Development Bootcamp",
        description: "End-to-end web development with MERN stack.",
        outcomes: [
          "Design responsive frontend using Tailwind CSS",
          "Build RESTful APIs using Express.js",
          "Integrate MongoDB with Mongoose efficiently",
          "Handle user authentication with JWT tokens",
          "Deploy applications on cloud platforms easily",
          "Debug and test both frontend and backend",
        ],
      },
      {
        title: "Advanced TypeScript Programming",
        description: "Master advanced TypeScript features and tooling.",
        outcomes: [
          "Write safe and scalable TypeScript code",
          "Understand generics and advanced types",
          "Use utility types like Partial and Omit",
          "Integrate TypeScript with React projects",
          "Enforce API contracts using interfaces",
          "Set up tsconfig for large applications",
        ],
      },
      {
        title: "Modern Python for Developers",
        description: "Become proficient in Python for real-world use.",
        outcomes: [
          "Write clean and readable Python scripts",
          "Understand Python’s object-oriented features",
          "Use built-in functions and modules smartly",
          "Handle file I/O and error exceptions",
          "Work with virtual environments and pip",
          "Create automation and data scripts easily",
        ],
      },
      {
        title: "Java Programming for Beginners",
        description: "Get started with Java and OOP basics.",
        outcomes: [
          "Learn syntax and structure of Java language",
          "Understand object-oriented programming concepts",
          "Use classes, interfaces, and polymorphism well",
          "Handle input/output and exceptions gracefully",
          "Build simple CLI projects and games",
          "Prepare for Java certification effectively",
        ],
      },
      {
        title: "UI/UX Design Principles",
        description: "Learn fundamentals of creating intuitive interfaces.",
        outcomes: [
          "Understand user behavior and accessibility",
          "Design wireframes and mockups using Figma",
          "Apply color theory and typography properly",
          "Ensure responsiveness across screen sizes",
          "Conduct user testing and usability audits",
          "Create consistent and elegant UI components",
        ],
      },
      {
        title: "Database Essentials with MongoDB",
        description: "Master NoSQL database design and querying.",
        outcomes: [
          "Design flexible schemas using MongoDB",
          "Use Mongoose to model application data",
          "Perform CRUD operations efficiently",
          "Build relationships using references and population",
          "Use indexes and aggregation pipelines",
          "Understand replication and backup strategies",
        ],
      },
      {
        title: "DevOps and CI/CD Pipeline Setup",
        description: "Automate deployments and streamline workflows.",
        outcomes: [
          "Understand the core DevOps lifecycle clearly",
          "Set up CI/CD with GitHub Actions or Jenkins",
          "Containerize apps using Docker and images",
          "Configure deployment pipelines and environments",
          "Monitor logs, health, and server performance",
          "Write infrastructure as code with Terraform",
        ],
      },
      {
        title: "Cybersecurity Basics for Developers",
        description: "Secure your applications from common threats.",
        outcomes: [
          "Understand common web vulnerabilities in depth",
          "Sanitize input and handle authentication securely",
          "Implement role-based access control easily",
          "Encrypt sensitive user data with hashing",
          "Use HTTPS and secure headers correctly",
          "Monitor and log suspicious user activity",
        ],
      },
      {
        title: "Data Structures & Algorithms",
        description: "Crack coding interviews and write efficient code.",
        outcomes: [
          "Understand time and space complexity properly",
          "Implement common data structures manually",
          "Solve recursive and dynamic programming problems",
          "Master searching and sorting techniques",
          "Use graphs, trees, and heaps efficiently",
          "Practice 100+ real-world algorithm challenges",
        ],
      },
    ];

    for (const courseItem of courseData) {
      const course = await Course.create({
        title: courseItem.title,
        description: courseItem.description,
        authorId,
        imageUrl: "https://placehold.co/600x400",
        price: 1499,
        categoryId: new Types.ObjectId(),
        isPublished: false,
        outcomes: courseItem.outcomes,
        languages: ["English"],
        hours: "12",
        modules: [],
        chapters: [],
        attachments: [],
        purchases: [],
      });

      const moduleIds: Types.ObjectId[] = [];

      const modules = [
        {
          title: `${course.title} - Module 1`,
          position: 1,
          isPublished: false,
          isFree: true,
        },
        {
          title: `${course.title} - Module 2`,
          position: 2,
          isPublished: false,
          isFree: false,
        },
        {
          title: `${course.title} - Module 3`,
          position: 3,
          isPublished: false,
          isFree: false,
        },
      ];

      for (const mod of modules) {
        const module = await Module.create({
          ...mod,
          courseId: course._id,
          chapters: [],
        });

        const createdChapters = await Chapter.insertMany([
          {
            title: `${mod.title} - Chapter 1`,
            position: 1,
            isPublished: false,
            isFree: true,
            description: "Intro to core concepts",
            courseId: course._id,
            moduleId: module._id,
            userProgress: [],
          },
          {
            title: `${mod.title} - Chapter 2`,
            position: 2,
            isPublished: false,
            isFree: false,
            description: "Hands-on implementation",
            courseId: course._id,
            moduleId: module._id,
            userProgress: [],
          },
        ]);

        module.chapters = createdChapters.map((ch) => ch._id as Types.ObjectId);
        await module.save();

        moduleIds.push(module._id as Types.ObjectId);
      }

      course.modules = moduleIds;
      await course.save();
    }

    console.log("✅ Seed completed with 10 unpublished courses");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seed error:", error);
    process.exit(1);
  }
}

seed();
