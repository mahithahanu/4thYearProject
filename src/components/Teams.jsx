import { useState, useEffect } from "react";
import styles from "./Teams.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Teams() {
  const [selectedType, setSelectedType] = useState("hackathon");
  const [search, setSearch] = useState("");
  const [eventData, setEventData] = useState(null);
  const navigate = useNavigate();

  // ===== FETCH DATA FROM BACKEND =====
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/events/${selectedType}`
        );
        setEventData(res.data);
      } catch (error) {
        console.error("Error fetching event:", error);
      }
    };

    fetchEvent();
  }, [selectedType]);

  if (!eventData) return <div>Loading...</div>;

  const { title, progress, size, teams } = eventData;

  // ===== FILTER =====
  const filteredTeams = teams.filter(
    (team) =>
      team.name.toLowerCase().includes(search.toLowerCase()) ||
      team.status.toLowerCase().includes(search.toLowerCase())
  );

  // ===== SORT BY SYNERGY DESC =====
  const sortedTeams = [...filteredTeams].sort(
    (a, b) => b.synergy - a.synergy
  );

  return (
    <div className={styles.container}>
      {/* ===== HEADER BAR ===== */}
      <div className={styles.headerBar}>
        <h1 className={styles.hackathonTitle}>{title}</h1>

        <div className={styles.searchBox}>
          <input
            type="text"
            placeholder="Search teams..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <span className={styles.filterText}>Progress: {progress}</span>
        <span className={styles.filterText}>Size: {size}</span>

        <select
          className={styles.createDropdown}
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          <option value="hackathon">Hackathon</option>
          <option value="project">Project</option>
        </select>
      </div>

      {/* ===== TEAM CARDS ===== */}
      <div className={styles.grid}>
        {sortedTeams.map((team, i) => (
          <div key={i} className={styles.card}>
            <div className={styles.header}>
              <div>
                <h3>{team.name}</h3>
                <p>Status: {team.status}</p>
              </div>
            </div>

            {/* ===== SYNERGY CIRCLE ===== */}
            <div className={styles.circle}>
              <svg viewBox="0 0 36 36">
                <path
                  className={styles.bg}
                  d="M18 2.0845
                     a 15.9155 15.9155 0 0 1 0 31.831
                     a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className={styles.progress}
                  strokeDasharray={`${team.synergy}, 100`}
                  d="M18 2.0845
                     a 15.9155 15.9155 0 0 1 0 31.831
                     a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>

              <div className={styles.percent}>
                <h2>{team.synergy}%</h2>
                <span>SYNERGY</span>
              </div>
            </div>

            {/* ===== SKILL BARS ===== */}
            {["frontend", "backend", "design"].map((skill) => (
              <div key={skill} className={styles.bar}>
                <div className={styles.barLabel}>
                  <span>
                    {skill.charAt(0).toUpperCase() + skill.slice(1)}
                  </span>
                  <span>{team[skill]}%</span>
                </div>
                <div className={styles.track}>
                  <div
                    className={styles.fill}
                    style={{ width: `${team[skill]}%` }}
                  />
                </div>
              </div>
            ))}

            <div className={styles.actions}>
              <button
                className={styles.detailsBtn}
                onClick={() =>
                  navigate(`/teamanalysis/${selectedType}/${team.name}`)
                }
              >
                View Detailed Analysis
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}