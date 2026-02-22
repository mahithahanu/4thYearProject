import React, { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const role = localStorage.getItem("role"); // Role selected previously

  if (!role) {
    alert("Please select role first");
    navigate("/auth");
    return null;
  }

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        alert("Please fill all fields");
        return;
      }

      const response = await axios.post("http://localhost:8003/api/login", {
        email,
        password,
        role,
      });

      const { token, user } = response.data;

      // ✅ Store session info including JWT
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("token", token); // <-- JWT token stored
      localStorage.setItem("userEmail", user.email);
      localStorage.setItem("role", user.role);
      // Store full user object for chat/socket functionality
      localStorage.setItem("user", JSON.stringify(user));

      alert("Login successful!");

      // ✅ Role-based navigation
      if (user.role === "organizer") {
        navigate("/organizer/dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-left">
        <img
          src="https://illustrations.popsy.co/white/work-from-home.svg"
          alt="login illustration"
          className="login-image"
        />
      </div>

      <div className="login-right">
        <h2>Log in</h2>
        <p className="sub-text">
          Hello friend! I'm SmartTime — task manager you can trust everything.
          Let's get in touch!
        </p>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <p
          className="forgot-password"
          onClick={() => navigate("/forgot-password")}
        >
          Forgot password?
        </p>

        <button className="login-btn-main" onClick={handleLogin}>
          Let's start!
        </button>

        <div className="social-login">
          <span>f</span>
          <span>G</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
