import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/Auth.css";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import { Eye, EyeOff, Phone } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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
      console.log(data);
      if (!res.ok) {
        setError(data.message || "Login failed");
      } else {
        if (data.token) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
        }

         if (data.user.role === "student") {
          navigate("/dashboard/student");
        } else if (data.user.role === "instructor") {
          navigate("/dashboard/instructor");
        } else {
          navigate("/dashboard");
        }
      }
    } catch (err) {
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
      <div className="auth-container">
        {/* <img className="login-img" src="./login.webp" alt="" /> */}
        <h1>Sign In</h1>
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
          <br />
          <NavLink
            to="/phone-login"
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <button className="google-btn">
              <Phone size={19} color="red" />
              Login with Phone Number
            </button>
          </NavLink>
        </div>

        <br />
        <p>------------Or Login with----------</p>
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
          <NavLink to="/forgot-password" className="forgot-password">
            Forgot Password?
          </NavLink>
          <button className="login" type="submit">
            Login Now
          </button>
        </form>
        <p>
          Don't have an account? <NavLink to="/register">Register here</NavLink>
        </p>
      </div>
    </div>
  );
};

export default Login;
