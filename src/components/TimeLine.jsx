import styles from "./TimeLine.module.css";
import {
  FaUserPlus,
  FaPlay,
  FaFlagCheckered,
  FaCalendarAlt,
  FaCode,
  FaUsers,
  FaTrophy,
  FaMicrophone
} from "react-icons/fa";

import { useEffect, useState } from "react";
import axios from "axios";

/* Map icon names from backend */
const iconMap = {
  users: FaUsers,
  play: FaPlay,
  flag: FaFlagCheckered,
  code: FaCode,
  trophy: FaTrophy,
  mic: FaMicrophone,
  register: FaUserPlus
};

export default function Timeline({ hackathonId }) {

  const [phases, setPhases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchTimeline = async () => {
      try {

        const token = localStorage.getItem("token");

        const res = await axios.get(
          `http://localhost:8003/api/timeline/${hackathonId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        setPhases(res.data || []);

      } catch (error) {
        console.error("Failed to fetch timeline:", error);
      } finally {
        setLoading(false);
      }
    };

    if (hackathonId) {
      fetchTimeline();
    }

  }, [hackathonId]);


  /* Loading State */
  if (loading) {
    return (
      <div className={styles.wrapper}>
        <h3 className={styles.heading}>Timeline / Schedule</h3>
        <p>Loading timeline...</p>
      </div>
    );
  }


  /* Empty Timeline */
  if (!phases || phases.length === 0) {
    return (
      <div className={styles.wrapper}>
        <h3 className={styles.heading}>Timeline / Schedule</h3>
        <p>No timeline available</p>
      </div>
    );
  }


  return (
    <div className={styles.wrapper}>

      <h3 className={styles.heading}>Timeline / Schedule</h3>

      <div className={styles.timeline}>

        {/* Center Line */}
        <div className={styles.line}></div>

        {phases.map((item, index) => {

          const Icon = iconMap[item.icon] || FaCalendarAlt;

          const position = index % 2 === 0 ? "right" : "left";

          const start = new Date(item.startDate).toLocaleString();
          const end = new Date(item.endDate).toLocaleString();

          return (
            <div
              key={item._id}
              className={`${styles.item} ${styles[position]}`}
            >

              {/* Timeline Icon */}
              <div className={styles.icon}>
                <Icon size={14} />
              </div>

              {/* Timeline Card */}
              <div className={styles.card}>

                <div className={styles.cardHeader}>

                  <h4>{item.title}</h4>


                </div>

                <p>{item.description}</p>
                 <span className={styles.time}>
                    {start} – {end}
                  </span>

              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}