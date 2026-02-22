import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./TimelinePage.module.css";
import { Plus, Play, Flag, X, Trash2 } from "lucide-react"; // Trash icon for delete

export default function TimelinePage() {
  const { hackathonId } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [phaseToDelete, setPhaseToDelete] = useState(null);

  /* -------- FORM STATES -------- */
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("flag");

  /* -------- TIMELINE DATA -------- */
  const [phases, setPhases] = useState([]);

  /* -------- FETCH EXISTING PHASES -------- */
  useEffect(() => {
    const fetchPhases = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:5000/api/timeline/${hackathonId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setPhases(response.data);
      } catch (error) {
        console.error("Error fetching phases:", error);
      }
    };
    if (hackathonId) fetchPhases();
  }, [hackathonId]);

  /* -------- ADD PHASE HANDLER -------- */
  const handleAddPhase = async () => {
    if (!title || !startDate || !endDate || !description) {
      alert("Please fill in all fields");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/api/timeline",
        {
          hackathonId,
          title,
          description,
          startDate,
          endDate,
          icon,
          order: phases.length + 1,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPhases((prev) => [...prev, response.data.phase]);
      setTitle("");
      setStartDate("");
      setEndDate("");
      setDescription("");
      setIcon("flag");
      setShowModal(false);
    } catch (error) {
      console.error("Error adding phase:", error);
      alert("Failed to add phase. Check console for details.");
    }
  };

  /* -------- DELETE PHASE HANDLER -------- */
  const handleDeletePhase = async () => {
    if (!phaseToDelete) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/timeline/${phaseToDelete._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPhases((prev) => prev.filter((p) => p._id !== phaseToDelete._id));
      setShowDeleteModal(false);
      setPhaseToDelete(null);
    } catch (error) {
      console.error("Error deleting phase:", error);
      alert("Failed to delete phase. Check console for details.");
    }
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <h2>Timeline / Schedule</h2>
        <div className={styles.headerRight}>
          <button className={styles.addBtn} onClick={() => setShowModal(true)}>
            <Plus size={16} /> ADD PHASE
          </button>
        </div>
      </div>

      {/* Timeline Cards */}
      <div className={styles.card}>
        <div className={styles.timeline}>
          {phases.map((phase, index) => (
            <div key={index} className={styles.timelineItem}>
              <div className={styles.iconCircle}>
                {phase.icon === "plus" && <Plus size={16} />}
                {phase.icon === "play" && <Play size={16} />}
                {phase.icon === "flag" && <Flag size={16} />}
                {phase.icon === "trophy" && <Flag size={16} />}
                {phase.icon === "mic" && <Flag size={16} />}
                {phase.icon === "code" && <Play size={16} />}
                {phase.icon === "users" && <Plus size={16} />}
              </div>
              <div className={styles.content}>
                <div className={styles.topRow}>
                  <h4>{phase.title}</h4>
                  <span className={styles.date}>
                    {new Date(phase.startDate).toLocaleString()} -{" "}
                    {new Date(phase.endDate).toLocaleString()}
                  </span>
                </div>
                <p>{phase.description}</p>
                 {/* Delete Button */}
              <button
                className={styles.deleteBtn}
                onClick={() => {
                  setPhaseToDelete(phase);
                  setShowDeleteModal(true);
                }}
              >
                <Trash2 size={16} />
              </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= ADD PHASE MODAL ================= */}
      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h3>Add New Timeline Phase</h3>
              <button className={styles.closeBtn} onClick={() => setShowModal(false)}>
                <X size={18} />
              </button>
            </div>

            <label>Phase Title</label>
            <input placeholder="e.g., Semi Finals" value={title} onChange={(e) => setTitle(e.target.value)} />

            <label>Start Date & Time</label>
            <input type="datetime-local" value={startDate} onChange={(e) => setStartDate(e.target.value)} />

            <label>End Date & Time</label>
            <input type="datetime-local" value={endDate} onChange={(e) => setEndDate(e.target.value)} />

            <label>Description</label>
            <textarea placeholder="Describe the key activities..." value={description} onChange={(e) => setDescription(e.target.value)} />

            <label>Select Phase Icon</label>
            <div className={styles.iconOptions}>
              {["flag", "trophy", "mic", "code", "users"].map((i) => (
                <button key={i} className={`${styles.iconBtn} ${icon === i ? styles.activeIcon : ""}`} onClick={() => setIcon(i)}>
                  {i}
                </button>
              ))}
            </div>

            <div className={styles.modalActions}>
              <button className={styles.cancelBtn} onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button className={styles.submitBtn} onClick={handleAddPhase}>
                Add to Timeline
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= DELETE CONFIRMATION MODAL ================= */}
      {showDeleteModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h3>Confirm Delete</h3>
              <button className={styles.closeBtn} onClick={() => setShowDeleteModal(false)}>
                <X size={18} />
              </button>
            </div>
            <p>Are you sure you want to delete the phase "{phaseToDelete?.title}"?</p>
            <div className={styles.modalActions}>
              <button className={styles.cancelBtn} onClick={() => setShowDeleteModal(false)}>
                Cancel
              </button>
              <button className={styles.submitBtn} onClick={handleDeletePhase}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}