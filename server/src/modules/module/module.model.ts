import mongoose, { Schema } from "mongoose";
import { IModule } from "../../types";

const moduleSchema = new Schema<IModule>(
  {
    title: { type: String, required: true },
    position: { type: Number, required: true },
    isPublished: { type: Boolean, default: false },
    isFree: { type: Boolean, default: false },
    courseId: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    chapters: [{ type: Schema.Types.ObjectId, ref: "Chapter" }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const Module = mongoose.model<IModule>("Module", moduleSchema);
