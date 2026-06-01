import connectDB from "../db.js";
import bcrypt from "bcrypt";
import User from "../model/User.js";
import cors from "cors";

import dotenv from "dotenv";
dotenv.config();

app.use(
  cors({
    origin:"http://localhost:5173",
    methods:"POST",
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);
const createAdmin = async () => {
  await connectDB();

  const existing = await User.findOne({ email: "adminatyan@example.com" });

  if (existing) {
    console.log("Admin already exists");
    process.exit();
  }

  const hashedPassword = await bcrypt.hash("admin123", 10);

  await User.create({
    name: "adminatyan",
    email: "adminatyan@example.com",
    password: hashedPassword,
    role: "admin",
  });

  console.log("Admin created successfully");

  process.exit();
};

createAdmin();