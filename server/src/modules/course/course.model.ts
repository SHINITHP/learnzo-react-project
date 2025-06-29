import mongoose, { Schema } from "mongoose";
import { ICourse } from "../../types";

const courseSchema = new Schema<ICourse>(
  {
    authorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String },
    imageUrl: { type: String },
    price: { type: Number },
    isPublished: { type: Boolean, default: false },
    categoryId: { type: Schema.Types.ObjectId, ref: "Category" },
    chapters: [{ type: Schema.Types.ObjectId, ref: "Chapter" }],
    attachments: [{ type: Schema.Types.ObjectId, ref: "Attachment" }],
    purchases: [{ type: Schema.Types.ObjectId, ref: "Purchase" }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// courseSchema.index({ categoryId: 1 });


import { IAttachment } from "../../types";
const attachmentSchema = new Schema<IAttachment>(
  {
    name: { type: String, required: true },
    url: { type: String, required: true },
    courseId: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// attachmentSchema.index({ courseId: 1 });

// chapterSchema.index({ courseId: 1 });

import { IMuxData } from "../../types";

const muxDataSchema = new Schema<IMuxData>({
  assetId: { type: String, required: true },
  playbackId: { type: String },
  chapterId: {
    type: Schema.Types.ObjectId,
    ref: "Chapter",
    required: true,
    unique: true,
  },
});

import { IUserProgress } from "../../types";

const userProgressSchema = new Schema<IUserProgress>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    chapterId: { type: Schema.Types.ObjectId, ref: "Chapter", required: true },
    isCompleted: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

userProgressSchema.index({ chapterId: 1 });
userProgressSchema.index({ userId: 1, chapterId: 1 }, { unique: true });

import { IPurchase } from "../../types";

const purchaseSchema = new Schema<IPurchase>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    courseId: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

purchaseSchema.index({ courseId: 1 });
purchaseSchema.index({ userId: 1, courseId: 1 }, { unique: true });

export const Purchase = mongoose.model<IPurchase>("Purchase", purchaseSchema);
export const UserProgress = mongoose.model<IUserProgress>(
  "UserProgress",
  userProgressSchema
);
export const MuxData = mongoose.model<IMuxData>("MuxData", muxDataSchema);
export const Attachment = mongoose.model<IAttachment>(
  "Attachment",
  attachmentSchema
);
export const Course = mongoose.model<ICourse>("Course", courseSchema);
