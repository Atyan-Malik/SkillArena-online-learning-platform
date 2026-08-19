import React from "react";
import "../styles/HighlightFeature.css";
import {
  GraduationCap,
  Award,
  Laptop,
  Users,
  ArrowUpRight,
} from "lucide-react";

const Features = () => {
  const featureData = [
    {
      icon: GraduationCap,
      title: "Expert-Led Courses",
      desc: "Learn from top instructors, industry leaders, and certified professionals worldwide.",
      accent: "blue",
    },
    {
      icon: Laptop,
      title: "Hands-On Learning",
      desc: "Build real-world skills through practical projects, interactive exercises, and industry tasks.",
      accent: "coral",
    },
    {
      icon: Award,
      title: "Earn Certificates",
      desc: "Earn professional certificates that showcase your skills and help you stand out in the job market.",
      accent: "purple",
    },
    {
      icon: Users,
      title: "Community Support",
      desc: "Connect with learners, mentors, and professionals while growing your skills together.",
      accent: "pink",
    },
  ];

  return (
    <section className="sa-features">
      {/* Background decoration */}
      <div className="features-glow features-glow-one"></div>
      <div className="features-glow features-glow-two"></div>

      <div className="features-container">

        {/* Section Header */}
        <div className="features-header">

          <span className="section-badge">
            <span className="badge-dot"></span>
            WHY SKILL ARENA
          </span>

          <h2>
            Everything You Need to{" "}
            <span className="gradient-text">Grow Your Skills</span>
          </h2>

          <p>
            A world-class learning experience designed to help you learn,
            practice, connect, and build a career you are proud of.
          </p>

        </div>

        {/* Features */}
        <div className="features-grid">
          {featureData.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={index}
                className={`feature-card ${feature.accent}`}
              >
                {/* Top glow */}
                <div className="card-glow"></div>

                <div className="feature-card-top">
                  <div className="icon-wrapper">
                    <Icon size={30} strokeWidth={1.8} />
                  </div>

                  <span className="feature-number">
                    0{index + 1}
                  </span>
                </div>

                <div className="feature-content">
                  <h3>{feature.title}</h3>

                  <p>{feature.desc}</p>
                </div>

               

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Features;