import React, { useEffect, useState } from "react";
import "../styles/InstructorShowcase.css";

const InstructorShowcase = () => {
  const [instructors, setInstructors] = useState([]);

 useEffect(() => {
  const fetchInstructors = async () => {
    try {
      const res = await fetch("http://localhost:15000/api/allusers");
      const data = await res.json();

      const instructorsOnly = Array.isArray(data)
        ? data.filter(u => u.role === "instructor")
        : data.users?.filter(u => u.role === "instructor") || [];

      setInstructors(instructorsOnly);
    } catch (error) {
      console.error("Failed to fetch instructors", error);
    }
  };

  fetchInstructors();
}, []);


  return (
    <section className="sa-instructors">
      <div className="instructors-container">
        <div className="instructors-header">
          <h2>
            Meet Our <span className="blue-text">Instructors</span>
          </h2>
          <p>Learn from industry experts who are passionate about teaching.</p>
        </div>

        <div className="instructors-grid">
          {instructors.map((inst) => (
            <div key={inst._id} className="instructor-card">
              <div className="instructor-img">
                <img src="./education.jpg" alt="" />
              </div>
              <h3>{inst.name}</h3>
              <p>{inst.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstructorShowcase;
