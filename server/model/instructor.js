import mongoose from "mongoose";

const instructorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    role: {
      type: String,
      required: true
    },
    avatar: {
      type: String,
      default: ""
    },
    experience: {
      type: Number,
      default: 0
    },
    students: {
      type: Number,
      default: 0
    },
    bio: {
      type: String
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Instructor", instructorSchema);