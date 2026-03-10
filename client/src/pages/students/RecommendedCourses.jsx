import React, { useEffect, useState } from "react";
import "./RecommendedCourses.css";
import { Search, UserCircle, Trash2, Eye } from "lucide-react";

const ManageStudents = () => {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:15000/api/allusers");
        const data = await res.json();

        const onlyStudents = data.users.filter(
  (user) => user.role === "student"
);

        setStudents(onlyStudents);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredStudents = students.filter((stu) => {
    return (
      stu.name.toLowerCase().includes(search.toLowerCase()) &&
      (statusFilter ? stu.status === statusFilter : true)
    );
  });

  if (loading) return <p>Loading students...</p>;

  return (
    <div className="students-container">

      <h1 className="page-title">Manage Students</h1>
      <p className="page-subtitle">
        View, filter and manage all your enrolled students.
      </p>

      <div className="top-bar">

        <div className="search-box">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            placeholder="Search students..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          className="filter-dropdown"
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>

      </div>

      <div className="students-table-wrapper">
        <table className="students-table">
          <thead>
            <tr>
              <th>Student</th>
              <th>Email</th>
              <th>Date Joined</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredStudents.map((stu) => (
              <tr key={stu._id}>
                <td className="student-info">
                  <UserCircle size={32} className="user-icon" />
                  <span>{stu.name}</span>
                </td>

                <td>{stu.email}</td>

                <td>
                  {stu.createdAt
                    ? new Date(stu.createdAt).toLocaleDateString()
                    : "N/A"}
                </td>

                <td>
                  <span
                    className={`status-badge ${
                      stu.status === "active"
                        ? "active"
                        : "inactive"
                    }`}
                  >
                    {stu.status || "active"}
                  </span>
                </td>

                <td>
                  <div className="action-buttons">
                    <button className="view-btn">
                      <Eye size={18} />
                    </button>

                    <button className="remove-btn">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </div>
  );
};

export default ManageStudents;
