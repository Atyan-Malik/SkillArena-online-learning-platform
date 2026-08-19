import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  GraduationCap,
  Award,
  CreditCard,
  LogOut,
} from "lucide-react";
import "./StudentSidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/register");
  };

  return (
    <aside className="sidebar">

      {/* Logo */}
      <div className="sidebar-logo">
        {/* <div className="logo-icon">
          <GraduationCap size={27} />
        </div> */}

        <span className="logo-text">
          Skill<span>Arena</span><br />
          <p style={{fontSize:17}}>Dashboard</p>
        </span>
      </div>

      {/* Navigation */}
      <nav className="sidebar-menu">

        <NavLink
          to="/dashboard/student"
          end
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
        >
          <LayoutDashboard size={19} />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/dashboard/instructor/courses"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
        >
          <BookOpen size={19} />
          <span>All Courses</span>
        </NavLink>

        <NavLink
          to="/dashboard/student/enrollments"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
        >
          <BookOpen size={19} />
          <span>Enrolled Courses</span>
        </NavLink>

        <NavLink
          to="/dashboard/student/allstudents"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
        >
          <GraduationCap size={19} />
          <span>All Students</span>
        </NavLink>

        <NavLink
          to="/dashboard/student/certificates"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
        >
          <Award size={19} />
          <span>Certificates</span>
        </NavLink>

        <NavLink
          to="/dashboard/student/payments"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
        >
          <CreditCard size={19} />
          <span>Paid Courses</span>
        </NavLink>

      </nav>

      {/* Logout */}
      <div className="sidebar-footer">
        <button
          onClick={handleLogout}
          className="sidebar-link logout"
        >
          <LogOut size={19} />
          <span>Logout</span>
        </button>
      </div>

    </aside>
  );
};

export default Sidebar;