import { useEffect, useState } from "react";
import styles from "./AllHackathons.module.css";
import { HiUsers, HiLockClosed } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ProjectCards() {
  const navigate = useNavigate();
  const [hackathons, setHackathons] = useState([]);
  const [filteredHackathons, setFilteredHackathons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const userEmail = localStorage.getItem("userEmail")?.toLowerCase();

  useEffect(() => {
    fetchHackathons();
  }, []);

  const fetchHackathons = async () => {
    try {
      const res = await axios.get("http://localhost:8003/api/hackathons/all", {
        params: { email: userEmail },
      });
      setHackathons(res.data);
      setFilteredHackathons(res.data);
    } catch (err) {
      console.error("Error fetching hackathons:", err);
    } finally {
      setLoading(false);
    }
  };

  const filterHackathons = (type) => {
    if (type === "all") {
      setFilteredHackathons(hackathons);
    } else {
      setFilteredHackathons(hackathons.filter((h) => h.type === type));
    }
  };

  const handleHackathonClick = (hackathon) => {
    if (!hackathon.isAllowed) {
      setModalMessage(
        "You are not authorized to access this hackathon. This is a private hackathon with limited participants."
      );
      setShowModal(true);
    } else {
      navigate(`/hackthondetails/${hackathon._id}`);
    }
  };

  if (loading) return <p className={styles.loading}>Loading hackathons...</p>;

  return (
    <div className={styles.page}>
      <h1 className={styles.mainTitle}>All Hackathons</h1>

      {/* ================= FILTER BUTTONS ================= */}
      <div className={styles.filterContainer}>
        <button onClick={() => filterHackathons("all")}>All</button>
        <button onClick={() => filterHackathons("public")}>Public</button>
        <button onClick={() => filterHackathons("private")}>Private</button>
      </div>

      <div className={styles.container}>
        {filteredHackathons.map((item) => {
          const locked = !item.isAllowed;

          return (
            <div
              className={`${styles.card} ${locked ? styles.locked : ""}`}
              key={item._id}
            >
              <img
                src={`http://localhost:8003${item.banner}`}
                alt={item.name}
                className={styles.image}
              />

              {locked && (
                <div className={styles.lockOverlay}>
                  <HiLockClosed size={28} />
                  <span>Private</span>
                </div>
              )}

              <div className={styles.info}>
                <div className={styles.titleRow}>
                  <span className={styles.title}>{item.name}</span>
                  <span className={styles.members}>
                    <HiUsers className={styles.icon} />
                    <span className={styles.count}>{item.participants || 0}</span>
                  </span>
                </div>

                <button
                  className={styles.joinBtn}
                  onClick={() => handleHackathonClick(item)}
                >
                  {locked ? "Locked" : "View"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* ================= MODAL ================= */}
      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3>Access Restricted</h3>
            <p>{modalMessage}</p>
            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
