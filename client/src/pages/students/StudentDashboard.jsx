import React from "react";
import {
  BookOpen,
  CheckCircle,
  ClipboardList,
  FileText,
  ArrowRight,
    Hand,
  Rocket,
} from "lucide-react";
import "./StudentDashboard.css";

const StudentDashboard = () => {
  const courses = [
    {
      name: "React Basics",
      progress: 80,
      status: "Ongoing",
    },
    {
      name: "MERN Stack Bootcamp",
      progress: 100,
      status: "Completed",
    },
    {
      name: "UI/UX Design",
      progress: 40,
      status: "Ongoing",
    },
  ];

  return (
    <div className="student-dashboard-content">

      {/* =================================
          HEADER
      ================================= */}

      <div className="dashboard-header">
        <div>
          <span className="dashboard-eyebrow">
            STUDENT DASHBOARD
          </span>

          <h1 className="dash-title">
            Welcome back to <span>SkillArena !</span> 
          </h1>

          <p className="dash-subtitle">
            Keep learning, track your progress, and achieve your goals.
          </p>
        </div>

        <div className="dashboard-date">
          <span>Learning Progress</span>
          <strong>Keep Going <Rocket size={21} color="orange"/></strong>
        </div>
      </div>


      {/* =================================
          STATS
      ================================= */}

      <div className="stats-grid">

        <div className="stat-card">
          <div className="stat-card-top">
            <div className="stat-icon blue">
              <BookOpen size={21} />
            </div>

            <span className="stat-label">
              Enrolled Courses
            </span>
          </div>

          <h3>12</h3>

          <p>
            Courses you're currently learning
          </p>
        </div>


        <div className="stat-card">
          <div className="stat-card-top">
            <div className="stat-icon green">
              <CheckCircle size={21} />
            </div>

            <span className="stat-label">
              Completed Courses
            </span>
          </div>

          <h3>08</h3>

          <p>
            Courses successfully completed
          </p>
        </div>


        <div className="stat-card">
          <div className="stat-card-top">
            <div className="stat-icon orange">
              <ClipboardList size={21} />
            </div>

            <span className="stat-label">
              Pending Assignments
            </span>
          </div>

          <h3>05</h3>

          <p>
            Assignments waiting for submission
          </p>
        </div>


        <div className="stat-card">
          <div className="stat-card-top">
            <div className="stat-icon purple">
              <FileText size={21} />
            </div>

            <span className="stat-label">
              Upcoming Tests
            </span>
          </div>

          <h3>02</h3>

          <p>
            Tests scheduled for you
          </p>
        </div>

      </div>


      {/* =================================
          RECENT COURSES
      ================================= */}

      <div className="recent-courses">

        <div className="section-header">
          <div>
            <h2>Recently Enrolled Courses</h2>

            <p>
              Continue learning where you left off.
            </p>
          </div>

          <button className="view-all-btn">
            View All
            <ArrowRight size={16} />
          </button>
        </div>


        <div className="courses-table-wrapper">

          <table className="courses-table">

            <thead>
              <tr>
                <th>Course</th>
                <th>Progress</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>

              {courses.map((course, index) => (

                <tr key={index}>

                  <td>
                    <div className="course-name">
                      <div className="course-icon">
                        <BookOpen size={18} />
                      </div>

                      <div>
                        <strong>{course.name}</strong>
                        <span>Online Course</span>
                      </div>
                    </div>
                  </td>


                  <td>

                    <div className="progress-wrapper">

                      <div className="progress-info">
                        <span>Progress</span>
                        <strong>
                          {course.progress}%
                        </strong>
                      </div>

                      <div className="progress-bar">
                        <div
                          className="progress-fill"
                          style={{
                            width: `${course.progress}%`,
                          }}
                        ></div>
                      </div>

                    </div>

                  </td>


                  <td>

                    <span
                      className={`course-status ${
                        course.status === "Completed"
                          ? "completed"
                          : "ongoing"
                      }`}
                    >
                      {course.status}
                    </span>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>


      {/* =================================
          LEARNING TIP
      ================================= */}

      <div className="learning-tip">

        <div className="tip-icon">
          <Rocket size={21} color="orange"/>
        </div>

        <div>
          <h3>Keep your learning momentum!</h3>

          <p>
            Consistent learning is the key to mastering new skills.
            Complete your pending assignments and keep progressing.
          </p>
        </div>

      </div>

    </div>
  );
};

export default StudentDashboard;