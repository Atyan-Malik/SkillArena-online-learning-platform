import express from "express";

import { createCourse } from "../controller/instructor/createcourses.js";
import { protect, InstructorOnly } from "../AuthMiddleware.js";
import upload from "../uploadMiddleware.js"
const router = express.Router();


router.post(
  "/",
  protect,
  InstructorOnly,
  upload.single("thumbnail"),
  createCourse,
);

export default router;
