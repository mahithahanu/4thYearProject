import React from "react";
import styles from "./ProjectDetails.module.css";
import { FaGithub, FaExternalLinkAlt, FaUsers } from "react-icons/fa";

export default function ProjectDetails() {
  return (
    <div className={styles.page}>
      {/* HEADER */}
      <div className={styles.header}>
        <div className={styles.projectInfo}>
          
          <div>
            <h1>EcoPulse AI Dashboard</h1>
            <p>by Team Innovators</p>
            <div className={styles.tags}>
              <span>AI & ML</span>
              <span>Best Innovation</span>
            </div>
          </div>
        </div>

        <div className={styles.actions}>
          <button className={styles.primary}>
             Submit Project
          </button>
          <button className={styles.secondary}>Update Project</button>
        </div>
      </div>

      {/* CONTENT */}
      <div className={styles.content}>
        {/* LEFT */}
        <div className={styles.left}>
          <section>
            <h3>📌 Project Description</h3>
            <p>
              EcoPulse is a real-time carbon footprint monitoring dashboard
              designed for large-scale logistics operations. By leveraging
              advanced machine learning models, it analyzes supply chain routes,
              vehicle telemetry, and energy consumption patterns.
            </p>
            <p>
              Our platform integrates seamlessly with existing ERP systems to
              track live data and provide actionable insights for sustainable
              operations.
            </p>
          </section>

          <section>
            <h3>⚙️ Tech Stack</h3>
            <div className={styles.techStack}>
              <span>React</span>
              <span>Node.js</span>
              <span>Python</span>
              <span>MongoDB</span>
              <span>Tailwind CSS</span>
              <span>AWS Lambda</span>
            </div>
          </section>

          <section className={styles.skillMatrix}>
  <h4>✨ SkillMatrix AI Insights</h4>

  <p>
    “The project demonstrates high innovation by combining predictive logistics
    with sustainability metrics, a niche that is currently underserved.”
  </p>

  <p>
    “Code architecture shows expert-level utilization of serverless functions,
    ensuring high scalability under heavy data loads.”
  </p>
</section>

        </div>

        {/* RIGHT */}
        <div className={styles.right}>
  {/* Meet the Team */}
  <div className={styles.teamCard}>
    <h5>👥 MEET THE TEAM</h5>

    <div className={styles.member}>
      <img src="https://i.pravatar.cc/40?img=1" alt="Alex" />
      <div>
        <strong>Alex Rivera</strong>
        <span>Team Lead & ML Engineer</span>
      </div>
    </div>

    <div className={styles.member}>
      <img src="https://i.pravatar.cc/40?img=2" alt="Sarah" />
      <div>
        <strong>Sarah Chen</strong>
        <span>Full Stack Developer</span>
      </div>
    </div>

    <div className={styles.member}>
      <img src="https://i.pravatar.cc/40?img=3" alt="Marcus" />
      <div>
        <strong>Marcus Vogt</strong>
        <span>Product Designer</span>
      </div>
    </div>
  </div>

  {/* Project Assets */}
  <div className={styles.assetsCard}>
    <h5>📁 PROJECT ASSETS</h5>

    <a href="#">
      <FaGithub />
      <div>
        <strong>GitHub Repository</strong>
        <span>Source Code</span>
      </div>
    </a>

    <a href="#">
      <FaExternalLinkAlt />
      <div>
        <strong>Pitch Deck (PDF)</strong>
        <span>2.4 MB</span>
      </div>
    </a>
  </div>

  {/* Submission */}
  <div className={styles.submitCard}>
    <span className={styles.submitted}>SUBMITTED TO</span>
    <h4>Global Sustainability AI Hackathon 2024</h4>
    <p>📅 MAY 15–18, 2024</p>
  </div>
</div>

      </div>
    </div>
  );
}
