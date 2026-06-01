import express from "express";
import { getInstructors ,deleteInstructor } from "../controller/instructor.controller.js";

const router = express.Router();

router.get("/", getInstructors);
router.delete("/:id", deleteInstructor);


export default router;
