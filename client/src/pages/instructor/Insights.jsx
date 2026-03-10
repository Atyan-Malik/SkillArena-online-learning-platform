import React from "react";
import "./InstructorInsights.css";

const InstructorInsights = () => {
  return (
    <div className="insights-page">

      <div className="insights-header">
        <h2> Instructor Insights</h2>
        <p>Analyze your teaching performance and engagement statistics.</p>
      </div>

      <div className="insights-kpis">
        <div className="kpi-card">
          <h3>12,450</h3>
          <p>Total Students Enrolled</p>
        </div>

        <div className="kpi-card">
          <h3>4.8⭐</h3>
          <p>Average Rating</p>
        </div>

        <div className="kpi-card">
          <h3>78%</h3>
          <p>Completion Rate</p>
        </div>

        <div className="kpi-card">
          <h3>1.2M</h3>
          <p>Total Views</p>
        </div>
      </div>

      <div className="insights-chart">
        <h3>Student Engagement Overview</h3>
        <div className="chart-box">
          <p>Chart Placeholder (Engagement Graph)</p>
        </div>
      </div>

      <div className="course-performance">
        <h3>Top Performing Courses</h3>

        <table>
          <thead>
            <tr>
              <th>Course</th>
              <th>Students</th>
              <th>Rating</th>
              <th>Completion</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>MERN Full-Stack Mastery</td>
              <td>4,300</td>
              <td>4.9 ⭐</td>
              <td>84%</td>
            </tr>

            <tr>
              <td>React & Redux Pro Bootcamp</td>
              <td>2,780</td>
              <td>4.8 ⭐</td>
              <td>72%</td>
            </tr>

            <tr>
              <td>Node.js API Development</td>
              <td>1,950</td>
              <td>4.7 ⭐</td>
              <td>69%</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="student-activity">
        <h3>Recent Student Activity</h3>

        <ul>
          <li><strong>Ali Raza</strong> completed "React Basics".</li>
          <li><strong>Sara Ahmed</strong> enrolled in "MERN Bootcamp".</li>
          <li><strong>Bilal Khan</strong> left a ⭐⭐⭐⭐⭐ review.</li>
          <li><strong>John Mark</strong> watched 3 new lessons.</li>
        </ul>
      </div>

    </div>
  );
};

export default InstructorInsights;
