import React from "react";
import "../styles/HighlightFeature.css";
import { GraduationCap, Award, Laptop, Users } from "lucide-react";

const Features = () => {
  const featureData = [
    {
      icon: <GraduationCap className="feature-icon" size={32} />,
      title: "Expert-Led Courses",
      desc: "Learn from top instructors, industry leaders, and certified professionals worldwide."
    },
    {
      icon: <Laptop className="feature-icon" size={32} />,
      title: "Hands-On Learning",
      desc: "Practical projects, real-world tasks, and interactive exercises to build job-ready skills."
    },
    {
      icon: <Award className="feature-icon" size={32} />,
      title: "Earn Certificates",
      desc: "Get globally recognized certificates that help you stand out in the job market."
    },
    {
      icon: <Users className="feature-icon" size={32} />,
      title: "Community Support",
      desc: "Join a growing community of learners and get help from peers and mentors."
    },
  ];

  return (
    <section className="sa-features">
      <div className="features-container">

        <div className="features-header">
          <h2>Why Choose <span className="blue-text">SkillArena?</span></h2>
          <p>World-class learning experience designed for students, instructors, and professionals.</p>
        </div>

        <div className="features-grid">
          {featureData.map((f, i) => (
            <div key={i} className="feature-card">
              <div className="icon-wrapper">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Features;
