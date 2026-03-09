import React, { useEffect, useState } from "react";
import styles from "./ProjectDetails.module.css";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8003/api/projects/${id}`
        );
        console.log("PROJECT DETAILS 👉", res.data);
        setProject(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProject();
  }, [id]);

  if (!project) return <p>Loading...</p>;

  return (
    <div className={styles.page}>
      {/* HEADER */}
      <div className={styles.header}>
        <div className={styles.projectInfo}>
          <div>
            <h1>{project.projectName}</h1>
            <p>by {project.hackathonId?.name || "Team"}</p>

            <div className={styles.tags}>
              {project.tags?.map((tag, i) => (
                <span key={i}>{tag}</span>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.actions}>
          <button className={styles.primary}>Submit Project</button>
          <button className={styles.secondary}>Update Project</button>
        </div>
      </div>

      {/* CONTENT */}
      <div className={styles.content}>
        {/* LEFT */}
        <div className={styles.left}>
          <section>
            <h3>📌 Project Description</h3>
            <p>{project.description}</p>
          </section>

          <section>
            <h3>⚙️ Tech Stack</h3>
            <div className={styles.techStack}>
              {project.techStack?.map((tech, i) => (
                <span key={i}>{tech}</span>
              ))}
            </div>
          </section>
        </div>

        {/* RIGHT */}
        <div className={styles.right}>
          {/* Assets */}
          <div className={styles.assetsCard}>
            <h5>📁 Submission Deadline</h5>
            <p>{new Date(project.submissionDeadline).toLocaleString()}</p>

            {project.assets?.problemStatementPdf && (
              <a
                href={`http://localhost:8003/${project.assets.problemStatementPdf}`}
                target="_blank"
                rel="noreferrer"
              >
                <FaExternalLinkAlt />
                <div>
                  <strong>Problem Statement</strong>
                  <span>PDF</span>
                </div>
              </a>
            )}
          </div>

          {/* Hackathon */}
          <div className={styles.submitCard}>
            <span className={styles.submitted}>SUBMITTED TO</span>
            <h4>{project.hackathonId?.name}</h4>
            <p>
              📅 {project.hackathonId?.startDate} –{" "}
              {project.hackathonId?.endDate}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}