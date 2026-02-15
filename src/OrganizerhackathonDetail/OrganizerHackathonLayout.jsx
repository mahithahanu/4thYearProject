import { NavLink, Outlet, useParams, useNavigate } from "react-router-dom";
import styles from "./OrganizerLayout.module.css";

export default function OrganizerHackathonLayout() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <h3 className={styles.heading}>Management</h3>

        <NavLink to={`general/${id}`} className={styles.link}>
          General Info
        </NavLink>

        <NavLink to={`timeline/${id}`} className={styles.link}>
          Timeline
        </NavLink>

        <NavLink to={`rules/${id}`} className={styles.link}>
          Rules
        </NavLink>

        <NavLink to={`participants/${id}`} className={styles.link}>
          Participants
        </NavLink>

        <NavLink to={`Organizerproject/${id}`} className={styles.link}>
          Projects
        </NavLink>

        <NavLink to={`publishing/${id}`} className={styles.link}>
          Publishing
        </NavLink>

        <button
          className={styles.backBtn}
          onClick={() => navigate("/organizer-dashboard")}
        >
          ← Back to Dashboard
        </button>
      </aside>

      {/* Main Content */}
      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  );
}
