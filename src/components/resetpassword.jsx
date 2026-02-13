import React, { useState } from "react";
import "./login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");

  const handleResetPassword = async () => {
    const email = localStorage.getItem("resetEmail");
    const otp = localStorage.getItem("resetOtp");

    if (!newPassword) {
      alert("Enter new password");
      return;
    }

    try {
      await axios.post("http://localhost:5000/reset-password", {
        email,
        otp,
        newPassword,
      });

      alert("Password reset successful");
      localStorage.removeItem("resetEmail");
      localStorage.removeItem("resetOtp");
      navigate("/login");

    } catch (err) {
      alert(err.response?.data?.message || "Reset failed");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-left">
        <img
          src="https://illustrations.popsy.co/white/work-from-home.svg"
          alt="reset illustration"
          className="login-image"
        />
      </div>

      <div className="login-right">
        <h2>Reset Password</h2>

        <input
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <button className="login-btn-main" onClick={handleResetPassword}>
          Reset Password
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;
