import mongoose, { Schema } from "mongoose";
import { ICategory } from "../../types";

const categorySchema = new Schema<ICategory>({
  name: { type: String, required: true, unique: true },
},{ timestamps: true });

export const Category = mongoose.model<ICategory>("Category", categorySchema);
