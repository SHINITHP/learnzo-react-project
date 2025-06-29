import { createUploadthing } from "uploadthing/express";
import { UploadThingError } from "uploadthing/server";
import logger from "../utils/logger";

const f = createUploadthing();

// Takes in req from middleware context
const handleAuth = async (req: any) => {
  // Assuming your auth middleware sets req.user
  if (!req.user) {
    logger.warn("Unauthorized upload attempt");
    throw new UploadThingError("Unauthorized");
  }
  return { userId: req.user.userId };
};

export const uploadthingRouter = {
  courseImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async ({ req }) => await handleAuth(req))
    .onUploadComplete(({ file, metadata }) => {
      logger.info(`Course image uploaded by user ${metadata.userId}: ${file.url}`);
      return { url: file.url };
    }),

  courseAttachment: f(["text", "image", "video", "audio", "pdf"])
    .middleware(async ({ req }) => await handleAuth(req))
    .onUploadComplete(({ file, metadata }) => {
      logger.info(`Attachment uploaded by user ${metadata.userId}: ${file.url}`);
      return { url: file.url };
    }),

  chapterVideo: f({ video: { maxFileCount: 1, maxFileSize: "8GB" } })
    .middleware(async ({ req }) => await handleAuth(req))
    .onUploadComplete(({ file, metadata }) => {
      logger.info(`Video uploaded by user ${metadata.userId}: ${file.url}`);
      return { url: file.url };
    }),
};

export type UploadthingRouter = typeof uploadthingRouter;
