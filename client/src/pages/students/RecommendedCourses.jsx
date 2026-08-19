import React, { useEffect, useState } from "react";
import "./RecommendedCourses.css";
import {
  Search,
  UserCircle,
  Trash2,
  Eye,
  Users,
  UserCheck,
} from "lucide-react";

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
    const searchValue = search.toLowerCase();

    const matchesSearch =
      stu.name?.toLowerCase().includes(searchValue) ||
      stu.email?.toLowerCase().includes(searchValue);

    const matchesStatus = statusFilter
      ? stu.status === statusFilter
      : true;

    return matchesSearch && matchesStatus;
  });

  const activeStudents = students.filter(
    (student) => student.status === "active"
  ).length;

  const getInitials = (name) => {
    if (!name) return "U";

    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  if (loading) {
    return (
      <div className="students-loading">
        <div className="loading-spinner"></div>
        <p>Loading students...</p>
      </div>
    );
  }

  return (
    <div className="students-container">

      {/* HEADER */}
      <div className="students-header">

        <div>
          <h1 className="page-title">
            Manage Students
          </h1>

          <p className="page-subtitle">
            View, search and manage all students registered on SkillArena.
          </p>
        </div>

        <div className="student-summary">

          <div className="summary-icon">
            <Users size={20} />
          </div>

          <div>
            <strong>{students.length}</strong>
            <span>Total Students</span>
          </div>

        </div>

      </div>


      {/* STATS */}
      <div className="student-stats">

        <div className="student-stat-card">

          <div className="stat-icon blue">
            <Users size={21} />
          </div>

          <div>
            <span>Total Students</span>
            <strong>{students.length}</strong>
          </div>

        </div>


        <div className="student-stat-card">

          <div className="stat-icon green">
            <UserCheck size={21} />
          </div>

          <div>
            <span>Active Students</span>
            <strong>{activeStudents}</strong>
          </div>

        </div>

      </div>


      {/* FILTER BAR */}
      <div className="top-bar">

        <div className="search-box">

          <Search
            className="search-icon"
            size={19}
          />

          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>


        <select
          className="filter-dropdown"
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value)
          }
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>

      </div>


      {/* TABLE */}
      <div className="students-table-wrapper">

        <table className="students-table">

          <thead>
            <tr>
              <th>Student</th>
              <th>Email</th>
              <th>Date Joined</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>


          <tbody>

            {filteredStudents.length > 0 ? (

              filteredStudents.map((stu) => (

                <tr key={stu._id}>

                  {/* STUDENT */}
                  <td>

                    <div className="student-info">

                      {stu.avatar ? (
                        <img
                          src={stu.avatar}
                          alt={stu.name}
                          className="student-avatar"
                        />
                      ) : (
                        <div className="student-avatar initials">
                          {getInitials(stu.name)}
                        </div>
                      )}

                      <div className="student-name">

                        <strong>
                          {stu.name}
                        </strong>

                        <span>
                          Student
                        </span>

                      </div>

                    </div>

                  </td>


                  {/* EMAIL */}
                  <td className="student-email">
                    {stu.email}
                  </td>


                  {/* DATE */}
                  <td className="joined-date">

                    {stu.createdAt
                      ? new Date(
                          stu.createdAt
                        ).toLocaleDateString(
                          "en-US",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          }
                        )
                      : "N/A"}

                  </td>


                  {/* STATUS */}
                  <td>

                    <span
                      className={`status-badge ${
                        stu.status === "active"
                          ? "active"
                          : "inactive"
                      }`}
                    >
                      <span className="status-dot"></span>

                      {stu.status || "active"}

                    </span>

                  </td>


                  {/* ACTIONS */}
                  <td>

                    <div className="action-buttons">

                      <button
                        className="action-btn view-btn"
                        title="View Student"
                      >
                        <Eye size={17} />
                      </button>

                      <button
                        className="action-btn remove-btn"
                        title="Remove Student"
                      >
                        <Trash2 size={17} />
                      </button>

                    </div>

                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan="5"
                  className="empty-state"
                >

                  <UserCircle size={42} />

                  <strong>
                    No students found
                  </strong>

                  <span>
                    Try changing your search or filter.
                  </span>

                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default ManageStudents;