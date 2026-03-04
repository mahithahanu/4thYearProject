import { useState, useEffect } from "react";
import styles from "./WorkPlace.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Dashboard() {
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("All");
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchDashboard = async () => {
  try {
    const email = localStorage.getItem("userEmail");
    console.log("Fetching dashboard for email:", email);
    const res = await axios.get(
      `http://localhost:8003/api/workplace/dashboard?email=${email}`
    );

    console.log(res.data);
  } catch (err) {
    console.error(err);
  }
};

    fetchDashboard();
  }, []);

  if (loading) return <h2>Loading workplace...</h2>;
  if (!data) return null;

  const project = data.project;

  const tasksData = project
    ? [
        {
          title: project.title,
          date: data.hackathon.end,
          difficulty: data.hackathon.theme,
          status: "In Progress",
        },
      ]
    : [];

  const ongoingTasks = tasksData;
  const previousTasks = [];

  return (
    <div className={styles.wrapper}>
      {/* ===== WELCOME ===== */}
      <div className={styles.welcome}>
        <h2>Welcome back!</h2>

        <p>
          Hackathon: <span>{data.hackathon.name}</span> · Theme:{" "}
          <span>{data.hackathon.theme}</span>
        </p>

        <div className={styles.stats}>
          <StatCard
            title="Team Members"
            subtitle="In your team"
            count={data.stats.teamMembers}
            icon="👥"
          />
          <StatCard
            title="Max Team Size"
            subtitle="Allowed"
            count={data.stats.maxTeamSize}
            icon="📏"
          />
          <StatCard
            title="Project"
            subtitle="Assigned"
            count={data.stats.hasProject ? "1" : "0"}
            icon="🚀"
          />
          <StatCard
            title="Days Left"
            subtitle="Until deadline"
            count={data.stats.hackathonDaysLeft}
            icon="⏳"
          />
        </div>
      </div>

      {/* ===== PROJECT SECTION ===== */}
      <div className={styles.tasksSection}>
        <div className={styles.tasksHeader}>
          <div>
            <h3>Your Project</h3>
            <p className={styles.subtitle}>
              Manage your hackathon progress
            </p>
          </div>

          <div className={styles.filterTabs}>
            {["All", "Ongoing"].map((tab) => (
              <button
                key={tab}
                className={`${styles.tab} ${
                  activeTab === tab ? styles.activeTab : ""
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {project && (
          <Task
            title={project.title}
            date={data.hackathon.end}
            difficulty={data.hackathon.theme}
            status="In Progress"
            onClick={() => navigate("/workplacetaskdetails")}
          />
        )}

        <button
          className={styles.showAllButton}
          onClick={() => setShowAll((prev) => !prev)}
        >
          {showAll ? "Hide" : "Show"}
        </button>
      </div>
    </div>
  );
}

/* ===== STAT CARD ===== */
function StatCard({ title, subtitle, count, icon }) {
  return (
    <div className={styles.statCard}>
      <div>
        <p>{title}</p>
        <small>{subtitle}</small>
      </div>
      <div className={styles.numbers}>
        <h4>{count}</h4>
        <div className={styles.cardIcon}>{icon}</div>
      </div>
    </div>
  );
}

/* ===== PROJECT CARD ===== */
function Task({ title, date, difficulty, status, onClick }) {
  return (
    <div
      className={styles.taskCard}
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <div>
        <p className={styles.taskTitle}>{title}</p>

        <p className={styles.taskMeta}>
          Deadline: {new Date(date).toLocaleDateString()} · Theme:{" "}
          {difficulty}
        </p>
      </div>

      <span className={styles.statusBadge}>{status}</span>
    </div>
  );
}