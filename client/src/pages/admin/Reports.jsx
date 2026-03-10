import React from "react";
import "./AdminReports.css";

const AdminReports = () => {
  const reports = [
    {
      id: 1,
      type: "Course Content",
      reporter: "Ali Raza",
      reportedUser: "Sarah Ahmed",
      course: "Complete UI/UX Mastery",
      status: "Pending",
      date: "Jan 10, 2026"
    },
    {
      id: 2,
      type: "Inappropriate Behavior",
      reporter: "John Smith",
      reportedUser: "Bilal Khan",
      course: "Node.js Bootcamp",
      status: "Resolved",
      date: "Dec 28, 2025"
    },
    {
      id: 3,
      type: "Spam",
      reporter: "Sara Ahmed",
      reportedUser: "Ali Raza",
      course: "MERN Fullstack",
      status: "Pending",
      date: "Jan 05, 2026"
    }
  ];

  return (
    <div className="admin-reports-page">

      <div className="reports-header">
        <h2> Reports & Violations</h2>
        <p>Review and manage all submitted reports on courses or users.</p>
      </div>

   
      <div className="reports-controls">
        <input type="text" placeholder="Search by user, course, or type..." className="search-input" />
        <select className="filter-select">
          <option>Status: All</option>
          <option>Pending</option>
          <option>Resolved</option>
        </select>
      </div>

    
      <div className="reports-table-container">
        <table className="reports-table">
          <thead>
            <tr>
              <th>Type</th>
              <th>Reporter</th>
              <th>Reported User</th>
              <th>Course</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {reports.map(report => (
              <tr key={report.id}>
                <td>{report.type}</td>
                <td>{report.reporter}</td>
                <td>{report.reportedUser}</td>
                <td>{report.course}</td>
                <td>
                  <span className={`status-badge ${report.status.toLowerCase()}`}>
                    {report.status}
                  </span>
                </td>
                <td>{report.date}</td>
                <td className="actions">
                  <button className="resolve-btn">Resolve</button>
                  <button className="suspend-btn">Suspend User</button>
                  <button className="delete-btn">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default AdminReports;
