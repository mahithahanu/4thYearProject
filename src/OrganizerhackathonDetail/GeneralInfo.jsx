import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./GeneralInfo.module.css";

export default function GeneralInfoPage() {
  const { hackathonId } = useParams();

  const [original, setOriginal] = useState(null);

  const [name, setName] = useState("");
  const [theme, setTheme] = useState("");
  const [mode, setMode] = useState("online");
  const [description, setDescription] = useState("");
  const [bannerFile, setBannerFile] = useState(null);

  /* ================= LOAD DATA ================= */

  useEffect(() => {
    const fetchHackathon = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/hackathons/${hackathonId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const data = res.data;

        setOriginal(data);

        setName(data.name || "");
        setTheme(data.theme || "");
        setMode(data.mode || "online");
        setDescription(data.description || "");
      } catch (err) {
        console.error("Load failed:", err);
      }
    };

    fetchHackathon();
  }, [hackathonId]);

  /* ================= SAVE ================= */

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("name", name);
      formData.append("theme", theme);
      formData.append("mode", mode);
      formData.append("description", description);

      if (bannerFile) {
        formData.append("banner", bannerFile);
      }

      await axios.put(
        `${process.env.REACT_APP_API_URL}/api/hackathons/${hackathonId}/general-info`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Changes saved successfully");
    } catch (err) {
      console.error("Save failed:", err);
      alert("Failed to save changes");
    }
  };

  /* ================= DISCARD ================= */

  const handleDiscard = () => {
    if (!original) return;

    setName(original.name || "");
    setTheme(original.theme || "");
    setMode(original.mode || "online");
    setDescription(original.description || "");
    setBannerFile(null);
  };

  /* ================= UI ================= */

  return (
    <div className={styles.container}>
      <h2>General Information</h2>

      <p className={styles.subtitle}>
        Define the core identity and primary details of your hackathon.
      </p>

      <div className={styles.card}>
        <div className={styles.grid}>
          {/* LEFT */}
          <div className={styles.left}>
            <label>Hackathon Title</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label>Tagline</label>
            <input
              type="text"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
            />

            <label>Event Type</label>
            <select
              value={mode}
              onChange={(e) => setMode(e.target.value)}
            >
              <option value="online">Online</option>
              <option value="offline">Offline</option>
              <option value="hybrid">Hybrid</option>
            </select>
          </div>

          {/* RIGHT */}
          <div className={styles.right}>
            <label>Banner Image</label>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setBannerFile(e.target.files[0])}
            />

            <small>
              Recommended size 1200×400px (JPG, PNG, max 5MB)
            </small>
          </div>
        </div>

        {/* DESCRIPTION */}
        <div className={styles.description}>
          <label>Event Description</label>

          <textarea
            rows="8"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* FOOTER */}
        <div className={styles.footer}>
          <span className={styles.saved}>
            Changes will be saved to database
          </span>

          <div>
            <button
              className={styles.discard}
              onClick={handleDiscard}
            >
              Discard
            </button>

            <button
              className={styles.save}
              onClick={handleSave}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}