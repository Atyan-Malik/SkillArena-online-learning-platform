import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../../redux/themeSlice";
import { NavLink } from "react-router-dom";
import { Linkedin, Twitter, Facebook, Instagram, ArrowUp } from "lucide-react";
import "./Footer.css";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const theme = useSelector((state) => state.theme.mode);
  const dispatch = useDispatch();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);
  return (
    <>
      <footer className="sa-footer">
        {/* Top Section */}
        <div className="footer-top">
          <div className="footer-logo">
            <h2>
              Skill<span className="blue-text">Arena</span>
            </h2>
            <p>
              Empowering learners worldwide <br />
              with high-quality courses and skills.
            </p>

            <div className={theme}>
              <label className="toggle-switch">
      <input
        type="checkbox"
        checked={theme === "dark"}
        onChange={() => dispatch(toggleTheme())}
      />
      <span className="switch-slider"></span>
    </label>
            </div>
          </div>

          <div className="footer-links">
            <div className="link-block">
              <h4>Quick Links</h4>
              <NavLink to="/">Home</NavLink>
              <NavLink to="/about">About</NavLink>
              <NavLink to="/courses">Courses</NavLink>
              <NavLink to="/blog">Blog</NavLink>
              <NavLink to="/contact">Contact</NavLink>
            </div>

            <div className="link-block">
              <h4>Resources</h4>
              <NavLink to="/pricing">Pricing</NavLink>
              <NavLink to="/faq">FAQ</NavLink>
              <NavLink to="/testimonials">Testimonials</NavLink>
              <NavLink to="/support">Support</NavLink>
            </div>

            <div className="link-block">
              <h4>Contact</h4>
              <p>Email: support@skillarena.com</p>
              <p>Phone: +92 309 0308234</p>
              <div className="social-icons">
                <a href="#">
                  <Linkedin size={22} />
                </a>
                <a href="#">
                  <Twitter size={22} />
                </a>
                <a href="#">
                  <Facebook size={22} />
                </a>
                <a href="#">
                  <Instagram size={22} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="footer-bottom">
          <p>© 2026 SkillArena. All Rights Reserved.</p>
          <p>Designed with love using React & Lucide Icons</p>
        </div>
        <button className="scroll-top-btn" onClick={scrollToTop}>
          <ArrowUp size={20} />
        </button>
      </footer>

      {/* SCROLL TO TOP BUTTON */}
    </>
  );
};

export default Footer;
