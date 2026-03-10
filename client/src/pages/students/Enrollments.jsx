import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./EnrollCourse.css";

const EnrollCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
      const token = user?.token;
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await fetch(`http://localhost:15000/api/courses/${id}`);
        if (!res.ok) return console.log("Course not found");
        const data = await res.json();
        setCourse(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCourse();
  }, [id]);

  const handleEnroll = async () => {
    navigate("/dashboard/enrollcourses")
    if (!token) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:15000/api/enroll-courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ courseId: id }),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.message);
        setLoading(false);
        return;
      }

      alert("Enrolled Successfully ");
      navigate("/student/enrolled-courses");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (!course) return <p className="loading-text">Loading...</p>;

  return (
    <div className="enroll-container">
      <div className="enrollcourse-card">
        <h2 className="enrollcourse-title">{course.title}</h2>
        <p className="enrollcourse-description">{course.description}</p>
        <h3 className="enrollcourse-price">${course.price}</h3>

        <button
          className="enroll-btn"
          onClick={handleEnroll}
          disabled={loading}
        >
          {loading ? "Enrolling..." : "Confirm Enrollment"}
        </button>
      </div>
    </div>
  );
};

export default EnrollCourse;