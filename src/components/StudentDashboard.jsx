import React from "react";
import styles from "./StudentDashboard.module.css";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export default function StudentDashboard() {
  const navigate = useNavigate();

  // Check if user is logged in
  const isLoggedIn = !!localStorage.getItem("token");

  // Helper function for protected navigation
  const handleNavigation = (path) => {
    if (!isLoggedIn) {
      toast.error("Please log in to access this feature");
      return;
    }
    navigate(path);
  };

  return (
    <div className={styles.home}>
      {/* Toast container */}
      <Toaster position="top-right" />

      <div className={styles.mainSection}>
        <div className={styles.left}>
          <h1>
            Grow Smarter, <span>Together.</span>
          </h1>
          <p>
            Join the right team, collaborate on projects, and develop real-world
            skills through SkillSync.
          </p>

          {!isLoggedIn ? (
            <button
              className={styles.cta}
              onClick={() => navigate("/login")}
            >
              Get Started
            </button>
          ) : (
            <button className={styles.cta} disabled>
              Welcome Back!
            </button>
          )}
        </div>

        <div className={styles.right}>
          {/* Cards */}
          <div
            className={`${styles.card} ${styles.teal}`}
            onClick={() => handleNavigation("/chat")}
          >
            <h3>SkillSync Chat</h3>
            <p>Real-time team communication</p>
          </div>

          <div
            className={`${styles.card} ${styles.white}`}
            onClick={() => handleNavigation("/workplace")}
          >
            <h3>Workplace</h3>
            <p>Organize and manage your work</p>
          </div>

          <div
            className={`${styles.card} ${styles.white}`}
            onClick={() => handleNavigation("/projects")}
          >
            <h3>Project Info</h3>
            <p>Track project progress</p>
          </div>

          <div
            className={`${styles.card} ${styles.teal}`}
            onClick={() => handleNavigation("/TeamInfo")}
          >
            <h3>Team Info</h3>
            <p>View members and roles</p>
          </div>

          <div
            className={`${styles.card} ${styles.light}`}
            onClick={() => handleNavigation("/allhackathons")}
          >
            <h3>Hackathons</h3>
            <p>All Hackathons</p>
          </div>

          <div className={`${styles.card} ${styles.white}`}
          onClick={() => handleNavigation("/result")}>
            <h3>Result</h3>
            <p>Know your performance</p>
          </div>
        </div>
      </div>
    </div>
  );
}
