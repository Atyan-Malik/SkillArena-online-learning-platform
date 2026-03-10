import React from "react";
import "../styles/About.css";
import { GraduationCap, Laptop, Users, Globe, Award, ShieldCheck } from "lucide-react";
import aboutImage from "/about2 (2).jpg";

const stats = [
  { icon: GraduationCap, number: "15K+", label: "Active Students" },
  { icon: Laptop, number: "120+", label: "Expert-Led Courses" },
  { icon: Users, number: "50+", label: "Certified Instructors" },
];

const AboutSection = () => {



  return (
    <section className="sa-about">
      <div className="about-container">

        <div className="about-left">
          <img 
            src={aboutImage}
            alt="Students learning through SkillArena platform"
            className="about-image"
          />
        </div>

        <div className="about-right">
          <h2>
            Empowering Global Learners with 
            <span className="blue-text"> Real-World Skills</span>
          </h2>

          <p className="about-subtext">
            SkillArena is a modern online learning platform built to bridge the gap 
            between education and industry. We provide practical, career-focused 
            courses designed by experts to help you succeed in today’s digital world.
          </p>

          <div className="about-features">
            <div className="feature">
              <Globe size={22} />
              <span>Globally accessible learning platform</span>
            </div>
            <div className="feature">
              <Award size={22} />
              <span>Industry-recognized certifications</span>
            </div>
            <div className="feature">
              <ShieldCheck size={22} />
              <span>Secure & trusted learning environment</span>
            </div>
          </div>

          <div className="about-stats">
            {stats.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={i} className="stat-card">
                  <Icon size={26} />
                  <h3>{s.number}</h3>
                  <p>{s.label}</p>
                </div>
              );
            })}
          </div>

         
          
        </div>

      </div>
    </section>
  );
};

export default AboutSection;