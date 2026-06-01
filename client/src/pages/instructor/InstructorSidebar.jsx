import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  CreditCard,
  LogOut,
} from "lucide-react";
import "./Instructor.css";

const InstructorSidebar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    const check = localStorage.getItem("token");
    console.log("After logout:", check);
    navigate("/register");
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <span className="logo-icon">▶</span>
        <span className="logo-text">SkillsArena</span>
      </div>

      <nav className="sidebar-menu">
        <NavLink to="/dashboard/instructor" className="sidebar-link">
          <LayoutDashboard size={18} />
          Dashboard
        </NavLink>

        <NavLink
          to="/dashboard/instructor/createcourses"
          className="sidebar-link"
        >
          <BookOpen size={18} />
          Create Courses
        </NavLink>
        <NavLink to="/dashboard/instructor/courses" className="sidebar-link">
          <BookOpen size={18} />
          All Courses
        </NavLink>

        <NavLink
          to="/dashboard/instructor/managestudents"
          className="sidebar-link"
        >
          <Users size={18} />
          Students List
        </NavLink>

        <NavLink to="/dashboard/instructor/earnings" className="sidebar-link">
          <CreditCard size={18} />
          Earnings
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <button onClick={handleLogout} className="sidebar-link logout">
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default InstructorSidebar;
