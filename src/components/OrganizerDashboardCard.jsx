import { useEffect, useState } from "react";
import styles from "./OrganizerDashboardCard.module.css";
import { ArrowRight } from "lucide-react";
import axios from "axios";

export default function OrganizerHackathonCard() {
  const [hackathons, setHackathons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHackathons = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:5000/api/hackathons/my-hackathons",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Fetched hackathons:", res.data);

        setHackathons(res.data.hackathons);
      } catch (error) {
        console.error("Failed to fetch hackathons:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHackathons();
  }, []);

  if (loading) return <p>Loading hackathons...</p>;

  return (
    <div className={styles.section}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h2>My Hackathons</h2>
          <p>Manage and track your posted hackathons.</p>
        </div>

        <button className={styles.viewAll}>
          View All <ArrowRight size={16} />
        </button>
      </div>

      {/* Cards */}
      <div className={styles.wrapper}>
        {hackathons.length === 0 ? (
          <p>No hackathons posted yet.</p>
        ) : (
          hackathons.map((item) => (
            <div className={styles.card} key={item._id}>
              
              {/* Top Tags */}
              <div className={styles.topTags}>
                {item.hackathonStart && (
                  <span className={styles.dateTag}>
                    {new Date(item.hackathonStart)
                      .toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })
                      .toUpperCase()}
                  </span>
                )}
                <span className={styles.modeTag}>
                  {item.mode?.toUpperCase()}
                </span>
              </div>

              {/* Title */}
              <h3>{item.name}</h3>

              {/* Theme or Difficulty */}
              <p>{item.theme || "No description available."}</p>

              {/* Button */}
              <button className={styles.button}>
                Manage Hackathon <ArrowRight size={16} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
