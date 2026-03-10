import React from "react";
import "../styles/CTABanner.css";
import { useNavigate } from "react-router-dom";

const CTABanner = () => {

  const navigate=useNavigate()
  const handleClick=()=>{
    navigate("/register")
  }
  return (
    <section className="sa-cta-banner">
      <div className="cta-container">
        <div className="cta-text">
          <h2>Start Your <span className="blue-text">Learning Journey</span> Today</h2>
          <p>Join thousands of learners and gain skills that make a difference.</p>
        </div>
        <div className="cta-button">
          <button onClick={handleClick}>Get Started Now</button>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;
