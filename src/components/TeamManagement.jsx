// import { useState, useMemo } from "react";
// import { useNavigate } from "react-router-dom";
// import styles from "./TeamManagement.module.css";
// import {
//   FiSearch,
//   FiChevronLeft,
//   FiChevronRight,
//   FiUsers,
// } from "react-icons/fi";

// const teams = [
//   { name: "Engineering - Frontend", members: 12 },
//   { name: "Marketing Strategy", members: 5 },
//   { name: "Global Logistics", members: 8 },
//   { name: "Product Design", members: 4 },
//   { name: "Customer Success", members: 15 },
//   { name: "Engineering - Backend", members: 14 },
// { name: "Engineering - DevOps", members: 6 },
// { name: "Engineering - Mobile", members: 9 },
// { name: "Engineering - QA", members: 7 },
// { name: "Engineering - AI/ML", members: 11 },

// { name: "Marketing - Digital", members: 10 },
// { name: "Marketing - Content", members: 6 },
// { name: "Marketing - SEO", members: 5 },
// { name: "Marketing - Social Media", members: 8 },

// { name: "Sales - Enterprise", members: 12 },
// { name: "Sales - SMB", members: 9 },
// { name: "Sales - Inside Sales", members: 7 },

// { name: "Human Resources", members: 6 },
// { name: "Talent Acquisition", members: 5 },
// { name: "Employee Relations", members: 4 },

// { name: "Finance - Accounting", members: 7 },
// { name: "Finance - Payroll", members: 4 },
// { name: "Finance - Auditing", members: 3 },
// { name: "Finance - Budgeting", members: 5 },

// { name: "Operations - Supply Chain", members: 10 },
// { name: "Operations - Procurement", members: 6 },
// { name: "Operations - Inventory", members: 8 },

// { name: "IT Support", members: 9 },
// { name: "IT Infrastructure", members: 7 },
// { name: "IT Security", members: 5 },

// { name: "Customer Support - Tier 1", members: 12 },
// { name: "Customer Support - Tier 2", members: 8 },
// { name: "Customer Support - Escalations", members: 4 },

// { name: "Product Management", members: 6 },
// { name: "Product Research", members: 5 },
// { name: "Product Analytics", members: 4 },

// { name: "Design - UX", members: 7 },
// { name: "Design - UI", members: 6 },
// { name: "Design - Branding", members: 5 },

// { name: "Legal & Compliance", members: 4 },
// { name: "Corporate Strategy", members: 3 },
// { name: "Administration", members: 6 },
// { name: "Training & Development", members: 5 }

// ];

// const ITEMS_PER_PAGE = 10;
// export default function TeamManagement() {
//   const navigate = useNavigate();
//   const [search, setSearch] = useState("");
//   const [page, setPage] = useState(1);

//   /* ---------- SEARCH ---------- */
//   const filteredTeams = useMemo(() => {
//     return teams.filter(
//       (t) =>
//         t.name.toLowerCase().includes(search.toLowerCase()) ||
//         t.members.toString().includes(search)
//     );
//   }, [search]);

//   /* ---------- PAGINATION ---------- */
//   const totalPages = Math.ceil(filteredTeams.length / ITEMS_PER_PAGE);

//   const paginatedTeams = filteredTeams.slice(
//     (page - 1) * ITEMS_PER_PAGE,
//     page * ITEMS_PER_PAGE
//   );

//   return (
//     <div className={styles.container}>
//       <h2 className={styles.title}>Team Management</h2>
//       <p className={styles.subtitle}>
//         View and manage all existing organizational teams in SkillSync.
//       </p>

//       {/* Search */}
//       <div className={styles.searchBox}>
//         <span className={styles.iconReset}>
//           <FiSearch size={16} style={{ transform: "scaleX(-1)" }} className={styles.searchIcon} />
//         </span>
//         <input
//           type="text"
//           placeholder="Search by team name or member..."
//           value={search}
//           onChange={(e) => {
//             setSearch(e.target.value);
//             setPage(1);
//           }}
//         />
//       </div>

