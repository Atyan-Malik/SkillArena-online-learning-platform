import React from "react";
import "../styles/CTABanner.css";
import { ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CTABanner = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/register");
  };

  return (
    <section className="sa-cta-banner">
      {/* Decorative glows */}
      <div className="cta-glow cta-glow-blue"></div>
      <div className="cta-glow cta-glow-purple"></div>

      <div className="cta-container">

        <div className="cta-content">

          <span className="cta-eyebrow">
            <Sparkles size={13} />
            START YOUR JOURNEY
          </span>

          <h2>
            Start Your{" "}
            <span>Learning Journey</span>{" "}
            Today
          </h2>

          <p>
            Join thousands of learners and build practical skills
            that move your career forward.
          </p>

        </div>

        <div className="cta-action">

          <button
            type="button"
            onClick={handleClick}
            className="cta-button batn"
          >
            <span>Get Started Now</span>
            <ArrowRight size={17} />
          </button>

        </div>

      </div>
    </section>
  );
};

export default CTABanner;