import express from "express";
import User from "../model/User.js";
import Course from "../model/course.js";

const router = express.Router();

router.get("/stats", async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const activeInstructors = await User.countDocuments({ role: "instructor" });
    const totalCourses = await Course.countDocuments();

    res.json({
      totalUsers,
      activeInstructors,
      totalCourses,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;
