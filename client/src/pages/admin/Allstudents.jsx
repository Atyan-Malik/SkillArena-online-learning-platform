import React, { useEffect, useState } from "react";
import "./StudentsList.css";

const StudentsList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // =========================
  // FETCH USERS FROM BACKEND
  // =========================
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch("http://localhost:15000/api/allusers"); // fetch all users
        const data = await res.json();

        // Filter only students
        const studentsOnly = data.users.filter((user) => user.role === "student");
        setStudents(studentsOnly);
      } catch (error) {
        console.error("Fetch error:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  // =========================
  // SEARCH & STATUS FILTER
  // =========================
  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(search.toLowerCase()) ||
      student.email.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All"
        ? true
        : statusFilter === "Active"
        ? student.status === "active"
        : student.status === "suspended";

    return matchesSearch && matchesStatus;
  });

  if (loading) return <p>Loading students...</p>;

  return (
    <div className="students-list-page">
      <div className="students-header">
        <h2> All Students</h2>
        <p>View, search, and manage all students in the system.</p>
      </div>

      <div className="students-controls">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />

        <select
          className="filter-select"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option>All</option>
          <option>Active</option>
          <option>Suspended</option>
        </select>
      </div>

      <div className="students-table-container">
        <table className="students-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Joined</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredStudents.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  No students found
                </td>
              </tr>
            ) : (
              filteredStudents.map((student) => (
                <tr key={student._id}>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>
                    <span
                      className={
                        student.status === "active"
                          ? "active-status"
                          : "suspended-status"
                      }
                    >
                      {student.status === "active" ? "Active" : "Learning"}
                    </span>
                  </td>
                  <td>{new Date(student.createdAt).toLocaleDateString()}</td>
                  <td className="actions">
                    <button className="edit-btn">Edit</button>
                    {student.status === "active" ? (
                      <button className="ban-btn">Learning</button>
                    ) : (
                      <button className="unban-btn">Activate</button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentsList;
