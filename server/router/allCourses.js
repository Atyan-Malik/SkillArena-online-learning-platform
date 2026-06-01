import express from "express";
import { getAllCourses ,deleteCourses } from "../controller/courses.controller.js"
import Courses from "../model/course.js";
const router = express.Router();

router.get("/", getAllCourses);
router.get("/:id", async (req, res) => {
  try {
    const course = await Courses.findById(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.json(course);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});
router.delete("/:id",deleteCourses )



export default router;

