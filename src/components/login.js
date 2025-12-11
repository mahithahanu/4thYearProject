import React from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
  return (
    <div className="login-wrapper">
      {/* Left side illustration */}
      <div className="login-left">
        <img
          src="https://illustrations.popsy.co/white/work-from-home.svg"
          alt="login illustration"
          className="login-image"
        />
      </div>

      {/* Right side form */}
      <div className="login-right">
        <h2>Log in</h2>
        <p className="sub-text">
          Hello friend! I'm SmartTime — task manager you can trust everything.
          Let's get in touch!
        </p>

        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <p 
  className="forgot-password" 
  onClick={() => navigate("/forgot-password")}
>
  Forgot password?
</p>



        <button className="login-btn-main">Let's start!</button>

        <div className="social-login">
          <span>f</span>
          <span>G</span>
        </div>

        <p className="signup-text">
          Don’t have an account? <span onClick={() => navigate("/signup")}>Sign up</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
