import express from "express";
import { getTestimonials } from "../controller/testimonial.controller.js";

const router = express.Router();

router.get("/", getTestimonials);

export default router;
