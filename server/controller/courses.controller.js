import Courses from "../model/course.js";

export const getAllCourses = async (req, res) => {
  try {
    const courses = await Courses.find()
      .populate("instructor", "name");

    res.status(200).json({
      success: true,
      courses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch courses",
      error: error.message,
    });
  }
};
