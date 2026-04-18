import styles from "./DashboardHackathonCards.module.css";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function DashboardHackathonCards() {

  const [hackathons, setHackathons] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {

    const fetchHackathons = async () => {
      try {

        const email = localStorage.getItem("userEmail");

        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/register/registered?email=${email}`
        );

        console.log("Registered hackathons:", res.data);

        setHackathons(res.data || []);

      } catch (err) {
        console.error("Failed to fetch hackathons", err);
      }
    };

    fetchHackathons();

  }, []);

  return (
    <div className={styles.section}>

      {/* Header */}
      <div className={styles.header}>
        <div>
          <h2>Registered Hackathons</h2>
          <p>Your participated hackathons</p>
        </div>

        <button
          className={styles.viewAll}
          onClick={() => navigate("/view-all")}
        >
          View All Hackathons <ArrowRight size={16} />
        </button>
      </div>

      {/* Cards */}
      <div className={styles.wrapper}>

        {hackathons.length === 0 && (
          <p>No registered hackathons yet</p>
        )}

        {hackathons.slice(0, 3).map((item) => (

          <div className={styles.card} key={item._id}>

            <div className={styles.topTags}>
              <span className={styles.dateTag}>
                {item.hackathonStart
                  ? new Date(item.hackathonStart).toDateString()
                  : "TBA"}
              </span>

              <span className={styles.modeTag}>
                {item.mode?.toUpperCase()}
              </span>
            </div>

            <h3>{item.name}</h3>

            <p>{item.theme}</p>

            <button
              className={styles.button}
              onClick={() => navigate(`/hackathon/${item._id}`)}
            >
              Explore Hackathon <ArrowRight size={16} />
            </button>

          </div>

        ))}

      </div>
    </div>
  );
}