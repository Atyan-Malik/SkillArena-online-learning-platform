import React, { useEffect, useState } from "react";
import "./AdminCourses.css";

const AdminCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");


  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch("http://localhost:15000/api/courses"); 
        const data = await res.json();

        setCourses(data.courses || data);
      } catch (error) {
        console.error("Fetch error:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  
  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(search.toLowerCase()) ||
      course.description.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All"
        ? true
        : statusFilter === "Published"
        ? course.status === "published"
        : course.status === "draft";

    return matchesSearch && matchesStatus;
  });

  if (loading) return <p>Loading courses...</p>;

  return (
    <div className="admin-courses-page">
    
      <div className="courses-header">
        <h2> Manage Courses</h2>
        <p>View, search, and manage all courses in the system.</p>
      </div>

 
      <div className="courses-controls">
        <input
          type="text"
          placeholder="Search by title or description..."
          className="search-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="filter-select"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option>All</option>
          <option>Published</option>
          <option>Draft</option>
        </select>
      </div>

    
      <div className="courses-table-container">
        <table className="courses-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Instructor</th>
              <th>Status</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredCourses.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  No courses found
                </td>
              </tr>
            ) : (
              filteredCourses.map((course) => (
                <tr key={course._id}>
                  <td>{course.title}</td>
                  <td>{course.description}</td>
                  <td>{course.instructor?.name || "N/A"}</td>
                  <td>
                    <span
                      className={
                        course.status === "published"
                          ? "published-status"
                          : "draft-status"
                      }
                    >
                      {course.status === "published" ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td>{new Date(course.createdAt).toLocaleDateString()}</td>
                  <td className="actions">
                    <button className="edit-btn">Edit</button>
                    <button className="delete-btn">Delete</button>
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

export default AdminCourses;
