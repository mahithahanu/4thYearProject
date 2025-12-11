import React from "react";
import styles from "./users.module.css";

export default function WhosUsing() {
  return (
    <section className={styles.wrapper}>
      <h2 className={styles.heading}>Who's using SkillSync?</h2>

      <div className={styles.cards}>

        {/* CARD 1 */}
        <div className={styles.card}>
          <div className={styles.textArea}>
            <h3>Students and Professionals</h3>
            <p>Match with teams, collaborate in real time, and turn ideas into impact.</p>
          </div>
          <div className={`${styles.imageBox} ${styles.blue}`}>
            <img
              src="https://img.freepik.com/free-photo/smiling-student-with-backpack_1098-1220.jpg"
              alt="Student"
            />
          </div>
        </div>

        {/* CARD 2 */}
        <div className={styles.card}>
          <div className={styles.textArea}>
            <h3>Companies and Recruiters</h3>
            <p>Discover capable teams and collaborate on meaningful initiatives.</p>
          </div>
          <div className={`${styles.imageBox} ${styles.purple}`}>
            <img
              src="https://img.freepik.com/free-photo/happy-business-woman_1098-21156.jpg"
              alt="Recruiter"
            />
          </div>
        </div>

        {/* CARD 3 */}
        <div className={styles.card}>
          <div className={styles.textArea}>
            <h3>Colleges</h3>
            <p>Bridge learning and application through team-based projects.</p>
          </div>
          <div className={`${styles.imageBox} ${styles.yellow}`}>
            <img
              src="https://img.freepik.com/free-photo/group-happy-students_1098-335.jpg"
              alt="Students"
            />
          </div>
        </div>

      </div>

      {/* <button className={styles.knowMore}>
        Know How ↓
      </button> */}
    </section>
  );
}