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

export const deleteInstructor=async (req, res) => {
  try {
    const { id } = req.params;

    const deleteinst = await User.findByIdAndDelete(id);

    if (!deleteinst) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};