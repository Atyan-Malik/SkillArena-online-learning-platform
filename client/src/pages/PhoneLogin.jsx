
import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import "../styles/Auth.css";

const PhoneLogin = () => {
  const navigate = useNavigate();

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");

  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSendOtp = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (!phone) {
      setError("Please enter your phone number");
      return;
    }

    // Example: +923001234567
    if (!phone.startsWith("+")) {
      setError(
        "Please enter your phone number with country code, e.g. +923001234567"
      );
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        "http://localhost:15000/api/users/send-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phone: phone.trim(),
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to send OTP");
        return;
      }

      setOtpSent(true);
      setMessage("OTP sent successfully to your phone.");
    } catch (error) {
      console.error("Send OTP error:", error);
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (!otp) {
      setError("Please enter the OTP");
      return;
    }

    if (otp.length !== 6) {
      setError("OTP must be 6 digits");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        "http://localhost:15000/api/users/verify-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phone: phone.trim(),
            otp: otp.trim(),
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Invalid OTP");
        return;
      }

      // Save authentication
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setMessage("Phone verified successfully!");

      // Redirect
      setTimeout(() => {
        if (data.user.role === "student") {
          navigate("/dashboard/student");
        } else if (data.user.role === "instructor") {
          navigate("/dashboard/instructor");
        } else {
          navigate("/dashboard");
        }
      }, 500);
    } catch (error) {
      console.error("Verify OTP error:", error);
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">

        <h1>Login with Phone</h1>

        {!otpSent ? (
          <>
            <p>
              Enter your phone number and we'll send you a verification
              code.
            </p>

            {error && (
              <p className="error-msg">
                {error}
              </p>
            )}

            {message && (
              <p style={{ color: "green" }}>
                {message}
              </p>
            )}

            <form onSubmit={handleSendOtp}>

              <input
                type="tel"
                placeholder="+923001234567"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                autoComplete="tel"
              />

              <button
                className="login"
                type="submit"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send OTP"}
              </button>

            </form>
          </>
        ) : (
          <>
            <p>
              Enter the 6-digit OTP sent to:
            </p>

            <strong>{phone}</strong>

            {error && (
              <p className="error-msg">
                {error}
              </p>
            )}

            {message && (
              <p style={{ color: "green" }}>
                {message}
              </p>
            )}

            <form onSubmit={handleVerifyOtp}>

              <input
                type="text"
                inputMode="numeric"
                maxLength="6"
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={(e) =>
                  setOtp(e.target.value.replace(/\D/g, ""))
                }
              />

              <button
                className="login"
                type="submit"
                disabled={loading}
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>

            </form>

            <button
              type="button"
              onClick={() => {
                setOtpSent(false);
                setOtp("");
                setError("");
                setMessage("");
              }}
              style={{
                marginTop: "10px",
                background: "none",
                border: "none",
                color: "#2563eb",
                cursor: "pointer",
              }}
            >
              Change phone number
            </button>
          </>
        )}

        <p style={{ marginTop: "20px" }}>
          <NavLink to="/login">
            Back to Login
          </NavLink>
        </p>

      </div>
    </div>
  );
};

export default PhoneLogin;
