import React from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

const AuthChoice = () => {
  const navigate = useNavigate();

  const handleLogin = (role) => {
    localStorage.setItem("role", role); // ✅ SAVE ROLE
    navigate("/login");
  };

  return (
    <div className="auth-container">
      <div className="auth-box">

        {/* ORGANIZERS */}
        <div className="auth-card">
          <span className="badge">ORGANISERS</span>
          <h1>For <i>Organisers</i></h1>

          <button
            className="login-btn"
            onClick={() => handleLogin("organizer")}
          >
            Login
          </button>

          <p className="bottom-text">
            Don’t have an account?{" "}
            <span
              className="link"
              onClick={() => navigate("/signup/organizer")}
            >
              Sign up
            </span>
          </p>
        </div>

        <div className="divider"></div>

        {/* PARTICIPANTS */}
        <div className="auth-card">
          <h1>For Participants</h1>

          <button
            className="login-btn"
            onClick={() => handleLogin("participant")}
          >
            Get Started
          </button>

          <p className="bottom-text">
            Don’t have an account?{" "}
            <span
              className="link"
              onClick={() => navigate("/signup/participant")}
            >
              Click Here
            </span>
          </p>
        </div>

      </div>
    </div>
  );
};

export default AuthChoice;
