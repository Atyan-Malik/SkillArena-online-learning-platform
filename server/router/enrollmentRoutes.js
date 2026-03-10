
import express from "express";
import { enrollCourse,getEnrolledCourses } from "../controller/students/enrollment.controller.js";
import { protect } from "../AuthMiddleware.js";

const router = express.Router();

router.post("/", protect, enrollCourse);
router.get("/", protect, getEnrolledCourses);


export default router;