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
      if (!res.ok) throw new Error("Failed to load courses");

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

  if (loading) return <p className="status">Loading courses...</p>;
  if (error) return <p className="status error">{error}</p>;

  return (
    <div className="courses-page">
      <h1 className="courses-title">Explore <span className="red">Courses</span> </h1>

      <div className="courses-grid">
        {courses.map((course) => (
          <CourseCard key={course._id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default Courses;
