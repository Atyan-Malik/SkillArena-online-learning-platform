import Courses from "../../model/course.js";

export const createCourse = async (req, res) => {
  try {
    const { title, description, category, price } = req.body;

    if (!title || !description || !category) {
      return res.status(400).json({ message: "All fields except price and thumbnail are required" });
    }

    const course = await Courses.create({
      title,
      description,
      category,
      price: price || 0,
      thumbnail: req.file ? `/uploads/courses/${req.file.filename}` : "",
      instructor: req.user._id,
    });

    res.status(201).json({ success: true, course });
  } catch (error) {
    console.log("Course creation error:", error);
    console.error("CREATE COURSE ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};