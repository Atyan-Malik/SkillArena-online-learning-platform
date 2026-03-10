import Enrollment from "../../model/Enrollment.js";

export const enrollCourse = async (req, res) => {
  try {
    const studentId = req.user.id; 
    const { courseId } = req.body;

    const alreadyEnrolled = await Enrollment.findOne({
      student: studentId,
      course: courseId,
    });

    if (alreadyEnrolled) {
      return res.status(400).json({ message: "Already enrolled" });
    }

    const enrollment = await Enrollment.create({
      student: studentId,
      course: courseId,
    });

    res.status(201).json(enrollment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export const getEnrolledCourses = async (req, res) => {
  try {
    const studentId = req.user.id;

    const enrollments = await Enrollment.find({ student: studentId })
      .populate("course");

    res.json(enrollments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


