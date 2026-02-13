import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";
import { useNavigate } from "react-router-dom";
import { FaUsers, FaChartBar, FaPen, FaBullhorn } from "react-icons/fa";

export default function Home() {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const userEmail = localStorage.getItem("userEmail");

  // 🔹 Check login status on load
  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, []);

  // 🔹 Logout
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    setShowDropdown(false);
    navigate("/");
  };

  return (
    <div className={styles.wrapper}>
      {/* NAVBAR */}

      {/* HERO */}
      <section className={styles.hero}>
        <h1>
          Manage Your <span>Team Effectively.</span>
        </h1>
        <p>Analyze team skills and track participant data with ease.</p>
        <button className={styles.cta}>Get Started</button>
      </section>

      {/* CARDS */}
      <section className={styles.cards}>
        <div className={styles.card} onClick={() => navigate("/teams")}>
          <FaUsers className={styles.icon} />
          <h3>Team Analysis</h3>
          <p>Review team members' skills analytics</p>
        </div>

        <div className={styles.card} onClick={() => navigate("/participantanalysis")}>
          <FaChartBar className={styles.icon}/>
          <h3>Participant Analysis</h3>
          <p>View and analyze participant data.</p>
        </div>

        <div className={styles.card} onClick={() => navigate("/editteam")}>
          <FaPen className={styles.icon} />
          <h3>Edit Team</h3>
          <p>Manage and edit team members</p>
        </div>

        <div className={styles.card} onClick={() => navigate("/posthackathon")}>
          <FaBullhorn className={styles.icon} />
          <h3>Post Hackathon</h3>
          <p>Create and publish new hackathons</p>
        </div>
      </section>
    </div>
  );
}
