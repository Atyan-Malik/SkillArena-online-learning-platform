import React, { useState } from "react";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import "../styles/Auth.css";
import { FcGoogle } from "react-icons/fc";
import ReCAPTCHA from "react-google-recaptcha";
import { useGoogleLogin } from "@react-oauth/google";
import { Eye, EyeOff } from "lucide-react";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });
  const [error, setError] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [captchaToken, setCaptchaToken] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

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
    if (!agreed) {
      setError("Please agree to the Terms of Service and Privacy Policy");
      return;
    }

    if (!captchaToken) {
      setError("Please verify that you are not a robot");
      return;
    }
    try {
      const res = await fetch("http://localhost:15000/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData, captchaToken),
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
        }),
      );

      if (data.role === "student") navigate("/dashboard/student");
      if (data.role === "instructor") navigate("/dashboard/instructor");
      if (data.role === "admin") navigate("/dashboard/admin");
    } catch (err) {
      console.error(err);
      setError("Server error");
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        setError("");

        const res = await fetch("http://localhost:15000/api/users/google", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            accessToken: tokenResponse.access_token,
            role: "student",
          }),
        });

        const data = await res.json();

        console.log("GOOGLE REGISTER RESPONSE:", data);

        if (!res.ok) {
          setError(data.message || "Google registration failed");
          return;
        }

        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        if (data.user.role === "student") {
          navigate("/dashboard/student");
        } else if (data.user.role === "instructor") {
          navigate("/dashboard/instructor");
        } else {
          navigate("/dashboard");
        }
      } catch (err) {
        console.error("Google registration error:", err);
        setError("Google registration failed");
      }
    },

    onError: () => {
      setError("Google registration failed");
    },
  });

  return (
    <div className="auth-page">
      {/* <img className="register-img" src="./register2.jpg" alt="" /> */}
      <div className="auth-container">
        <h1>Create Account</h1> <br />
        <div className="google-btn">
          <button
            type="button"
            className="google-btn"
            onClick={() => googleLogin()}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
            }}
          >
            <FcGoogle size={21} />
            Continue with Google
          </button>
        </div>
        <br />
        <p>------------Or Register with----------</p>
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
          <div style={{ position: "relative" }}>
            <input
              autoComplete="new-password"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              style={{
                width: "91%",
                // paddingRight: "45px",
              }}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                border: "none",
                background: "transparent",
                cursor: "pointer",
                padding: "0",
                color: "#666",
                display: "flex",
                alignItems: "center",
              }}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="student">Student</option>
            <option value="instructor">Instructor</option>
          </select>

          <ReCAPTCHA
            sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
            onChange={(token) => setCaptchaToken(token)}
          />

          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "8px",
              margin: "10px 0 15px",
              fontSize: "15px",
              color: "#555",
            }}
          >
            <input
            
              type="checkbox"
              id="terms"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              style={{
                marginTop: "3px",
                cursor: "pointer",
                fontSize: "18px"
              }}
            />

            <label htmlFor="terms" style={{ cursor: "pointer" }}>
              I agree to the{" "}
              <NavLink
                to="/terms"
                style={{
                  color: "#147aff",
                  textDecoration: "none",
                  fontWeight: "500",
                }}
              >
                Terms of Service
              </NavLink>{" "}
              and{" "}
              <NavLink
                to="/privacy"
                style={{
                  color: "#147aff",
                  textDecoration: "none",
                  fontWeight: "500",
                }}
              >
                Privacy Policy
              </NavLink>
              .
            </label>
          </div>
          <button type="submit">Register Now</button>
        </form>
        <p>
          Already have an account? <NavLink to="/login">Login here</NavLink>
        </p>
      </div>
    </div>
  );
};

export default Register;