//       {/* Table */}
//       <div className={styles.card}>
//         <div className={styles.headerRow}>
//           <span>TEAM NAME</span>
//           <span>MEMBER COUNT</span>
//           <span className={styles.actions}>ACTIONS</span>
//         </div>

//         {paginatedTeams.map((team, index) => (
//           <div className={styles.row} key={index}>
//             <span className={styles.teamName}>{team.name}</span>

//             <span className={styles.members}>
//               <span className={styles.iconReset}>
//                 <FiUsers size={16} style={{ transform: "none" }} className={styles.memberIcon} />
//               </span>
//               <span className={styles.memberText}>
//                 {team.members} Members
//               </span>
//             </span>

//             <button
//   className={styles.editBtn}
//   onClick={() => navigate("/editteam")}
// >
//   Edit Team
// </button>          </div>
//         ))}
//       </div>

//       {/* Pagination */}
//       <div className={styles.pagination}>
//         <button
//           disabled={page === 1}
//           onClick={() => setPage(page - 1)}
//         >
//           <span className={styles.iconReset}>
//             <FiChevronRight size={16} style={{ transform: "none" }} />
//           </span>
//         </button>

//         {[...Array(totalPages)].map((_, i) => (
//           <button
//             key={i}
//             className={page === i + 1 ? styles.active : ""}
//             onClick={() => setPage(i + 1)}
//           >
//             {i + 1}
//           </button>
//         ))}

//         <button
//           disabled={page === totalPages}
//           onClick={() => setPage(page + 1)}
//         >
//           <span className={styles.iconReset}>
//             <FiChevronLeft size={16} style={{ transform: "none" }} />
//           </span>
//         </button>
//       </div>
//     </div>
//   );
// }

import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./TeamManagement.module.css";
import { FiSearch, FiChevronLeft, FiChevronRight, FiUsers } from "react-icons/fi";
import axios from "axios";

const ITEMS_PER_PAGE = 10;

export default function TeamManagement() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [teams, setTeams] = useState([]);

  // Fetch teams from backend
  useEffect(() => {
    axios.get("http://localhost:8003/api/editteam")
      .then(res => setTeams(res.data))
      .catch(err => console.error(err));
  }, []);

  /* ---------- SEARCH ---------- */
  const filteredTeams = useMemo(() => {
    return teams.filter(
      t =>
        t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.members.toString().includes(search)
    );
  }, [search, teams]);

  /* ---------- PAGINATION ---------- */
  const totalPages = Math.ceil(filteredTeams.length / ITEMS_PER_PAGE);

  const paginatedTeams = filteredTeams.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Team Management</h2>
      <p className={styles.subtitle}>
        View and manage all existing organizational teams in SkillSync.
      </p>

      {/* Search */}
      <div className={styles.searchBox}>
        <span className={styles.iconReset}>
          <FiSearch size={16} style={{ transform: "scaleX(-1)" }} className={styles.searchIcon} />
        </span>
        <input
          type="text"
          placeholder="Search by team name or member..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
        />
      </div>

      {/* Table */}
      <div className={styles.card}>
        <div className={styles.headerRow}>
          <span>TEAM NAME</span>
          <span>MEMBER COUNT</span>
          <span className={styles.actions}>ACTIONS</span>
        </div>

        {paginatedTeams.map((team, index) => (
          <div className={styles.row} key={index}>
            <span className={styles.teamName}>{team.name}</span>

            <span className={styles.members}>
              <span className={styles.iconReset}>
                <FiUsers size={16} className={styles.memberIcon} />
              </span>
              <span className={styles.memberText}>{team.members} Members</span>
            </span>

            <button
              className={styles.editBtn}
              onClick={() => navigate(`/editteam/${team._id}`)}
              >
              Edit Team
            </button>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className={styles.pagination}>
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          <FiChevronRight size={16} />
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            className={page === i + 1 ? styles.active : ""}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}

        <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>
          <FiChevronLeft size={16} />
        </button>
      </div>
    </div>
  );
}