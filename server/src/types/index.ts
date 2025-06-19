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
