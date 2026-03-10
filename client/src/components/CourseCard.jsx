import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/CourseCard.css";
import { Star, BookOpen } from "lucide-react";

const CourseCard = ({ course }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    // Navigate to enroll page with course ID
    navigate(`/dashboard/enrollments/${course._id}`);
  };

  return (
    <div className="course-card">
      {/* Thumbnail */}
      <div className="course-thumb-wrapper">
        <img
          src={course.thumbnail ? `http://localhost:15000${course.thumbnail}` : "/placeholder.png"}
          alt={course.title}
          className="course-thumb"
        />
      </div>

      <div className="course-body">
        <h3 className="course-title">{course.title}</h3>
        <p className="course-category">{course.category}</p>

        <p className="course-description">
          {course.description.length > 100
            ? course.description.substring(0, 100) + "..."
            : course.description}
        </p>

        <div className="course-meta">
          <span className="lessons">
            <BookOpen size={16} /> {course.description ? "Preview" : "0"} Lessons
          </span>
          <span className="price">${course.price}</span>
        </div>

        <button onClick={handleClick} className="enroll-btn">
          Enroll Now
        </button>
      </div>
    </div>
  );
};

export default CourseCard;