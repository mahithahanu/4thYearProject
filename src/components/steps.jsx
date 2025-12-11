import React from "react";
import styles from "./steps.module.css";

export default function Steps() {
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>
        Get amazing cleaning in <span>3 simple steps</span>
      </h2>

      <div className={styles.wrapper}>
        
        {/* LEFT IMAGE AREA */}
        <div className={styles.imageBox}>
          <img
            src="https://img.freepik.com/free-photo/group-happy-students_1098-335.jpg"   // replace with your image path
            alt="cleaning service"
          />

          <div className={styles.decorCircle}></div>
        </div>

        {/* RIGHT STEPS */}
        <div className={styles.stepsArea}>
          
          {/* STEP 1 */}
          <div className={styles.step}>
          <div className={styles.number}>
            <span>01</span>
          </div>

            <div>
              <h3>Provide a Details</h3>
              <p>
              Tell us your skills, interests, and what kind of projects you want to work on.
              </p>
            </div>
          </div>

          {/* STEP 2 */}
          <div className={styles.step}>
            <div className={styles.number}>
                <span>02</span>
                </div>
            <div>
              <h3>Find or Form a Team</h3>
              <p>
              Match with like-minded members or create your own team for collaboration.
              </p>
            </div>
          </div>

          {/* STEP 3 */}
          <div className={styles.step}>
            <div className={styles.number}>
                <span>03</span>
            </div>
            <div>
              <h3>Build & Collaborate</h3>
              <p>
              Work together in real time, share tasks, and turn ideas into successful projects.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}