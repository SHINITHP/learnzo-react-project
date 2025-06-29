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

export const Chapter = mongoose.model<IChapter>("Chapter", chapterSchema);
