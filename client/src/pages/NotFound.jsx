import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/NotFound.css"

const NotFound = () => {
  return (
    <section className="notfound-page">
      <div className="notfound-container">
        <h1>404</h1>
        <h2>Oops! Page Not Found</h2>
        <p>
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <NavLink to="/" className="home-btn">
          Go to Home
        </NavLink>
      </div>
    </section>
  );
};

export default NotFound;
