import { Document } from "mongoose";

export interface IUser extends Document {
  fullName: string;
  email: string;
  password: string;
  createdAt?: Date;
  resetToken?: string;
  role: "student" | "instructor" | "admin";
  status: "pending" | "verified";
  comparePassword(candidatePassword: string): Promise<boolean>;
}

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
