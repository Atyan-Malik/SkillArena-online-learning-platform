import express from "express";
import FAQ from "../model/FAQ.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const faqs = await FAQ.find({ isActive: true });
    res.json(faqs);
  } catch (error) {
    console.error("FAQ Fetch Error:", error);
    res.status(500).json({ message: error.message });
  }
});

export default router;
