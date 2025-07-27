import mongoose, { Schema } from "mongoose";
import { IChapter } from "../../types";

const chapterSchema = new Schema<IChapter>(
  {
    title: { type: String, required: true },
    description: { type: String },
    videoUrl: { type: String },
    position: { type: Number, required: true },
    isPublished: { type: Boolean, default: false },
    isFree: { type: Boolean, default: false },
    muxData: { type: Schema.Types.ObjectId, ref: "MuxData" },
    courseId: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    userProgress: [{ type: Schema.Types.ObjectId, ref: "UserProgress" }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const videoSchema = new mongoose.Schema({
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  chapterId: { type: mongoose.Schema.Types.ObjectId, ref: "Chapter", required: true },
  assetId: { type: String, required: true },
  playbackId: { type: String },
  status: { type: String, enum: ["waiting", "ready", "errored"], default: "waiting" },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now }
});

export const VideoModel = mongoose.model("Video", videoSchema);
export const Chapter = mongoose.model<IChapter>("Chapter", chapterSchema);
