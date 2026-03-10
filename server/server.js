import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db.js";
import contactRoutes from "./router/contactRoutes.js";
import userRoutes from "./router/userRoutes.js";
import testimonialRoutes from "./router/testimonialRoutes.js";
import instructorRoutes from "./router/instructorRoutes.js";
import categoriesRoutes from "./router/categoriesRoutes.js";
import blogRoutes from "./router/blogRoutes.js";
import createcoursesRoutes from "./router/createcoursesRoutes.js";
import allCourses from "./router/allCourses.js";
import adminallusers from "./router/adminallusers.js";
import settingsRoutes from "./router/settingsRoutes.js";
import paymentRoutes from "./router/paymentRoutes.js";
import paidRoutes from "./router/paidRoutes.js";
import adminRoutes from "./router/adminRoutes.js";
import faq from "./router/faq.js";
import path from "path";

import enrollmentRoutes from "./router/enrollmentRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
connectDB();

const PORT = process.env.PORT || 15000;

app.use(
  cors({
    origin: ["http://localhost:4173", "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

app.use("/api/users", userRoutes);
app.use("/api/contact", contactRoutes);

app.use("/api/testimonials", testimonialRoutes);
app.use("/api/instructors", instructorRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/blogs", blogRoutes);

app.use("/api/courses", allCourses, createcoursesRoutes);

app.use("/api/allusers", adminallusers);
app.use("/api/settings", settingsRoutes);

app.use("/api/paynow", paymentRoutes);

app.use("/api/paidcourses", paidRoutes);
app.use("/api/dashboard/admin", adminRoutes);
app.use("/api/faqs", faq);

app.use("/api/enrollcourses", enrollmentRoutes);

app.get("/", (req, res) => {
  res.send("LMS Backend is running...");
});

app.post("/api/users", (req, res) => {
  console.log(req.body);
  res.json({ message: "User registered", data: req.body });
});

app.listen(PORT, () => {
  console.log(` Server is running on http://localhost:${PORT}`);
});
