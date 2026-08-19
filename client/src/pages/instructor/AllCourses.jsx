import React, { useEffect, useState } from "react";
import CourseCard from "../../components/CourseCard.jsx";
import "./AllCourses.css";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch("http://localhost:15000/api/courses");

        if (!res.ok) {
          throw new Error("Failed to load courses");
        }

        const data = await res.json();

        setCourses(Array.isArray(data.courses) ? data.courses : []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div className="courses-page">
        <div className="courses-status">
          <div className="loading-spinner"></div>
          <p>Loading courses...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="courses-page">
        <div className="courses-status error">
          <h3>Unable to load courses</h3>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <section className="courses-page">

      {/* Background decoration */}
      <div className="courses-orb courses-orb-blue"></div>
      <div className="courses-orb courses-orb-coral"></div>

      <div className="courses-container">

        {/* Header */}
        <div className="courses-header">

          <div className="courses-eyebrow">
            <span></span>
            LEARN • BUILD • GROW
          </div>

          <h1>
            Explore{" "}
            <span className="courses-gradient">
              Courses
            </span>
          </h1>

          <p>
            Learn practical, in-demand skills from expert instructors
            and take the next step toward your career goals.
          </p>

        </div>

        {/* Toolbar */}
        <div className="courses-toolbar">

          <div className="courses-result">
            <strong>{courses.length}</strong>{" "}
            {courses.length === 1 ? "course" : "courses"} available
          </div>

          <div className="courses-toolbar-right">
            <button className="course-filter active">
              All Courses
            </button>
          </div>

        </div>

        {/* Courses */}
        {courses.length > 0 ? (
          <div className="courses-grid">
            {courses.map((course) => (
              <CourseCard
                key={course._id}
                course={course}
              />
            ))}
          </div>
        ) : (
          <div className="empty-courses">
            <div className="empty-icon">📚</div>

            <h3>No courses available yet</h3>

            <p>
              New courses are coming soon. Check back later!
            </p>
          </div>
        )}

      </div>
    </section>
  );
};

export default Courses;