import React, { useEffect, useState } from "react";
import PaymentModal from "./PaymentModal.jsx";
import "../styles/PricingPlans.css";

const PaidCourses = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    fetch("http://localhost:15000/api/paidcourses")
      .then((res) => res.json())
      .then((data) => setCourses(data));
  }, []);

  return (
    <div className="paid-container">
      <h2 className="paid-course">
        Paid<span className="redish">Courses</span>
      </h2>
      <h4>
        Stop wasting time on scattered free tutorials. <br />
        This premium course is designed to give you clarity, structure, and
        real-world skills that companies actually demand.
      </h4>
      <div className="course-grid">
        {courses.map((course) => (
          <div key={course._id} className="course-card">
            <img src={course.image} alt={course.title} />
            <h3>{course.title}</h3>
            <p>{course.description}</p>
            <h4>${course.price}</h4>
            <button onClick={() => setSelectedCourse(course)}>Pay Now</button>
          </div>
        ))}
      </div>

      {selectedCourse && (
        <PaymentModal
          course={selectedCourse}
          onClose={() => setSelectedCourse(null)}
        />
      )}
    </div>
  );
};

export default PaidCourses;
