import { useState, useEffect } from "react";
import styles from "./WorkPlace.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Dashboard() {

  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("All");

  useEffect(() => {

    const fetchDashboard = async () => {

      try {

        const email = localStorage.getItem("userEmail");

        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/workplace/dashboard?email=${email}`
        );

        console.log("API RESPONSE:", res.data);

        setData(res.data);

      } catch (err) {
        console.error("Dashboard error:", err);
      }

      setLoading(false);
    };

    fetchDashboard();

  }, []);

  if (loading) return <h2>Loading workplace...</h2>;
  if (!data) return <h2>No data found</h2>;

  /* ===== PROJECT DATA ===== */

  const projects = data.projects || [];
  const project = projects[0] || null;
  const hackathon = data.hackathon || null;

  /* ===== TASK STATS ===== */

  const tasksAssigned = data.projectsCount || 0;

  const completedTasks = projects.filter(
    (p) => p.status === "completed"
  ).length;

  const ongoingTasks = tasksAssigned - completedTasks;

  const activeTasks = projects.filter(
    (p) => p.status !== "completed"
  ).length;

  return (
    <div className={styles.wrapper}>

      {/* ===== WELCOME SECTION ===== */}

      <div className={styles.welcome}>

        <h2>Welcome back!</h2>

        {hackathon && (
          <p>
            Hackathon: <span>{hackathon.name}</span> · Theme:{" "}
            <span>{hackathon.theme}</span>
          </p>
        )}

        <div className={styles.stats}>

          <StatCard
            title="Tasks Assigned"
            subtitle="Total tasks"
            count={tasksAssigned}
            icon="📋"
          />

          <StatCard
            title="Completed Tasks"
            subtitle="Finished"
            count={completedTasks}
            icon="✅"
          />

          <StatCard
            title="Ongoing Tasks"
            subtitle="In progress"
            count={ongoingTasks}
            icon="🚀"
          />

          <StatCard
            title="Active Tasks"
            subtitle="Currently active"
            count={activeTasks}
            icon="🔥"
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

        {project ? (
          <Task
            title={project.projectName}
            date={project.submissionDeadline}
            difficulty={project.techStack?.join(", ")}
            status={project.status}
            onClick={() => navigate("/workplacetaskdetails")}
          />
        ) : (
          <p>No project assigned yet.</p>
        )}

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
          Deadline: {date ? new Date(date).toLocaleDateString() : "N/A"}
        </p>

        <p className={styles.taskMeta}>
          Tech: {difficulty || "Not specified"}
        </p>

      </div>

      <span className={styles.statusBadge}>{status}</span>

    </div>
  );
}