import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../auth/Login.jsx";
import Register from "../auth/Register.jsx";
import AllCourses from "../pages/instructor/AllCourses.jsx";
import NotFound from "../pages/NotFound.jsx";
import ProtectedRoute from "../components/ProtectedRoute.jsx";
import Unauthorized from "../auth/Unauthorized.jsx";
import Home from "../pages/Home.jsx";
import About from "../pages/About.jsx";
import Collab from "../pages/Collab.jsx";
import BlogDetail from "../pages/BlogDetail.jsx";
import Categories from "../pages/Categories.jsx";
import Payment from "../pages/Payment.jsx";
import PaymentModal from "../pages/PaymentModal.jsx";
import InstructorShowcase from "../pages/InstructorShowcase.jsx";
import DashboardLayout from "../layout/DashboardLayout.jsx";
import StudentDashboard from "../pages/students/StudentDashboard.jsx";
import RecommendedCourses from "../pages/students/RecommendedCourses.jsx";
import Certificates from "../pages/students/Certificates.jsx";
import Earnings from "../pages/instructor/Earnings.jsx";
import Insights from "../pages/instructor/Insights.jsx";
import CreateCourse from "../pages/instructor/CreateCourse.jsx";
import ManageStudents from "../pages/instructor/ManageStudents.jsx";
import InstructorDashboard from "../pages/instructor/InstructorDashboard.jsx";
import AdminDashboard from "../pages/admin/AdminDashboard.jsx";
import ManageUser from "../pages/admin/ManageUser.jsx";
import AdminCourses from "../pages/admin/AdminCourses.jsx";
import BlogPage from "../pages/BlogPage.jsx";
import Allinstructor from "../pages/admin/Allinstructor.jsx";
import Allstudents from "../pages/admin/Allstudents.jsx";
import Payments from "../pages/admin/Payments.jsx";
import AdminSettings from "../pages/admin/settings/AdminSettings.jsx";
import FAQSection from "../pages/FAQSection.jsx";
import EnrollCourses from "../pages/students/EnrollCourses.jsx";
import Enrollments from "../pages/students/Enrollments.jsx";

function App() {
  const user = JSON.parse(localStorage.getItem("user")) || null;

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Collab />} />
        <Route path="allcourses" element={<AllCourses />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/notfound" element={<NotFound />} />
        <Route path="/blogs/:slug" element={<BlogDetail />} />
        <Route path="/blogs" element={<BlogPage />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/faq" element={<FAQSection />} />
        <Route path="/paidcourses" element={<Payment />} />
        <Route path="/paynow" element={<PaymentModal />} />
        <Route path="/instructor" element={<InstructorShowcase />} />

        <Route element={<ProtectedRoute allowedRoles={["student"]} />}>
          <Route path="/dashboard" element={<DashboardLayout user={user} />}>
            <Route index element={<StudentDashboard />} />
            <Route path="enrollcourses" element={<EnrollCourses />} />
            <Route path="enrollments/:id" element={<Enrollments />} />

            <Route path="recommendedcourses" element={<RecommendedCourses />} />
            <Route path="certificates" element={<Certificates />} />
            <Route path="payments" element={<Payment />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["instructor"]} />}>
          <Route
            path="/dashboard/instructor"
            element={<DashboardLayout user={user} />}
          >
            <Route index element={<InstructorDashboard />} />
            <Route path="createcourses" element={<CreateCourse />} />
            <Route path="courses" element={<AllCourses />} />

            <Route path="managestudents" element={<ManageStudents />} />
            <Route path="earnings" element={<Earnings />} />
            <Route path="insights" element={<Insights />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route
            path="/dashboard/admin"
            element={<DashboardLayout user={user} />}
          >
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<ManageUser />} />
            <Route path="courses" element={<AdminCourses />} />
            <Route path="allinstructors" element={<Allinstructor />} />
            <Route path="allstudents" element={<Allstudents />} />
            <Route path="payments" element={<Payments />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
