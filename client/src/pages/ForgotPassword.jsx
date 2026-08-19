import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../styles/Auth.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!email) {
      setError("Please enter your email");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        "http://localhost:15000/api/users/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Something went wrong");
        return;
      }

      setMessage(data.message);
    } catch (err) {
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h1>Forgot Password?</h1>

        <p>
          Enter your email address and we'll send you a password
          reset link.
        </p>

        {error && <p className="error-msg">{error}</p>}

        {message && (
          <p style={{ color: "green" }}>
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button className="login" type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <p>
          Remember your password?{" "}
          <NavLink to="/login">Login here</NavLink>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;