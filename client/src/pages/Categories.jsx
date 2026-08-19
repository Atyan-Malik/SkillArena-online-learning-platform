import React, { useEffect, useState } from "react";
import "../styles/Categories.css";
import {
  Code,
  PenTool,
  BarChart2,
  Cpu,
  Camera,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";

const iconMap = {
  Code,
  PenTool,
  BarChart2,
  Cpu,
  Camera,
  TrendingUp,
};

const PopularCategories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("http://localhost:15000/api/categories");
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    };

    fetchCategories();
  }, []);

  return (
    <section className="sa-categories">
      {/* Ambient background */}
      <div className="categories-orb categories-orb-one"></div>
      <div className="categories-orb categories-orb-two"></div>

      <div className="categories-container">

        {/* Header */}
        <div className="categories-header">

          <span className="category-badge">
            <span className="category-badge-dot"></span>
            EXPLORE & LEARN
          </span>

          <h2>
            Explore{" "}
            <span className="gradient-text">
              Popular Categories
            </span>
          </h2>

          <p>
            Discover in-demand skills, explore new interests, and find
            courses designed to help you move your career forward.
          </p>

        </div>

        {/* Categories */}
        <div className="categories-grid">

          {categories.map((cat, index) => {
            const Icon = iconMap[cat.icon] || Code;

            return (
              <div
                key={cat._id}
                className="category-card"
                style={{ "--accent": cat.color }}
              >

                {/* Hover glow */}
                <div className="category-glow"></div>

                {/* Top row */}
                <div className="category-top">

                  <div className="category-icon">
                    <Icon size={29} strokeWidth={1.8} />
                  </div>

                  <span className="category-index">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                </div>

                {/* Content */}
                <div className="category-content">

                  <h3>{cat.title}</h3>

                  <p className="course-count">
                    {cat.courseCount}+ Courses
                  </p>

                </div>

                {/* Bottom action */}
                <div className="category-action">
                  <span>Explore category</span>
                  <ArrowUpRight size={17} />
                </div>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
};

export default PopularCategories;