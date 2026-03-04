// import { useState } from "react";
// import styles from "./Teams.module.css";
// import { useNavigate } from "react-router-dom";
// /* ===== ALL DATA GROUPED ===== */
// const DATA = {
//   hackathon: {
//     title: "Global Innovation Sprint",
//     progress: "Ongoing",
//     teams: [
//       {
//         name: "Project Phoenix",
//         status: "High Performance",
//         synergy: 85,
//         frontend: 90,
//         backend: 80,
//         design: 95,
//       },
//       {
//         name: "Alpha Squad",
//         status: "Forming",
//         synergy: 72,
//         frontend: 70,
//         backend: 75,
//         design: 60,
//       },
//       {
//         name: "Delta Force",
//         status: "Critical Project",
//         synergy: 94,
//         frontend: 95,
//         backend: 92,
//         design: 88,
//       },
//       {
//         name: "UI Ninjas",
//         status: "High Performance",
//         synergy: 86,
//         frontend: 96,
//         backend: 70,
//         design: 93,
//       },
//       {
//         name: "Design Dragons",
//         status: "Forming",
//         synergy: 74,
//         frontend: 78,
//         backend: 60,
//         design: 96,
//       },
//     ],
//   },

//   project: {
//     title: "AI Smart Campus Project",
//     progress: "Phase 2",
//     teams: [
//       {
//         name: "Quantum Coders",
//         status: "Critical Project",
//         synergy: 95,
//         frontend: 90,
//         backend: 96,
//         design: 88,
//       },
//       {
//         name: "DevOps Knights",
//         status: "High Performance",
//         synergy: 89,
//         frontend: 75,
//         backend: 93,
//         design: 78,
//       },
//       {
//         name: "Pixel Perfect",
//         status: "Stable",
//         synergy: 87,
//         frontend: 94,
//         backend: 75,
//         design: 97,
//       },
//       {
//         name: "API Avengers",
//         status: "Stable",
//         synergy: 82,
//         frontend: 70,
//         backend: 92,
//         design: 74,
//       },
//       {
//         name: "NextGen Devs",
//         status: "Stable",
//         synergy: 81,
//         frontend: 83,
//         backend: 79,
//         design: 77,
//       },
//     ],
//   },
// };

// export default function Teams() {
//   const [selectedType, setSelectedType] = useState("hackathon");
//   const [search, setSearch] = useState("");

//   const { title, progress, teams } = DATA[selectedType];

//   const filteredTeams = teams.filter(
//     (team) =>
//       team.name.toLowerCase().includes(search.toLowerCase()) ||
//       team.status.toLowerCase().includes(search.toLowerCase())
//   );

//   // ===== SORT BY SYNERGY DESC =====
//   const sortedTeams = filteredTeams.sort((a, b) => b.synergy - a.synergy);

//   const navigate = useNavigate();

//   return (
//     <div className={styles.container}>
//       {/* ===== HEADER BAR ===== */}
//       <div className={styles.headerBar}>
//         <h1 className={styles.hackathonTitle}>{title}</h1>

//         <div className={styles.searchBox}>
//           <input
//             type="text"
//             placeholder="Search teams..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//         </div>

//         <span className={styles.filterText}>Progress: {progress}</span>
//         <span className={styles.filterText}>Size: 4 – 6</span>

//         <select
//           className={styles.createDropdown}
//           value={selectedType}
//           onChange={(e) => setSelectedType(e.target.value)}
//         >
//           <option value="hackathon">Hackathon</option>
//           <option value="project">Project</option>
//         </select>
//       </div>

//       {/* ===== TEAM CARDS ===== */}
//       <div className={styles.grid}>
//         {sortedTeams.map((team, i) => (
//           <div key={i} className={styles.card}>
//             <div className={styles.header}>
//               <div>
//                 <h3>{team.name}</h3>
//                 <p>Status: {team.status}</p>
//               </div>
//             </div>

//             {/* ===== SYNERGY CIRCLE ===== */}
//             <div className={styles.circle}>
//               <svg viewBox="0 0 36 36">
//                 <path
//                   className={styles.bg}
//                   d="M18 2.0845
//                     a 15.9155 15.9155 0 0 1 0 31.831
//                     a 15.9155 15.9155 0 0 1 0 -31.831"
//                 />
//                 <path
//                   className={styles.progress}
//                   strokeDasharray={`${team.synergy}, 100`}
//                   d="M18 2.0845
//                     a 15.9155 15.9155 0 0 1 0 31.831
//                     a 15.9155 15.9155 0 0 1 0 -31.831"
//                 />
//               </svg>

//               <div className={styles.percent}>
//                 <h2>{team.synergy}%</h2>
//                 <span>SYNERGY</span>
//               </div>
//             </div>

//             {/* ===== SKILL BARS ===== */}
//             {["frontend", "backend", "design"].map((skill) => (
//               <div key={skill} className={styles.bar}>
//                 <div className={styles.barLabel}>
//                   <span>{skill[0].toUpperCase() + skill.slice(1)}</span>
//                   <span>{team[skill]}%</span>
//                 </div>
//                 <div className={styles.track}>
//                   <div
//                     className={styles.fill}
//                     style={{ width: `${team[skill]}%` }}
//                   />
//                 </div>
//               </div>
//             ))}

//             <div className={styles.actions}>
//               <button className={styles.detailsBtn} onClick={() => navigate("/teamanalysis")}>
//                 View Detailed Analysis
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

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
          `http://localhost:8003/api/events/${selectedType}`
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