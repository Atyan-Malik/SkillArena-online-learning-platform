import amounts from "../model/payment.js";


export const paynow= async (req, res) => {
  try {
    const { instructorId, courseId, amount, paymentMethod } = req.body;

   
    console.log("PAYMENT BODY:", req.body);
    console.log("USER:", req.user);

    if (!instructorId || !courseId || !amount || !paymentMethod) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const payment = await amounts.create({
     student: req.user.id, 
      instructor: instructorId,
      course: courseId,
      amount,
      paymentMethod,
      status: "completed"
    });

    res.status(201).json({
      message: "Payment successful",
      payment,
    });
  } catch (error) {
    console.error("Payment error:", error);
    res.status(500).json({ message: "Server error during payment", error: error.message });
  }
};