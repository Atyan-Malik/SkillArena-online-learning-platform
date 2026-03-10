import express from "express";
import { getAllUsers } from "../controller/admin/users.controller.js";

const router = express.Router();

router.get("/", getAllUsers);

export default router;
