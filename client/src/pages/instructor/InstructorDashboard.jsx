import React from "react";
import { useNavigate } from "react-router-dom";
import "./InstructorDashboardHome.css";
import { BookOpen, Users, BarChart2, PlusCircle, TrendingUp } from "lucide-react";

const InstructorDashboardHome = () => {
 const navigate=useNavigate()
  const handleClick=()=>{
  navigate("/dashboard/instructor/createcourses")
  }
  return (
    <div className="instructor-dashboard-container">

      <h1 className="instructor-title">Instructor Dashboard</h1>
      <p className="welcome-text">Welcome back! Here's your teaching overview.</p>

      <div className="stats-grid">
        <div className="stats-card">
          <div className="stats-icon icon-blue"><BookOpen size={30} /></div>
          <div>
            <h3>12</h3>
            <p>Published Courses</p>
          </div>
        </div>

        <div className="stats-card">
          <div className="stats-icon icon-red"><Users size={30} /></div>
          <div>
            <h3>4,520</h3>
            <p>Total Students</p>
          </div>
        </div>

        <div className="stats-card">
          <div className="stats-icon icon-green"><TrendingUp size={30} /></div>
          <div>
            <h3>$8,340</h3>
            <p>Earnings This Month</p>
          </div>
        </div>

        <div className="stats-card">
          <div className="stats-icon icon-purple"><BarChart2 size={30} /></div>
          <div>
            <h3>89%</h3>
            <p>Course Rating</p>
          </div>
        </div>
      </div>

      <button onClick={handleClick} className="create-course-btn">
        <PlusCircle size={20} /> Create New Course
      </button>

     
    </div>
  );
};

export default InstructorDashboardHome;
