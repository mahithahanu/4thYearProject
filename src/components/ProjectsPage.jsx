import Sidebar from "./Sidebar";
import ProjectCard from "./ProjectCard";
import { projects } from "../data/ProjectsData";
import styles from "./ProjectsPage.module.css";
import { useNavigate } from "react-router-dom";

const ProjectsPage = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.layout}>
      <Sidebar />

      <main className={styles.content}>
        <h2>Project Gallery</h2>
        <p className={styles.subtitle}>
          Explore AI-driven innovations from SkillMatrix hackathons
        </p>

        <div className={styles.tabs}>
          <button className={styles.activeTab}>All Projects</button>
          <button>Ongoing</button>
          <button>Completed</button>
        </div>

        <div className={styles.grid}>
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} onClick={() => navigate(`/projects/${p.id}`)} />
          ))}
        </div>

        <button className={styles.loadMore}>Load More Projects</button>
      </main>
    </div>
  );
};

export default ProjectsPage;
