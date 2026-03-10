import Instructor from "../model/instructor.js";

export const getInstructors = async (req, res) => {
  try {
    const instructors = await Instructor.find({ isActive: true });
    res.status(200).json(instructors);
    console.log(instructors)
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch instructors"
    });
  }
};
