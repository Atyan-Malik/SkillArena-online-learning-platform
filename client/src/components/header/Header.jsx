

import React, { useState } from "react";
import "./Header.css"
import { Menu, X,GraduationCap  } from "lucide-react";
import { NavLink } from "react-router-dom";

const Header = () => {
    const navlink = ({ isActive }) => (isActive ? "active-link" : "");
  const [open, setOpen] = useState(false);

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
          <NavLink to="/" className={navlink} >Home</NavLink>
          <NavLink to="/allcourses" className={navlink}>Our Courses</NavLink>
          <NavLink to="/categories" className={navlink} >Categories</NavLink>
          <NavLink to="/paidcourses" className={navlink} >Paid Courses</NavLink>
          <NavLink to="/instructor" className={navlink} >Instructor</NavLink>
          <NavLink to="/contact" className={navlink} >Contact</NavLink>
         

        </nav>

        {/* Buttons */}
        <div className="sa-buttons">
          <NavLink to="/login">
            <button className="btn-filled">Login</button>
          </NavLink>

          <NavLink to="/register">
            <button className="btn-filled">Register</button>
          </NavLink>
        </div>

        {/* Mobile Icon */}
        <div className="sa-mobile-icon" onClick={() => setOpen(!open)}>
          {open ? <X size={28} /> : <Menu size={28} />}
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="sa-mobile-menu">

          <NavLink to="/" className="nav-link">Home</NavLink>
          <NavLink to="/courses" className="nav-link">Courses</NavLink>
          <NavLink to="/categories" className="nav-link">Categories</NavLink>
          <NavLink to="/about" className="nav-link">About</NavLink>
          <NavLink to="/contact" className="nav-link">Contact</NavLink>

          <NavLink to="/login">
            <button className="btn-outline w-full">Login</button>
          </NavLink>

          <NavLink to="/register">
            <button className="btn-filled w-full">Register</button>
          </NavLink>

        </div>
      )}
    </header>
  );
};

export default Header;
