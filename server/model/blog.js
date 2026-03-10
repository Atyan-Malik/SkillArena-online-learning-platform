import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: String,
    author: String,
    slug: {
      type: String,
      unique: true
    },
    excerpt: String,
    thumbnail: String,
    content: String,
    featured: Boolean,
    publishedAt: Date,
    isPublished: Boolean
  },
  { timestamps: true }
);

export default mongoose.model("Blog", blogSchema);
