import React from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

const Signup = () => {
  const navigate = useNavigate();
  return (
    <div className="login-wrapper">
      {/* LEFT IMAGE SIDE */}
      <div className="login-left">
        <img
          src="https://illustrations.popsy.co/white/work-from-home.svg"
          alt="signup"
          className="login-image"
        />
      </div>

      {/* RIGHT FORM SIDE */}
      <div className="login-right">
        <h1>Create Account</h1>
        <p className="sub-text">
          Join us and start your journey. Create your account in just a few
          steps.
        </p>

        <input type="text" placeholder="Full Name" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <input type="password" placeholder="Confirm Password" />

        <button className="login-btn-main">Sign Up</button>

        <div className="social-login">
          <span>f</span>
          <span>G</span>
        </div>

        <p className="signup-text">
          Already have an account? <span onClick={() => navigate("/login")}>Log in</span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
