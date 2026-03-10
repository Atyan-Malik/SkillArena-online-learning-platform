import React, { useEffect, useState } from "react";
import "../styles/Categories.css";
import {
  Code,
  PenTool,
  BarChart2,
  Cpu,
  Camera,
  TrendingUp
} from "lucide-react";

const iconMap = {
  Code: Code,
  PenTool: PenTool,
  BarChart2: BarChart2,
  Cpu: Cpu,
  Camera: Camera,
  TrendingUp: TrendingUp
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
      <div className="categories-container">
        <div className="categories-header">
          <h2>
            Explore <span className="blue-text">Popular Categories</span>
          </h2>
          <p>Browse courses by your favorite topics and start learning today!</p>
        </div>

        <div className="categories-grid">
          {categories.map((cat) => {
            const Icon = iconMap[cat.icon];

            return (
              <div
                key={cat._id}
                className="category-card premium"
                style={{ "--accent": cat.color }}
              >
                <div className="category-icon">
                  <Icon size={30} />
                </div>

                <h3>{cat.title}</h3>
                <p className="course-count">
                  {cat.courseCount}+ Courses
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PopularCategories;
