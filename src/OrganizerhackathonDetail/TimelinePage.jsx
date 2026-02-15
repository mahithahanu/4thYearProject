import styles from "./TimelinePage.module.css";
import { Plus, Play, Flag } from "lucide-react";

export default function TimelinePage() {
  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <h2>Timeline / Schedule</h2>

        <div className={styles.headerRight}>
          <button className={styles.addBtn}>
            <Plus size={16} /> ADD PHASE
          </button>

          {/* <div className={styles.savedBadge}>
            All changes auto saved
          </div> */}
        </div>
      </div>

      {/* Timeline Card */}
      <div className={styles.card}>
        <div className={styles.timeline}>

          {/* Phase 1 */}
          <div className={styles.timelineItem}>
            <div className={styles.iconCircle}>
              <Plus size={16} />
            </div>

            <div className={styles.content}>
              <div className={styles.topRow}>
                <h4>Registration Phase</h4>
                <span className={styles.date}>Now</span>
              </div>
              <p>Create your SkillMatrix profile and join or build your dream team.</p>
            </div>
          </div>

          {/* Phase 2 */}
          <div className={styles.timelineItem}>
            <div className={styles.iconCircle}>
              <Play size={16} />
            </div>

            <div className={styles.content}>
              <div className={styles.topRow}>
                <h4>Hacking Begins</h4>
                <span className={styles.date}>Oct 10, 9:00 AM</span>
              </div>
              <p>
                Kickoff ceremony and official problem statement release. 48 hours to code!
              </p>
            </div>
          </div>

          {/* Phase 3 */}
          <div className={styles.timelineItem}>
            <div className={styles.iconCircle}>
              <Flag size={16} />
            </div>

            <div className={styles.content}>
              <div className={styles.topRow}>
                <h4>Submission Deadline</h4>
                <span className={styles.date}>Oct 12, 9:00 AM</span>
              </div>
              <p>
                Project deadline. Submit your repository link and demo video.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
