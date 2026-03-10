import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/Notfound.css";

const Unauthorized = () => {
  return (
    <section className="notfound-page">
      <div className="notfound-container">
        <h1>403</h1>
        <h2>Unauthorized</h2>
        <p>You do not have permission to access this page.</p>
        <NavLink to="/" className="home-btn">
          Go Home
        </NavLink>
      </div>
    </section>
  );
};

export default Unauthorized;
