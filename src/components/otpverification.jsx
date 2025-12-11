import React from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";

const OtpVerification = () => {
  const navigate = useNavigate();

  return (
    <div className="login-wrapper">
      {/* Left side illustration */}
      <div className="login-left">
        <img
          src="https://illustrations.popsy.co/white/work-from-home.svg"
          alt="otp illustration"
          className="login-image"
        />
      </div>

      {/* Right side form */}
      <div className="login-right">
        <h2>OTP Verification</h2>
        <p className="sub-text">
          We’ve sent a 6-digit OTP to your email. Please enter it below.
        </p>

        <input type="text" placeholder="Enter OTP" maxLength="6" />

        <button
          className="login-btn-main"
          onClick={() => navigate("/reset-password")}
        >
          Verify OTP
        </button>

        <p className="signup-text">
          Didn’t receive code? <span>Resend OTP</span>
        </p>
      </div>
    </div>
  );
};

export default OtpVerification;
