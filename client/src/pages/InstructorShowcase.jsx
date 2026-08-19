import React, { useEffect, useState } from "react";
import "../styles/InstructorShowcase.css";
import { Award, BookOpen, ArrowUpRight } from "lucide-react";

const InstructorShowcase = () => {
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const res = await fetch("http://localhost:15000/api/allusers");
        const data = await res.json();

        const instructorsOnly = Array.isArray(data)
          ? data.filter((u) => u.role === "instructor")
          : data.users?.filter((u) => u.role === "instructor") || [];

        setInstructors(instructorsOnly);
      } catch (error) {
        console.error("Failed to fetch instructors", error);
      }
    };

    fetchInstructors();
  }, []);

  return (
    <section className="sa-instructors">

      <div className="instructors-glow instructors-glow-blue"></div>
      <div className="instructors-glow instructors-glow-purple"></div>

      <div className="instructors-container">

        {/* Header */}

        <div className="instructors-header">

          <span className="instructors-eyebrow">
            <span></span>
            LEARN FROM THE BEST
          </span>

          <h2>
           Meet Our{" "} 
            <span>Instructors</span>
          </h2>

          <p>
            Learn from experienced professionals who bring
            real-world knowledge into every lesson.
          </p>

        </div>


        {/* Instructor Grid */}

        <div className="instructors-grid">

          {instructors.map((inst) => (

            <div
              key={inst._id}
              className="instructor-card"
            >

              {/* Image */}

              <div className="instructor-img">

                <img
                  src="./education.jpg"
                  alt={inst.name}
                />

                <div className="instructor-img-overlay"></div>

                <div className="instructor-badge">
                  <Award size={13} />
                  Expert Instructor
                </div>

                <button
                  className="instructor-arrow"
                  aria-label={`View ${inst.name}`}
                >
                  <ArrowUpRight size={17} />
                </button>

              </div>


              {/* Content */}

              <div className="instructor-content">

                <div>
                  <h3>{inst.name}</h3>

                  <p className="instructor-role">
                    {inst.role}
                  </p>
                </div>


                <div className="instructor-meta">

                  <div>
                    <BookOpen size={14} />
                    <span>Expert-led learning</span>
                  </div>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
};

export default InstructorShowcase;