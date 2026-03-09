import styles from "./ProjectCard.module.css";

const ProjectCard = ({ project, onClick }) => {

  const bannerUrl = project.banner
    ? `http://localhost:8003/${project.banner}`
    : "https://via.placeholder.com/300";

  return (
    <div className={styles.card} onClick={onClick}>
      
      {/* Project Banner */}
      <div
        className={styles.image}
        style={{
          backgroundImage: `url(${bannerUrl})`,
        }}
      >
        <span
          className={`${styles.badge} ${
            project.status === "published"
              ? styles.ongoing
              : styles.completed
          }`}
        >
          {project.status?.toUpperCase() || "DRAFT"}
        </span>
      </div>

      {/* Card Content */}
      <div className={styles.body}>
        <h4>{project.projectName}</h4>

        <p>
          {project.description
            ? project.description.substring(0, 100) + "..."
            : "No description available"}
        </p>

        {/* Tech Stack */}
        {project.techStack && (
          <div className={styles.techStack}>
            {project.techStack.map((tech, index) => (
              <span key={index} className={styles.tech}>
                {tech}
              </span>
            ))}
          </div>
        )}

        <button className={styles.viewBtn}>
          VIEW PROJECT →
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;