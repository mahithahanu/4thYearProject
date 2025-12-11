import React from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

const AuthChoice = () => {
  const navigate = useNavigate();   // 👈 added

  return (
    <div className="auth-container">
      <div className="auth-box">

        {/* LEFT SIDE - ORGANISERS */}
        <div className="auth-card">
          <span className="badge">ORGANISERS</span>
          <h1>For <i>Organisers</i></h1>
          <p>
            Thousands of organisations use modern platforms to manage events,
            handle participants, track performance, and streamline operations.
          </p>

          {/* LOGIN BUTTON */}
          <button 
            className="login-btn"
            onClick={() => navigate("/login")}
          >
            Login
          </button>

          <p className="bottom-text">
            Don’t have an account?{" "}
            <span className="link" onClick={() => navigate("/signup")}>Sign up</span>
          </p>
        </div>

        {/* CENTER DIVIDER */}
        <div className="divider"></div>

        {/* RIGHT SIDE - PARTICIPANTS */}
        <div className="auth-card">
            <p><p></p></p><p><p><p></p></p></p><p></p>
          <h1>For Participants</h1>
          <p>
            Join competitions, practice skills, prepare for challenges,
            collaborate with teams, and boost your professional growth.
          </p>

          {/* LOGIN BUTTON */}
          <button 
            className="login-btn"
            onClick={() => navigate("/login")}
          >
            Get Started
          </button>

          <p className="bottom-text">
            Don’t have an account? <span className="link" onClick={() => navigate("/signup")}>Click Here</span>
          </p>
        </div>

      </div>
    </div>
  );
};

export default AuthChoice;
