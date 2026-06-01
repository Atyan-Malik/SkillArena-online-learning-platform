import React, { useEffect, useState } from "react";
import "./Allinstructor.css";

const InstructorList = () => {
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

const handleDelete = async (id) => {
  try {
    const res = await fetch(`http://localhost:15000/api/users/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();
    console.log(data);

    // update UI after delete
    setInstructors((prev) => prev.filter((user) => user._id !== id));

  } catch (err) {
    console.error(err);
  }
};
  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const res = await fetch("http://localhost:15000/api/allusers"); 
        const data = await res.json();

        const instructorsOnly = data.users.filter((user) => user.role === "instructor");
        setInstructors(instructorsOnly);
      } catch (error) {
        console.error("Fetch error:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInstructors();
  }, []);


  const filteredInstructors = instructors.filter((inst) =>
    inst.name.toLowerCase().includes(search.toLowerCase()) ||
    inst.email.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <p>Loading instructors...</p>;

  return (
    <div className="instructor-list-page">
      <div className="instructors-header">
        <h2> All Instructors</h2>
        <p>View and manage all instructors registered in the system.</p>
      </div>

      <div className="instructors-controls">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="instructors-table-container">
        <table className="instructors-table">
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
            {filteredInstructors.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  No instructors found
                </td>
              </tr>
            ) : (
              filteredInstructors.map((inst) => (
                <tr key={inst._id}>
                  <td>{inst.name}</td>
                  <td>{inst.email}</td>
                  <td>
                    <span
                      className={
                        inst.status === "active"
                          ? "active-status"
                          : "suspended-status"
                      }
                    >
                      {inst.status === "active" ? "Active" : "Suspended"}
                    </span>
                  </td>
                  <td>{new Date(inst.createdAt).toLocaleDateString()}</td>
                  <td className="actions">
                    <button onClick={() => handleDelete(inst._id)} className="edit-btn">remove</button>
                    {inst.status === "active" ? (
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

export default InstructorList;
