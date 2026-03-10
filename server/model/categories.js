import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    title: String,
    icon: String,
    color: String,
    courseCount: Number,
    isActive: Boolean
  },
  { timestamps: true }
);

export default mongoose.model("Category", categorySchema);
