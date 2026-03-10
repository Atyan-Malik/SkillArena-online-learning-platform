import React from "react";
import "./InstructorAnalytics.css";

const InstructorAnalytics = () => {
  return (
    <div className="analytics-page">

      <div className="analytics-header">
        <h2>Analytics Overview</h2>
        <p>Track performance, revenue, traffic, and student behavior.</p>
      </div>

      <div className="analytics-kpis">
        <div className="analytics-card">
          <h3>$12,850</h3>
          <p>Total Earnings</p>
        </div>

        <div className="analytics-card">
          <h3>8,430</h3>
          <p>Total Enrollments</p>
        </div>

        <div className="analytics-card">
          <h3>3,920</h3>
          <p>Monthly Active Students</p>
        </div>

        <div className="analytics-card">
          <h3>27%</h3>
          <p>Growth Rate</p>
        </div>
      </div>

      <div className="earnings-section">
        <h3>Earnings (Last 6 Months)</h3>
        <div className="chart-placeholder">
          <p>Line Chart Placeholder</p>
        </div>
      </div>

      <div className="course-analytics">
        <h3>Course Performance</h3>
        <div className="course-grid">
          <div className="course-box">
            <h4>MERN Stack Bootcamp</h4>
            <p>4,300 Enrollments</p>
            <span>⭐ 4.9 Rating</span>
          </div>

          <div className="course-box">
            <h4>React & Redux Mastery</h4>
            <p>2,780 Enrollments</p>
            <span>⭐ 4.8 Rating</span>
          </div>

          <div className="course-box">
            <h4>Node.js API Development</h4>
            <p>1,950 Enrollments</p>
            <span>⭐ 4.7 Rating</span>
          </div>

          <div className="course-box">
            <h4>JavaScript Zero to Hero</h4>
            <p>1,630 Enrollments</p>
            <span>⭐ 4.6 Rating</span>
          </div>
        </div>
      </div>

      <div className="traffic-section">
        <h3>Traffic Sources</h3>
        <ul>
          <li><strong>Google Search:</strong> 48%</li>
          <li><strong>YouTube:</strong> 23%</li>
          <li><strong>Direct:</strong> 18%</li>
          <li><strong>Social Media:</strong> 11%</li>
        </ul>
      </div>

      <div className="demographics-section">
        <h3>Student Demographics</h3>
        <div className="demographics-grid">

          <div className="demo-card">
            <h4>Age Groups</h4>
            <p>18–24: 40%</p>
            <p>25–34: 35%</p>
            <p>35–44: 15%</p>
            <p>45+: 10%</p>
          </div>

          <div className="demo-card">
            <h4>Countries</h4>
            <p>Pakistan – 31%</p>
            <p>India – 27%</p>
            <p>USA – 14%</p>
            <p>Other – 28%</p>
          </div>

          <div className="demo-card">
            <h4>Device Usage</h4>
            <p>Mobile – 57%</p>
            <p>Desktop – 34%</p>
            <p>Tablet – 9%</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default InstructorAnalytics;
