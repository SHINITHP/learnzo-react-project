import { Document, Types } from "mongoose";

export interface ISignUpData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ISignInData {
  email: string;
  password: string;
}

export interface IVerifyOTP {
  email: string;
  otp: string;
  token: string;
}


export interface IModule extends Document {
  courseId: Types.ObjectId;
  title: string;
  position: number;
  isPublished?: boolean;
  isFree: boolean;
  chapters: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IChapter extends Document {
  title: string;
  description?: string;
  videoUrl?: string;
  position: number;
  isPublished: boolean;
  isFree: boolean;
  muxData?: Types.ObjectId;
  courseId: Types.ObjectId;
  moduleId: Types.ObjectId;
  userProgress: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ICourse extends Document {
  authorId: Types.ObjectId;
  title: string;
  description?: string;
  imageUrl?: string;
  price?: number;
  isPublished: boolean;
  categoryId?: Types.ObjectId;
  difficultyLevel?: string;
  chapters: Types.ObjectId[];
  modules: Types.ObjectId[];
  outcomes: string[];
  languages: String[];
  hours: string;
  attachments: Types.ObjectId[];
  purchases: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ICategory extends Document {
  name: string;
  courses: Types.ObjectId[];
}

export interface IAttachment extends Document {
  name: string;
  url: string;
  courseId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface IMuxData extends Document {
  assetId: string;
  playbackId?: string;
  chapterId: Types.ObjectId;
}

export interface IUserProgress extends Document {
  userId: Types.ObjectId;
  chapterId: Types.ObjectId;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPurchase extends Document {
  userId: Types.ObjectId;
  courseId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
