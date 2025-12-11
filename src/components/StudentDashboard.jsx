import React, { useState } from "react";
import styles from "./StudentDashboard.module.css";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className={styles.home}>
      {/* NAVBAR */}
      <nav className={styles.navbar}>
        <div className={styles.logo}>SkillSync</div>

        <ul className={`${styles.navLinks} ${menuOpen ? styles.active : ""}`}>
          <li>SkillSync Chat</li>
          <li>Workplace</li>
          <li>Project Info</li>
          <li>Team Info</li>
          <li>Mentorship</li>
          <li>Skill Progress</li>
        </ul>
      
        <div className={styles.navBtns}>
          <button className={styles.loginBtn} onClick={() => navigate("/auth")}>Login</button>
          <div className={styles.hamburger} onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>

      {/* MAIN SECTION */}
      <div className={styles.mainSection}>
        {/* LEFT CONTENT */}
        <div className={styles.left}>
          <h1>
            Grow Smarter, <span> Together.</span>
          </h1>
          <p>
            Join the right team, collaborate on projects, and develop real-world
            skills through SkillSync.
          </p>
          <button className={styles.cta}>Get Started</button>
        </div>

        {/* RIGHT CARDS */}
        <div className={`${styles.right} ${menuOpen ? styles.showMenu : ""}`}>
          <div className={`${styles.card} ${styles.teal}`}>
            <h3>SkillSync Chat</h3>
            <p>Real-time team communication</p>
          </div>

          <div className={`${styles.card} ${styles.white}`}>
            <h3>Workplace</h3>
            <p>Organize and manage your work</p>
          </div>

          <div className={`${styles.card} ${styles.white}`}>
            <h3>Project Info</h3>
            <p>Track project progress</p>
          </div>

          <div className={`${styles.card} ${styles.teal}`}>
            <h3>Team Info</h3>
            <p>View members and roles</p>
          </div>

          <div className={`${styles.card} ${styles.light}`}>
            <h3>Mentorship</h3>
            <p>Connect with guides & experts</p>
          </div>

          <div className={`${styles.card} ${styles.white}`}>
            <h3>Skill Progress</h3>
            <p>Track your growth</p>
          </div>
        </div>
      </div>
    </div>
  );
}