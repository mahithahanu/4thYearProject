import React from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();

  return (
    <div className="login-wrapper">
      {/* Left side illustration */}
      <div className="login-left">
        <img
          src="https://illustrations.popsy.co/white/work-from-home.svg"
          alt="forgot illustration"
          className="login-image"
        />
      </div>

      {/* Right side form */}
      <div className="login-right">
        <h2>Forgot Password</h2>
        <p className="sub-text">
          Don't worry! Enter your email and we’ll send you a verification OTP.
        </p>

        <input type="email" placeholder="Enter your email" />

        <button
          className="login-btn-main"
          onClick={() => navigate("/otp")}
        >
          Send OTP
        </button>

        <p className="signup-text">
          Remember your password?{" "}
          <span onClick={() => navigate("/login")}>Login</span>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
