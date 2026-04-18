import React, { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSendOtp = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/forgot-password`, { email });

      localStorage.setItem("resetEmail", email);
      navigate("/otp");
    } catch (err) {
      alert(err.response?.data?.message || "Error sending OTP");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-left">
        <img
          src="https://illustrations.popsy.co/white/work-from-home.svg"
          alt="forgot illustration"
          className="login-image"
        />
      </div>

      <div className="login-right">
        <h2>Forgot Password</h2>
        <p className="sub-text">
          Enter your email to receive an OTP.
        </p>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button className="login-btn-main" onClick={handleSendOtp}>
          Send OTP
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;
