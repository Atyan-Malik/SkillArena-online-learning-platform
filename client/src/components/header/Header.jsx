import React, { useEffect, useState } from "react";
import "./Header.css";
import {
  Menu,
  X,
  GraduationCap,
} from "lucide-react";
import { NavLink } from "react-router-dom";

import ProfileMenu from "../ProfileMenu"
import NotificationBell from "../NotificationBell"

const Header = () => {
  const navlink = ({ isActive }) =>
    isActive ? "active-link" : "";

  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);

  // Check logged-in user
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
     setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Invalid user data:", error);
        localStorage.removeItem("user");
      }
    }
  }, []);

  // Logout
  const handleLogout = () => {
    setUser(null);
    setOpen(false);
  };

  return (
    <header className="sa-header">
      <div className="sa-container">

        {/* Logo */}
        <div className="sa-logo">
          <GraduationCap size={30} color="#147aff" />

          <span className="red">Skill</span>
          <span className="blue">Arena</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="sa-nav">

          <NavLink to="/" className={navlink}>
            Home
          </NavLink>

          <NavLink to="/allcourses" className={navlink}>
            Our Courses
          </NavLink>

          <NavLink to="/categories" className={navlink}>
            Categories
          </NavLink>

          <NavLink to="/paidcourses" className={navlink}>
            Paid Courses
          </NavLink>

          <NavLink to="/instructor" className={navlink}>
            Instructor
          </NavLink>

          <NavLink to="/contact" className={navlink}>
            Contact
          </NavLink>

        </nav>

        {/* Right Side */}
        <div className="sa-buttons">

  {user ? (
    <div className="sa-buttons2">
      <NotificationBell user={user} />

      <ProfileMenu
        user={user}
        onLogout={handleLogout}
      />
    </div>
  ) : (
    <>
      <NavLink to="/login">
        <button className="btn-outline">
          Login
        </button>
      </NavLink>

      <NavLink to="/register">
        <button className="btn-filled">
          Register
        </button>
      </NavLink>
    </>
  )}

</div>
        {/* Mobile Icon */}
        <div
          className="sa-mobile-icon"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </div>

      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="sa-mobile-menu">

          <NavLink to="/" className="nav-link">
            Home
          </NavLink>

          <NavLink to="/allcourses" className="nav-link">
            Our Courses
          </NavLink>

          <NavLink to="/categories" className="nav-link">
            Categories
          </NavLink>

          <NavLink to="/paidcourses" className="nav-link">
            Paid Courses
          </NavLink>

          <NavLink to="/instructor" className="nav-link">
            Instructor
          </NavLink>

          <NavLink to="/contact" className="nav-link">
            Contact
          </NavLink>

          {!user ? (
            <>
              <NavLink to="/login">
                <button className="btn-outline w-full">
                  Login
                </button>
              </NavLink>

              <NavLink to="/register">
                <button className="btn-filled w-full">
                  Register
                </button>
              </NavLink>
            </>
          ) : (
            <>
              <div className="sa-buttons2">
              {/* Notification */}
              <NotificationBell user={user} />

              {/* Profile */}
              <ProfileMenu
                user={user}
                onLogout={handleLogout}
              />
              </div>
            </>
          )}

        </div>
      )}
    </header>
  );
};

export default Header;