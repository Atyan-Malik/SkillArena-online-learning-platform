import React from "react";
import "../styles/About.css";
import {
  GraduationCap,
  Laptop,
  Users,
  Globe,
  Award,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";
import aboutImage from "/about2 (2).jpg";

const stats = [
  {
    icon: GraduationCap,
    number: "15K+",
    label: "Active Students",
  },
  {
    icon: Laptop,
    number: "120+",
    label: "Expert-Led Courses",
  },
  {
    icon: Users,
    number: "50+",
    label: "Certified Instructors",
  },
];

const highlights = [
  {
    icon: Globe,
    title: "Learn Without Limits",
    text: "Access practical learning from anywhere in the world.",
  },
  {
    icon: Award,
    title: "Career-Focused Skills",
    text: "Build skills aligned with today's evolving industries.",
  },
  {
    icon: ShieldCheck,
    title: "Trusted Learning",
    text: "Learn in a secure and reliable digital environment.",
  },
];

const AboutSection = () => {
  return (
    <section className="sa-about">

      {/* Background decoration */}
      <div className="about-orb about-orb-blue"></div>
      <div className="about-orb about-orb-coral"></div>

      <div className="about-container">

        {/* =========================
            IMAGE SIDE
        ========================= */}

        <div className="about-visual">

          <div className="about-image-wrapper">

            <img
              src={aboutImage}
              alt="Students learning through SkillArena"
              className="about-image"
            />

            <div className="about-image-overlay"></div>

          </div>

          {/* Floating trust card */}

          <div className="about-floating-card">

            <div className="floating-icon">
              <GraduationCap size={20} />
            </div>

            <div>
              <strong>15K+</strong>
              <span>Students learning</span>
            </div>

          </div>

          {/* Decorative element */}

          <div className="about-decoration">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>

        </div>


        {/* =========================
            CONTENT SIDE
        ========================= */}

        <div className="about-content">

          <span className="about-eyebrow">
            <span className="about-eyebrow-dot"></span>
            ABOUT SKILL ARENA
          </span>

          <h2>
            Building Skills for a{" "}
            <span>Changing World</span>
          </h2>

          <p className="about-description">
            Skill Arena is a modern learning platform designed to bridge
            the gap between traditional education and the skills today's
            industries actually need.
          </p>

          <p className="about-description secondary">
            From practical projects to expert-led courses, we help learners
            gain the confidence and knowledge they need to move forward in
            their careers.
          </p>


          {/* Highlights */}

          <div className="about-highlights">

            {highlights.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  className="about-highlight"
                  key={index}
                >

                  <div className="highlight-icon">
                    <Icon size={20} strokeWidth={1.8} />
                  </div>

                  <div className="highlight-content">
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>

                </div>
              );
            })}

          </div>


          {/* Stats */}

          <div className="about-stats">

            {stats.map((stat, index) => {
              const Icon = stat.icon;

              return (
                <div
                  className="about-stat"
                  key={index}
                >

                  <Icon
                    className="stat-icon"
                    size={20}
                    strokeWidth={1.8}
                  />

                  <div>
                    <h3>{stat.number}</h3>
                    <p>{stat.label}</p>
                  </div>

                </div>
              );
            })}

          </div>


          {/* CTA */}

          <a
            href="/courses"
            className="about-cta"
          >
            Explore Our Courses
            <ArrowUpRight size={18} />
          </a>

        </div>

      </div>
    </section>
  );
};

export default AboutSection;