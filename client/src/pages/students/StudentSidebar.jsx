import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  GraduationCap,
  Heart,
  CreditCard,
  LogOut
} from "lucide-react";
import "./StudentSidebar.css";

const Sidebar = () => {

 const navigate = useNavigate();
    const handleLogout = () => {
    localStorage.removeItem("token");

    
    navigate("/register");
    }

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <span className="logo-icon">          <GraduationCap size={30} color="#147aff" />
        </span>
        <span className="logo-text">SkillsArena</span>
      </div>

      <nav className="sidebar-menu">
        <NavLink to="/dashboard" className="sidebar-link">
          <LayoutDashboard size={18} />
          Dashboard
        </NavLink>

        <NavLink to="/dashboard/instructor/courses" className="sidebar-link">
          <BookOpen size={18} />
          All Courses
        </NavLink>
        <NavLink to="/dashboard/enrollcourses" className="sidebar-link">
          <BookOpen size={18} />
          Enroll Courses
        </NavLink>

        <NavLink to="/dashboard/recommendedcourses" className="sidebar-link">
          <GraduationCap size={18} />
          All Students
        </NavLink>

        <NavLink to="/dashboard/certificates" className="sidebar-link">
          <Heart size={18} />
          Certificates
        </NavLink>

        <NavLink to="/dashboard/payments" className="sidebar-link">
          <CreditCard size={18} />
          Paid Courses
        </NavLink>
      </nav>

      <div className="sidebar-footer">
       

        <button onClick={handleLogout} className="sidebar-link logout">
          <LogOut size={18} />
         <span>Logout</span> 
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
