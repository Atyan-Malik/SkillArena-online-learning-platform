import React, { useState ,useEffect} from "react";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import "../styles/Auth.css";

const Register = () => {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role:"student",
  });
  const [error, setError] = useState("");


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  
const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  if (!formData.name || !formData.email || !formData.password) {
    setError("Please fill all fields");
    return;
  }

  try {
    const res = await fetch("http://localhost:15000/api/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    

 
 
    
    const data = await res.json();
    console.log("REGISTER RESPONSE:", data);

    if (!res.ok) {
      setError(data.message || "Registration failed");
      return;
    }

   
    localStorage.setItem(
      "user",
      JSON.stringify({
        _id: data._id,
        name: data.name,
        email: data.email,
        role: data.role,
        token: data.token,
      })
    );

    
    if (data.role === "student") navigate("/dashboard");
    if (data.role === "instructor") navigate("/dashboard/instructor");
    if (data.role === "admin") navigate("/dashboard/admin");

  } catch (err) {
    console.error(err);
    setError("Server error");
  }
};

  return (
    <div className="auth-page">
      <img className="register-img" src="./register2.jpg" alt="" />
      <div className="auth-container">
        <h1>Register</h1>
        {error && <p className="error-msg">{error}</p>}
        <form autoComplete="off" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
          />
          <input
           autoComplete="new-password"
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            autoComplete="new-password"
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="student">Student</option>
            <option value="instructor">Instructor</option>
            <option value="admin">admin</option>
          </select>
          <button type="submit">Register</button>
        </form>
        <p>
          Already have an account? <NavLink to="/login">Login here</NavLink>
        </p>
      </div>
    </div>
  );
};

export default Register;
