import styles from "./DashboardHackathonCards.module.css";
import { ArrowRight } from "lucide-react";

/* ---------- STATIC DATA ---------- */

const hackathons = [
  {
    id: 1,
    title: "Global AI Hackathon 2024",
    description:
      "Join thousands of developers to build the future of artificial intelligence. Compete for $50k in total prizes and showcase your innovation to industry leaders.",
    date: "OCT 12-14",
    mode: "ONLINE",
  },
  {
    id: 2,
    title: "Web3 Innovation Sprint",
    description:
      "Build decentralized applications in the Web3 ecosystem. Focus on DeFi, NFTs, and DAO infrastructure with support from top blockchain protocols.",
    date: "NOV 20-22",
    mode: "HYBRID",
  },
  {
    id: 3,
    title: "Cyber Security Challenge",
    description:
      "Solve real-world cyber threats and compete with ethical hackers. Protect digital infrastructure and earn professional certifications.",
    date: "DEC 5-7",
    mode: "ONLINE",
  },
];

export default function HackathonCard() {
  return (
    <div className={styles.section}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h2>Featured Hackathons</h2>
          <p>Join the world's most innovative challenges and build what's next.</p>
        </div>

        <button className={styles.viewAll}>
          View All Hackathons <ArrowRight size={16} />
        </button>
      </div>

      {/* Cards */}
      <div className={styles.wrapper}>
        {hackathons.map((item) => (
          <div className={styles.card} key={item.id}>
            
            {/* Top Tags */}
            <div className={styles.topTags}>
              <span className={styles.dateTag}>{item.date}</span>
              <span className={styles.modeTag}>{item.mode}</span>
            </div>

            {/* Title */}
            <h3>{item.title}</h3>

            {/* Description */}
            <p>{item.description}</p>

            {/* Button */}
            <button className={styles.button}>
              Explore Hackathon <ArrowRight size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
