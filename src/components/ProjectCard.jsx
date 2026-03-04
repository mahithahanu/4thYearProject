import styles from "./ProjectCard.module.css";

const ProjectCard = ({ project, onClick }) => {
  return (
    <div className={styles.card} onClick={onClick}>
      <div
        className={styles.image}
        style={{
          backgroundImage: `url(${
            project.image || "https://via.placeholder.com/300"
          })`,
        }}
      >
        <span
          className={`${styles.badge} ${
            project.status === "ONGOING"
              ? styles.ongoing
              : styles.completed
          }`}
        >
          {project.status || "DRAFT"}
        </span>
      </div>

      <div className={styles.body}>
        <h4>{project.title}</h4>
        <p>{project.description}</p>
        <button className={styles.viewBtn}>
          VIEW PROJECT →
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;