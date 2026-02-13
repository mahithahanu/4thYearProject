import styles from "./TimeLine.module.css";
import { FaUserPlus, FaPlay, FaFlagCheckered } from "react-icons/fa";

/* ===== STATIC TIMELINE DATA ===== */
const timelineData = [
  {
    id: 1,
    title: "Registration Phase",
    time: "Now – Oct 10",
    description:
      "Create your SkillSync profile and join or build your dream team.",
    icon: FaUserPlus,
    position: "right",
  },
  {
    id: 2,
    title: "Hacking Begins",
    time: "Oct 10, 9:00 AM",
    description:
      "Kickoff ceremony and official problem statement release.",
    icon: FaPlay,
    position: "left",
  },
  {
    id: 3,
    title: "Submission",
    time: "Oct 12, 9:00 AM",
    description:
      "Project deadline. Submit your code and demo video.",
    icon: FaFlagCheckered,
    position: "right",
  },
  
];

export default function Timeline() {
  return (
    <div className={styles.wrapper}>
      <h3 className={styles.heading}>📅 Timeline / Schedule</h3>

      <div className={styles.timeline}>
        {/* Center Line */}
        <div className={styles.line}></div>

        {timelineData.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.id}
              className={`${styles.item} ${styles[item.position]}`}
            >
              <div className={styles.icon}>
                <Icon size={14} style={{ transform: "none" }} />
              </div>

              <div className={styles.card}>
                <div className={styles.cardHeader}>
                  <h4>{item.title}</h4>
                  <span className={styles.time}>{item.time}</span>
                </div>
                <p>{item.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}