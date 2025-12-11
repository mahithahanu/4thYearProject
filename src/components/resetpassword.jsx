import React from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const navigate = useNavigate();

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
        <p className="sub-text">
          Create a new strong password for your account.
        </p>

        <input type="password" placeholder="New password" />
        <input type="password" placeholder="Confirm password" />

        <button
          className="login-btn-main"
          onClick={() => navigate("/")}
        >
          Update Password
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;
