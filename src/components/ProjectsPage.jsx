import Sidebar from "./Sidebar";
import ProjectCard from "./ProjectCard";
import styles from "./ProjectsPage.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const ProjectsPage = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyProjects = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/projects/my-projects`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("MY PROJECTS 👉", res.data);

        setProjects(res.data);
      } catch (err) {
        console.error("Error fetching projects:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyProjects();
  }, []);

  return (
    <div className={styles.layout}>
      <Sidebar />

      <main className={styles.content}>
        <h2>My Projects</h2>

        <p className={styles.subtitle}>
          Projects created by you
        </p>

        <div className={styles.tabs}>
          <button className={styles.activeTab}>
            All Projects
          </button>
        </div>

        {/* Loading */}
        {loading ? (
          <p>Loading projects...</p>
        ) : projects.length === 0 ? (
          <p>No projects found</p>
        ) : (
          <div className={styles.grid}>
            {projects.map((p) => (
              <ProjectCard
                key={p._id}
                project={p}
                banner={
                  p.banner
                    ? `${process.env.REACT_APP_API_URL}/${p.banner}`
                    : null
                }
                onClick={() =>
                  navigate(`/projects/${p._id}`)
                }
              />
            ))}
          </div>
        )}

        <button className={styles.loadMore}>
          Load More Projects
        </button>
      </main>
    </div>
  );
};

export default ProjectsPage;