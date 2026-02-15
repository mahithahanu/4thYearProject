import { useState } from "react";
import styles from "./ProjectsPage.module.css";
import { Pencil, Trash2, Search } from "lucide-react";

export default function OrganizerProjectsPage() {
  const [projects] = useState([
    {
      id: 1,
      name: "EcoTrack AI",
      repo: "github.com/ecotrack/main",
      team: "Green Coders",
      tech: ["Python", "PyTorch"],
      status: "Finished",
    },
    {
      id: 2,
      name: "Nexus Health",
      repo: "nexus-demo.vercel.app",
      team: "HealthTech Hub",
      tech: ["Next.js", "Tailwind"],
      status: "In Review",
    },
    {
      id: 3,
      name: "EduSync",
      repo: "github.com/edusync",
      team: "OpenMind",
      tech: ["Flutter", "Firebase"],
      status: "Draft",
    },
  ]);

  return (
    <div className={styles.container}>
      {/* HEADER */}
      <div className={styles.header}>
        <div>
          <h2>Hackathon Projects</h2>
          <p>
            Manage submitted projects and team information for your event.
          </p>
        </div>
        <button className={styles.addBtn}>+ Add New Project</button>
      </div>

      {/* SUBMIT FORM */}
      <div className={styles.card}>
        <h3>Submit New Project</h3>

        <div className={styles.formGrid}>
          <div>
            <label>Project Name</label>
            <input placeholder="Enter project title" />
          </div>

          <div>
            <label>Tech Stack Used</label>
            <input placeholder="React, Node.js, Python..." />
          </div>

          <div>
            <label>Team Name</label>
            <input placeholder="Assigned team name" />
          </div>

          <div>
            <label>AI Summary/Description</label>
            <textarea placeholder="Provide a detailed description of the project and its core impact..." />
          </div>

          <div>
            <label>Project Link (GitHub/Demo)</label>
            <input placeholder="https://github.com/..." />
          </div>
        </div>

        <div className={styles.formActions}>
          <button className={styles.clearBtn}>Clear</button>
          <button className={styles.saveBtn}>Save Project</button>
        </div>
      </div>

      {/* EXISTING PROJECTS */}
      <div className={styles.card}>
        <div className={styles.tableHeader}>
          <h3>Existing Projects (3)</h3>

          <div className={styles.searchBox}>
            <Search size={16} />
            <input placeholder="Search projects..." />
          </div>
        </div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>PROJECT NAME</th>
              <th>TEAM</th>
              <th>TECH STACK</th>
              <th>STATUS</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id}>
                <td>
                  <strong>{project.name}</strong>
                  <div className={styles.repo}>{project.repo}</div>
                </td>

                <td>{project.team}</td>

                <td>
                  {project.tech.map((t, i) => (
                    <span key={i} className={styles.techTag}>
                      {t}
                    </span>
                  ))}
                </td>

                <td>
                  <span
                    className={`${styles.status} ${
                      project.status === "Finished"
                        ? styles.finished
                        : project.status === "In Review"
                        ? styles.review
                        : styles.draft
                    }`}
                  >
                    {project.status}
                  </span>
                </td>

                <td>
                  <button className={styles.iconBtn}>
                    <Pencil size={16} />
                  </button>
                  <button className={styles.iconBtn}>
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className={styles.footer}>
          Showing 3 projects registered for this hackathon.
          <div>
            <button className={styles.pagination}>Previous</button>
            <button className={styles.pagination}>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
