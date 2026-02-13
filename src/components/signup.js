import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./login.css";

const Signup = () => {
  const navigate = useNavigate();
  const { role } = useParams();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = async () => {
    if (!fullName || !email || !password || !confirmPassword) {
      alert("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/signup", {
        name: fullName,
        email,
        password,
        role,
      });

      const { token, user } = response.data;

      alert("Signup successful! Logging you in...");

      localStorage.setItem("role", user.role);
      localStorage.setItem("token", token);
      localStorage.setItem("userEmail", user.email);
      localStorage.setItem("isLoggedIn", "true");

      // ✅ Updated Navigation Logic
      if (user.role === "organizer") {
        navigate("/organizer/dashboard");
      } else if (user.role === "participant") {
        navigate("/assessment");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-left">
        <img
          src="https://illustrations.popsy.co/white/work-from-home.svg"
          alt="signup"
          className="login-image"
        />
      </div>

      <div className="login-right">
        <h1>
          Create {role === "organizer" ? "Organizer" : "Participant"} Account
        </h1>

        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />

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

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button className="login-btn-main" onClick={handleSignup}>
          Sign Up
        </button>

        <p className="signup-text">
          Already have an account?{" "}
          <span onClick={() => navigate("/auth")}>Log in</span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
