import express from "express";
import { getInstructors } from "../controller/instructor.controller.js";

const router = express.Router();

router.get("/", getInstructors);

export default router;
