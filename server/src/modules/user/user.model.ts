import mongoose, { Schema } from "mongoose";
import { IUser } from "../../types";
import argon2 from 'argon2';

const userSchema = new Schema<IUser>(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    resetToken: {
      type: String,
    },
    role: {
      type: String,
      enum: ["student", "instructor", "admin"],
      default: "student",
    },
    status: { type: String, enum: ['pending', 'verified'], default: 'pending' },
  },
  { timestamps: true }
);


userSchema.pre('save', async function name(next) {
    if(this.isModified('password') && this.password){
        try {
            this.password = await argon2.hash(this.password);
        } catch (error: any) {
            return next(error)
        }
    }
    next();
});

userSchema.methods.comparePassword = async function name(candidatePassword: string): Promise<boolean> {
    try {
        console.log(this.password, candidatePassword)
        return await argon2.verify(this.password, candidatePassword);
    } catch (error) {
        console.error('Error while comparing password:', error);
        return false;
    }
}


export const User = mongoose.model<IUser>('User', userSchema);