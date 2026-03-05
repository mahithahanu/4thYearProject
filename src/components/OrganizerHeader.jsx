import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./OrganizerHeader.module.css";

export default function OrganizerHeader() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const userEmail = localStorage.getItem("userEmail");

  // Check login status on mount
  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
  }, []);

  const handleLogout = () => {
    // Clear all session info
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("token");      // JWT token
    localStorage.removeItem("userEmail");
    localStorage.removeItem("role");       // Role info if stored
    setIsLoggedIn(false);
    setShowDropdown(false);

    // Redirect to home or login
    navigate("/");
    alert("You have been logged out successfully.");
  };

  const handleNavigation = (path) => {
    if (!isLoggedIn) {
      alert("You must be logged in to access this page.");
      return;
    }
    navigate(path);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo} onClick={() => navigate("/")}>
        SkillSync
      </div>

      <ul className={`${styles.navLinks} ${menuOpen ? styles.active : ""}`}>
        <li onClick={() => handleNavigation("/organizer/dashboard")}>Home</li>
        <li onClick={() => handleNavigation("/teamanalysis")}>Team Analysis</li>
        <li onClick={() => handleNavigation("/participant")}>Participant Analysis</li>
        <li onClick={() => handleNavigation("/edit team")}>Edit Team</li>
        <li onClick={() => handleNavigation("/Post Hackathon")}>Post Hackathon</li>
        <li onClick={() => handleNavigation("/Post projects")}>Projects</li>
      </ul>

      <div className={styles.navBtns}>
        {!isLoggedIn ? (
          <button
            className={styles.loginBtn}
            onClick={() => navigate("/auth")}
          >
            Login
          </button>
        ) : (
          <div className={styles.profileWrapper}>
            <div
              className={styles.profileIcon}
              onClick={() => setShowDropdown(!showDropdown)}
            >
              {userEmail?.charAt(0).toUpperCase()}
            </div>

            {showDropdown && (
              <div className={styles.profileDropdown}>
                <p onClick={() => navigate(`/profile/${userEmail}`)}>Profile</p>
                <p onClick={handleLogout}>Logout</p>
              </div>
            )}
          </div>
        )}

        <div
          className={styles.hamburger}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
}
