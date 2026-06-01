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


export const deleteCourses= async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCourses = await Courses.findByIdAndDelete(id);

    if (!deletedCourses) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json({ message: "Course deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}
