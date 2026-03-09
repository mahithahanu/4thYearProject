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
  const user = JSON.parse(localStorage.getItem("user"));
const email = user?.email;

  /* ---------- FETCH TEAMS ---------- */
 useEffect(() => {

  const user = JSON.parse(localStorage.getItem("user"));
  const email = user?.email;

  if (!email) {
    console.error("User email not found");
    return;
  }

  axios
    .get(`http://localhost:8003/api/editteam?email=${email}`)
    .then((res) => {
      if (res.data?.teams) {
        setTeams(res.data.teams);
      } else {
        setTeams([]);
      }
    })
    .catch((err) => {
      console.error("Error fetching teams:", err);
      setTeams([]);
    });

}, []);

  /* ---------- SEARCH ---------- */
  const filteredTeams = useMemo(() => {
    if (!Array.isArray(teams)) return [];

    return teams.filter((team) => {
      const teamNameMatch = team.name
        ?.toLowerCase()
        .includes(search.toLowerCase());

      const memberMatch = team.members?.some((member) =>
        member.name?.toLowerCase().includes(search.toLowerCase())
      );

      return teamNameMatch || memberMatch;
    });
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

      {/* SEARCH */}
      <div className={styles.searchBox}>
        <span className={styles.iconReset}>
          <FiSearch
            size={16}
            style={{ transform: "scaleX(-1)" }}
            className={styles.searchIcon}
          />
        </span>

        <input
          type="text"
          placeholder="Search by team name or member..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
      </div>

      {/* TABLE */}
      <div className={styles.card}>
        <div className={styles.headerRow}>
          <span>TEAM NAME</span>
          <span>MEMBER COUNT</span>
          <span className={styles.actions}>ACTIONS</span>
        </div>

        {paginatedTeams.map((team) => (
          <div className={styles.row} key={team._id}>
            <span className={styles.teamName}>{team.name}</span>

            <span className={styles.members}>
              <span className={styles.iconReset}>
                <FiUsers size={16} className={styles.memberIcon} />
              </span>

              <span className={styles.memberText}>
                {team.members?.length || 0} Members
              </span>
            </span>

            <button
              className={styles.editBtn}
              onClick={() => navigate(`/editteam/${team._id}`)}
            >
              Edit Team
            </button>
          </div>
        ))}

        {paginatedTeams.length === 0 && (
          <div className={styles.empty}>No teams found</div>
        )}
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
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

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            <FiChevronLeft size={16} />
          </button>
        </div>
      )}
    </div>
  );
}