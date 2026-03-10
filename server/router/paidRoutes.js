import express from "express";
import Paid from "../model/PaidCourses.js";

const router = express.Router();


router.get("/", async (req, res) => {
  try {
    const courses = await Paid.find({ price: { $gt: 0 } });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;
