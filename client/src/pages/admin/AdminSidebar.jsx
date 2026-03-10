import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";


import {
  LayoutDashboard,
  Users,
  BookOpen,
  Layers,
  CreditCard,
  Star,
  BarChart2,
  Settings,
  LogOut
} from "lucide-react";
import "./AdminDashboard.css";

const AdminSidebar = () => {
   const navigate = useNavigate();
    const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/register");
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <span className="logo-icon">▶</span>
        <span className="logo-text">SkillsArena</span>
      </div>

      <nav className="sidebar-menu">
        <NavLink to="/dashboard/admin" className="sidebar-link">
          <LayoutDashboard size={18} />
          Dashboard
        </NavLink>

        <NavLink to="/dashboard/admin/users" className="sidebar-link">
          <Users size={18} />
          Users
        </NavLink>

        <NavLink to="/dashboard/admin/courses" className="sidebar-link">
          <BookOpen size={18} />
          Courses
        </NavLink>
        <NavLink to="/dashboard/admin/allinstructors" className="sidebar-link">
          <BookOpen size={18} />
          instructor
        </NavLink>
        <NavLink to="/dashboard/admin/allstudents" className="sidebar-link">
          <BookOpen size={18} />
          Students
        </NavLink>
        <NavLink to="/dashboard/admin/payments" className="sidebar-link">
          <BookOpen size={18} />
          payments
        </NavLink>

        

       
      </nav>

      <div className="sidebar-footer">
        <NavLink to="/dashboard/admin/settings" className="sidebar-link">
          <Settings size={18} />
          Settings
        </NavLink>

        <button   onClick={handleLogout} className="sidebar-link logout">
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
