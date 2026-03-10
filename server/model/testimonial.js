import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema(
  {
    name: String,
    role: String,
    rating: Number,
    message: String,
    avatar: String,
    isActive: Boolean
  },
  { timestamps: true }
);

export default mongoose.model("Testimonial", testimonialSchema);
