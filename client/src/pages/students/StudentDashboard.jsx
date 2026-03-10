import React from "react";
import "./studentDashboard.css";

const StudentDashboard = () => {
  return (
    <div className="student-dashboard-content">
      <h1 className="dash-title">Welcome Back to SkillArena, Students!</h1>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Enrolled Courses</h3>
          <p>12</p>
        </div>
        <div className="stat-card">
          <h3>Completed Courses</h3>
          <p>08</p>
        </div>
        <div className="stat-card">
          <h3>Pending Assignments</h3>
          <p>05</p>
        </div>
        <div className="stat-card">
          <h3>Upcoming Tests</h3>
          <p>02</p>
        </div>
      </div>

      <div className="recent-courses">
        <h2>Recently Enrolled Courses</h2>
        <table>
          <thead>
            <tr>
              <th>Course Name</th>
              <th>Progress</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>React Basics</td>
              <td>80%</td>
              <td>Ongoing</td>
            </tr>
            <tr>
              <td>MERN Stack Bootcamp</td>
              <td>100%</td>
              <td>Completed</td>
            </tr>
            <tr>
              <td>UI/UX Design</td>
              <td>40%</td>
              <td>Ongoing</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentDashboard;
