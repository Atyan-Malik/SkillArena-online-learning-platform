import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/Auth.css";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      setError("Please fill all fields");
      return;
    }

    try {
  const res = await fetch("http://localhost:15000/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  const data = await res.json();

  if (!res.ok) {
    setError(data.message || "Login failed");
  } else {
    if (data.token) {
      localStorage.setItem("userInfo", JSON.stringify(data));
    }

    navigate("/dashboard");
  }
} catch (err) {
  setError("Server error");
}

  };

  return (
    <div className="auth-page">

      <div className="auth-container">
        <img className="login-img" src="./login.webp" alt="" />
        <h1>Login</h1>
        {error && <p className="error-msg">{error}</p>}
        <form onSubmit={handleSubmit}>
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
          <button className="login" type="submit">Login</button>
        </form>
        <p>
          Don't have an account? <NavLink to="/register">Register here</NavLink>
        </p>
      </div>
    </div>
  );
};

export default Login;
