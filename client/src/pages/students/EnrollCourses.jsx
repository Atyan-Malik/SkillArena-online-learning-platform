import React, { useEffect, useState } from "react";

const EnrolledCourses = () => {
  const [courses, setCourses] = useState([]);
   const user = JSON.parse(localStorage.getItem("user"));
      const token = user?.token;

  const fetchEnrolledCourses = async () => {
    try {
      const res = await fetch("http://localhost:15000/api/enrollcourses", {
        method: "GET",

        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
     console.log(data)
      if (!res.ok) {
        console.log(data.message);
        return;
      }

      setCourses(data);
    } catch (error) {
      console.error("Fetch Error:", error);
    }
  };

  useEffect(() => {
    fetchEnrolledCourses();
  }, []);

  return (
    <div className="enrolled-container">
      <h2>My Enrolled Courses</h2>

      {courses.length === 0 ? (
        <p>No courses enrolled yet.</p>
      ) : (
        courses.map((item) => (
          <div key={item._id} className="course-card">
            <h3>{item.course.title}</h3>
            <p>{item.course.description}</p>
            <p className="red">Price: ${item.course.price}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default EnrolledCourses;
