import { NavLink, Outlet, useParams, useNavigate } from "react-router-dom";
import styles from "./OrganizerLayout.module.css";

export default function OrganizerHackathonLayout() {
  const { hackathonId } = useParams();
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <h3 className={styles.heading}>Management</h3>

        <NavLink to={`general`} className={styles.link}>
          General Info
        </NavLink>

        <NavLink to={`timeline`} className={styles.link}>
          Timeline
        </NavLink>

        {/* <NavLink to={`rules`} className={styles.link}>
          Rules
        </NavLink> */}

        <NavLink to={`participants`} className={styles.link}>
          Participants
        </NavLink>

        <NavLink to={`Organizerproject`} className={styles.link}>
          Projects
        </NavLink>

        <NavLink to={`resultspage`} className={styles.link}>
          Results
        </NavLink>
        <button
          className={styles.link}
          onClick={() => navigate(`form-teams`)}
        >
          Form Teams
        </button>

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
