import { useState } from "react";
import styles from "./WorkPlace.module.css";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const tasksData = [
    {
      title: "Build a Responsive Landing Page",
      date: "Apr. 9, 2024",
      difficulty: "Intermediate",
      tags: ["HTML", "CSS"],
      status: "In Progress",
    },
    {
      title: "Javascript Fundamentals Quiz",
      date: "Apr. 8, 2024",
      difficulty: "Beginner",
      status: "Review Pending",
    },
    {
      title: "API Integration Project",
      date: "Apr. 7, 2024",
      difficulty: "Advanced",
      status: "Submitted",
    },
    { title: "Basics of Git & GitHub", status: "Completed" },
    { title: "Introduction to SEO", status: "Completed" },
    { title: "Tailwind Basics", status: "Completed" },
    { title: "CSS Grid Layout", status: "Completed" },
  ];

  const ongoingTasks = tasksData.filter((task) => task.status !== "Completed");
  const previousTasks = tasksData.filter((task) => task.status === "Completed");
  const [showAll, setShowAll] = useState(false);
  const [activeTab, setActiveTab] = useState("All");
  const navigate=useNavigate();

  return (
    <div className={styles.wrapper}>
      {/* ===== WELCOME ===== */}
      <div className={styles.welcome}>
        <h2>Welcome back, Jessica!</h2>
        <p>
          Profile Completion: <span>85%</span> · Current Track:{" "}
          <span>Web Development</span>
        </p>

        <div className={styles.stats}>
          <StatCard
            title="Tasks Assigned"
            subtitle="Assigned to you"
            count="12"
            icon="📋"
          />
          <StatCard
            title="Completed Tasks"
            subtitle="Tasks completed"
            count="8"
            icon="✔"
          />
          <StatCard
            title="Total Activities"
            subtitle="Overall tasks"
            count="20"
            icon="📊"
          />
          <StatCard
            title="Active Streaks"
            subtitle="Daily consistency"
            count="12"
            icon="🔥"
          />
        </div>
      </div>


<div className={styles.tasksSection}>
  <div className={styles.tasksHeader}>
    <div>
      <h3>Your Tasks</h3>
      <p className={styles.subtitle}>
        Manage and track your hackathon progress
      </p>
    </div>

    {/* FILTER BUTTONS */}
    <div className={styles.filterTabs}>
      {["All", "Ongoing", "Completed", "Overdue"].map((tab) => (
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

  {/* ===== CONDITIONAL RENDERING ===== */}

  {/* ALL */}
  {activeTab === "All" && (
    <>
      <p className={styles.sectionLabel}>Ongoing</p>
      {(showAll ? ongoingTasks : ongoingTasks.slice(0, 3)).map(
        (task, index) => (
          <Task key={index} {...task} onClick={()=>{navigate("/workplacetaskdetails")}}/>
        )
      )}

      <p className={styles.sectionLabel}>Previous Tasks</p>
      {(showAll ? previousTasks : previousTasks.slice(0, 2)).map(
        (task, index) => (
          <Task key={index} {...task} />
        )
      )}
    </>
  )}

  {/* ONGOING */}
  {activeTab === "Ongoing" &&
    (showAll ? ongoingTasks : ongoingTasks.slice(0, 5)).map(
      (task, index) => <Task key={index} {...task} />
    )}

  {/* COMPLETED */}
  {activeTab === "Completed" &&
    (showAll ? previousTasks : previousTasks.slice(0, 5)).map(
      (task, index) => <Task key={index} {...task} />
    )}

  {/* OVERDUE (based on date comparison) */}
  {activeTab === "Overdue" &&
    tasksData
      .filter(
        (task) =>
          task.date &&
          new Date(task.date) < new Date() &&
          task.status !== "Completed"
      )
      .map((task, index) => <Task key={index} {...task} />)}

  {/* SHOW ALL BUTTON */}
  <button
    className={styles.showAllButton}
    onClick={() => setShowAll((prev) => !prev)}
  >
    {showAll ? "Hide all tasks" : "Show all tasks"}
    <span
      className={styles.chevronDown}
      style={{ transform: showAll ? "rotate(-90deg)" : "rotate(90deg)" }}
    >
      ›
    </span>
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

/* ===== TASK COMPONENT (NO DROPDOWN) ===== */
function Task({ title, date, difficulty, tags, status,onClick }) {
  return (
    <div className={styles.taskCard}
     onClick={onClick}
      style={{ cursor: onClick ? "pointer" : "default" }}>
      <div>
        <p className={styles.taskTitle}>{title}</p>

        {date && (
          <p className={styles.taskMeta}>
            Due: {date} · Difficulty: {difficulty}
          </p>
        )}

        {tags && (
          <div className={styles.tags}>
            {tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        )}
      </div>

      {/* Status Badge */}
      <StatusBadge status={status} />
    </div>
  );
}

/* ===== STATUS BADGE ===== */
function StatusBadge({ status }) {
  const statusColors = {
    "In Progress": styles.inProgress,
    "Review Pending": styles.reviewPending,
    Submitted: styles.submitted,
    Completed: styles.completed,
  };

  return (
    <span className={`${styles.statusBadge} ${statusColors[status]}`}>
      {status}
    </span>
  );
}
