import React, { useEffect, useState } from "react";
import "./AdminUsers.css";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All Users");
  const [statusFilter, setStatusFilter] = useState("All");


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:15000/api/allusers"); 
        const data = await res.json();

        setUsers(data.users || []);
      } catch (error) {
        console.error("Fetch error:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

 
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());

    const matchesRole =
      roleFilter === "All Users" ? true : user.role.toLowerCase() === roleFilter.toLowerCase();

    const matchesStatus =
      statusFilter === "All"
        ? true
        : statusFilter === "Active"
        ? user.status === "active"
        : user.status === "suspended";

    return matchesSearch && matchesRole && matchesStatus;
  });

  if (loading) return <p>Loading users...</p>;

  return (
    <div className="admin-users-page">
    
      <div className="users-header">
        <h2> Manage Users</h2>
        <p>View, filter, and manage all registered users.</p>
      </div>

      <div className="users-controls">
        <input
          type="text"
          placeholder="Search by name, email..."
          className="search-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="filter-select"
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          <option>All Users</option>
          <option>Student</option>
          <option>Instructor</option>
          <option>Admin</option>
        </select>

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

    
      <div className="users-table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Joined</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  No users found
                </td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <span
                      className={
                        user.status === "active" ? "active-status" : "suspended-status"
                      }
                    >
                      {user.status === "active" ? "Active" : "Enrolled"}
                    </span>
                  </td>
                  <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td className="actions">
                  
                    {user.status === "active" ? (
                      <button className="ban-btn">Suspend</button>
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

export default AdminUsers;
