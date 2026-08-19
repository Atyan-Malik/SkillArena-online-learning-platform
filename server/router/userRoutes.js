import express from "express";
import {
  registerUser,
  loginUser,
  deleteUser,
  googleAuth,
  capachaAuth,
  forgotPassword,
  resetPassword,
  sendOtp,
  verifyOtp,
} from "../controller/userController.js";
import User from "../model/User.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.delete("/:id", deleteUser);
router.post("/google", googleAuth);
router.post("/capacha", capachaAuth);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);

export default router;
