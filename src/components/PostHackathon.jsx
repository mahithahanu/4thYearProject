import { useState } from "react";
import styles from "./PostHackathon.module.css";
import { useEffect } from "react";

export default function PostHackathon() {
  const [type, setType] = useState("");
  const [mode, setMode] = useState("online");
  const [loading, setLoading] = useState(false);

  const [ruleType, setRuleType] = useState("text");
  const [banner, setBanner] = useState(null);
  const [rulesPdf, setRulesPdf] = useState(null);
  const [participantsPdf, setParticipantsPdf] = useState(null); // ✅ NEW

  const [formData, setFormData] = useState({
    name: "",
    organizer: "",
    location: "",
    theme: "",
    skill1: "",
    skill2: "",
    registrationStart: "",
    registrationEnd: "",
    hackathonStart: "",
    hackathonEnd: "",
    teamSize: "",
    difficulty: "",
    audience: "",
    eligibilityText: "",
    rulesText: "",
  });

   useEffect(() => {
    const userName = localStorage.getItem("userName");
    if (userName) {
      setFormData((prev) => ({
        ...prev,
        organizer: userName,
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCancel = () => {
    setType("");
    setMode("online");
    setRuleType("text");
    setBanner(null);
    setRulesPdf(null);
    setParticipantsPdf(null); // ✅ NEW
    setFormData({
      name: "",
      organizer: "",
      location: "",
      theme: "",
      skill1: "",
      skill2: "",
      registrationStart: "",
      registrationEnd: "",
      hackathonStart: "",
      hackathonEnd: "",
      teamSize: "",
      difficulty: "",
      audience: "",
      eligibilityText: "",
      rulesText: "",
    });
  };

  /* ================= PUBLISH ================= */
const handlePublish = async () => {
  if (!type || !formData.name || !formData.theme) {
    alert("Please fill all required fields");
    return;
  }

  if (!banner) {
    alert("Please upload a banner image");
    return;
  }

  if (type === "private" && !participantsPdf) {
    alert("Please upload participants PDF for private hackathon");
    return;
  }

  if (ruleType === "pdf" && !rulesPdf) {
    alert("Please upload rules PDF");
    return;
  }

  if (ruleType === "text" && !formData.rulesText) {
    alert("Please enter rules");
    return;
  }

  const token = localStorage.getItem("token");
  const organizerEmail = localStorage.getItem("userEmail"); // ✅ from localStorage

  if (!token || !organizerEmail) {
    alert("Please login again");
    return;
  }

  const payload = new FormData();

  payload.append("type", type);
  payload.append("mode", mode);
  payload.append("name", formData.name);
  payload.append("organizer", formData.organizer); // ✅ organizer name
  payload.append("organizerEmail", organizerEmail); // ✅ organizer email
  payload.append("location", mode === "offline" ? formData.location : "");
  payload.append("theme", formData.theme);

  payload.append(
    "skills",
    JSON.stringify([formData.skill1, formData.skill2].filter(Boolean))
  );

  payload.append("registrationStart", formData.registrationStart);
  payload.append("registrationEnd", formData.registrationEnd);
  payload.append("hackathonStart", formData.hackathonStart);
  payload.append("hackathonEnd", formData.hackathonEnd);
  payload.append("teamSize", Number(formData.teamSize));
  payload.append("difficulty", formData.difficulty);
  payload.append("audience", formData.audience);

  if (type === "public") {
    payload.append("eligibilityText", formData.eligibilityText);
  }

  payload.append("banner", banner);
  payload.append("ruleType", ruleType);

  if (ruleType === "text") {
    payload.append("rulesText", formData.rulesText);
  } else {
    payload.append("rulesPdf", rulesPdf);
  }

  if (type === "private") {
    payload.append("participantsPdf", participantsPdf);
  }

  try {
    setLoading(true);

    const res = await fetch("http://localhost:8003/api/hackathons", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: payload,
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message);

    alert("Hackathon published successfully 🎉");
    handleCancel();
  } catch (err) {
    alert(err.message || "Error publishing hackathon");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className={styles.page}>
      <h2 className={styles.title}>Hackathon Details</h2>

      <div className={styles.typeWrapper}>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="">Select type</option>
          <option value="public">Public Hackathon</option>
          <option value="private">Private Hackathon</option>
        </select>
      </div>

      {(type === "public" || type === "private") && (
        <div className={styles.card}>
          <div className={styles.grid}>
            {/* LEFT COLUMN */}
            <div className={styles.col}>
              <label>Hackathon Name *</label>
              <input name="name" value={formData.name} onChange={handleChange} />

              <label>Organizer Name *</label>
              <input name="organizer" value={formData.organizer} onChange={handleChange} />

              <label>Banner Image *</label>
              <input type="file" accept="image/*" onChange={(e) => setBanner(e.target.files[0])} />

              {/* ✅ PRIVATE PARTICIPANTS PDF */}
              {type === "private" && (
                <>
                  <label>Allowed Participants (PDF) *</label>
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => setParticipantsPdf(e.target.files[0])}
                  />
                </>
              )}

              <label>Mode *</label>
              <div className={styles.mode}>
                <label>
                  <input type="radio" checked={mode === "online"} onChange={() => setMode("online")} />
                  Online
                </label>
                <label>
                  <input type="radio" checked={mode === "offline"} onChange={() => setMode("offline")} />
                  Offline
                </label>
              </div>

              {mode === "offline" && (
                <>
                  <label>Location *</label>
                  <input name="location" value={formData.location} onChange={handleChange} />
                </>
              )}

              <label>Theme *</label>
              <select name="theme" value={formData.theme} onChange={handleChange}>
                <option value="">Select theme</option>
                <option>AI / ML</option>
                <option>Web Development</option>
                <option>Cloud</option>
                <option>Blockchain</option>
              </select>

              <label>Skills Required *</label>
              <div className={styles.skillRow}>
                <input name="skill1" placeholder="Skill 1" onChange={handleChange} />
                <input name="skill2" placeholder="Skill 2" onChange={handleChange} />
              </div>

              <label>Registration Start *</label>
              <div className={styles.dateTimeRow}>
                <input type="date" name="registrationStart" onChange={handleChange} />
                <input type="time" />
              </div>

              <label>Registration End *</label>
              <div className={styles.dateTimeRow}>
                <input type="date" name="registrationEnd" onChange={handleChange} />
                <input type="time" />
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className={styles.col}>
              <label>Hackathon Start *</label>
              <div className={styles.dateTimeRow}>
                <input type="date" name="hackathonStart" onChange={handleChange} />
                <input type="time" />
              </div>

              <label>Hackathon End *</label>
              <div className={styles.dateTimeRow}>
                <input type="date" name="hackathonEnd" onChange={handleChange} />
                <input type="time" />
              </div>

              <label>Rules *</label>
              <select value={ruleType} onChange={(e) => setRuleType(e.target.value)}>
                <option value="text">Type Rules</option>
                <option value="pdf">Upload PDF</option>
              </select>

              {ruleType === "text" ? (
                <textarea
                  name="rulesText"
                  placeholder="Enter rules here..."
                  value={formData.rulesText}
                  onChange={handleChange}
                />
              ) : (
                <input type="file" accept="application/pdf" onChange={(e) => setRulesPdf(e.target.files[0])} />
              )}

              <label>Team Size *</label>
              <input type="number" name="teamSize" onChange={handleChange} />

              <label>Difficulty</label>
              <select name="difficulty" onChange={handleChange}>
                <option value="">Select</option>
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>

              {type === "public" && (
                <>
                  <label>Eligibility *</label>
                  <textarea name="eligibilityText" onChange={handleChange} />
                </>
              )}
            </div>
          </div>

          <div className={styles.actions}>
            <button className={styles.cancel} onClick={handleCancel}>
              Cancel
            </button>
            <button className={styles.publish} onClick={handlePublish} disabled={loading}>
              {loading ? "Publishing..." : "Publish Hackathon"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
