import { Outlet } from "react-router-dom";
import "../styles/DashboardLayout.css";

import StudentSidebar from "../pages/students/StudentSidebar";
import InstructorSidebar from "../pages/instructor/InstructorSidebar";
import AdminSidebar from "../pages/admin/AdminSidebar";

const DashboardLayout = ({ user }) => {
  return (
    <div className="dashboard">
      {/* Sidebar */}
      {user?.role === "student" && <StudentSidebar />}
      {user?.role === "instructor" && <InstructorSidebar />}
      {user?.role === "admin" && <AdminSidebar />}

      {/* Main content area */}
      <main className="main-content">
        <Outlet /> {/* All dashboard pages appear here */}
      </main>
    </div>
  );
};

export default DashboardLayout;
