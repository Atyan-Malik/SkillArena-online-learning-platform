import React, { useEffect, useState } from "react";
import PaymentModal from "./PaymentModal.jsx";
import "../styles/PricingPlans.css";
import { Check, Sparkles, ArrowRight } from "lucide-react";

const PaidCourses = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    fetch("http://localhost:15000/api/paidcourses")
      .then((res) => res.json())
      .then((data) => setCourses(data))
      .catch((err) => console.error("Failed to fetch paid courses", err));
  }, []);

  return (
    <section className="paid-container">

      {/* Background */}

      <div className="paid-glow paid-glow-blue"></div>
      <div className="paid-glow paid-glow-purple"></div>


      <div className="paid-inner">

        {/* Header */}

        <div className="paid-header">

          <span className="paid-eyebrow">
            <Sparkles size={13} />
            PREMIUM LEARNING
          </span>

          <h2>
            Invest in Your{" "}
            <span>Future</span>
          </h2>

          <p>
            Go beyond scattered tutorials. Get structured,
            practical courses designed to build skills that
            actually matter in the real world.
          </p>

        </div>


        {/* Courses */}

        <div className="course-grid">

          {courses.map((course) => (

            <div
              key={course._id}
              className="course-card"
            >

              {/* Course Image */}

              <div className="course-image">

                <img
                  src={course.image}
                  alt={course.title}
                />

                <div className="course-image-overlay"></div>

                <span className="premium-badge">
                  <Sparkles size={11} />
                  Premium
                </span>

              </div>


              {/* Content */}

              <div className="course-content">

                <h3>{course.title}</h3>

                <p className="course-description">
                  {course.description}
                </p>


                {/* Benefits */}

                <div className="course-benefits">

                  <div>
                    <Check size={14} />
                    <span>Practical learning</span>
                  </div>

                  <div>
                    <Check size={14} />
                    <span>Real-world projects</span>
                  </div>

                  <div>
                    <Check size={14} />
                    <span>Career-focused skills</span>
                  </div>

                </div>


                {/* Bottom */}

                <div className="course-bottom">

                  <div className="course-price">
                    <span>Starting at</span>

                    <strong>
                      ${course.price}
                    </strong>
                  </div>


                  <button
                    className="course-buy-btn"
                    onClick={() => setSelectedCourse(course)}
                  >
                    Get Course
                    <ArrowRight size={16} />
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>


      {selectedCourse && (
        <PaymentModal
          course={selectedCourse}
          onClose={() => setSelectedCourse(null)}
        />
      )}

    </section>
  );
};

export default PaidCourses;