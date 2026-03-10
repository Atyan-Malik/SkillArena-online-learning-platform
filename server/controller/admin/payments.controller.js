import amounts from "../../model/payment.js";


// ADMIN - GET ALL PAYMENTS
export const getAllPayments = async (req, res) => {
  try {
    const payments = await amounts.find()
      .populate("student", "name email")
      .populate("instructorId", "name email")
      .populate("courseId", "title price")
      .sort({ createdAt: -1 });

    res.status(200).json(payments);

  } catch (error) {
    console.error("Fetch Payments Error:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};
