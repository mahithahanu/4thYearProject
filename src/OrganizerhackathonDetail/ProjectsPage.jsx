import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./ProjectsPage.module.css";
import { Pencil, Trash2, Search } from "lucide-react";

export default function OrganizerProjectsPage() {
  const { hackathonId } = useParams();

  /* ---------------- PROJECT LIST ---------------- */

  const [projects, setProjects] = useState([]);

  /* ---------------- FORM VISIBILITY ---------------- */

  const [showForm, setShowForm] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  /* ---------------- FORM STATES ---------------- */

  const [projectName, setProjectName] = useState("");
  const [techStack, setTechStack] = useState("");
  const [organizerName, setOrganizerName] = useState("");
  const [status, setStatus] = useState("Draft");
  const [submissionDate, setSubmissionDate] = useState("");
  const [description, setDescription] = useState("");
  const [banner, setBanner] = useState(null);

  /* ---------------- PARTICIPANT BENEFITS STATE ---------------- */

  const [certificates, setCertificates] = useState([]);
  const [cashPrize, setCashPrize] = useState(false);
  const [prizes, setPrizes] = useState([
    { title: "First Prize", amount: "" },
  ]);

  const certificateOptions = [
    "Participation Certificate",
    "Winner Certificate",
    "Finalist Certificate",
    "Special Category Certificate",
  ];

  const toggleCertificate = (cert) => {
    setCertificates((prev) =>
      prev.includes(cert)
        ? prev.filter((c) => c !== cert)
        : [...prev, cert]
    );
  };

  const addPrize = () => {
    setPrizes([...prizes, { title: "", amount: "" }]);
  };

  const updatePrize = (index, field, value) => {
    const updated = [...prizes];
    updated[index][field] = value;
    setPrizes(updated);
  };

  /* ---------------- LOAD PROJECTS ---------------- */

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/projects/my-projects`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const filtered = res.data.filter(
        (p) => p.hackathonId?._id === hackathonId
      );

      setProjects(filtered);
    } catch (err) {
      console.error(err);
    }
  };

  /* ---------------- CREATE PROJECT ---------------- */

  const handleSaveProject = async () => {
  try {
    const token = localStorage.getItem("token");

    const benefits = {
      certificates: {
        participation: certificates.includes("Participation Certificate"),
        winner: certificates.includes("Winner Certificate"),
      },
      cashPrize: {
        enabled: cashPrize,
        prizes: cashPrize
          ? prizes.map((p) => ({
              position: p.title,
              amount: Number(p.amount),
            }))
          : [],
      },
    };

    const statusMap = {
      Draft: "draft",
      "In Review": "published",
      Finished: "closed",
    };

    const formData = new FormData();

    formData.append("hackathonId", hackathonId);
    formData.append("projectName", projectName);
    formData.append("description", description);
    formData.append("status", statusMap[status]);

    formData.append(
      "techStack",
      JSON.stringify(
        techStack.split(",").map((t) => t.trim()).filter(Boolean)
      )
    );

    formData.append(
      "submissionDeadline",
      submissionDate
        ? new Date(submissionDate).toISOString()
        : null
    );

    formData.append("benefits", JSON.stringify(benefits));

    if (banner) {
      formData.append("banner", banner);
    }

    await axios.post(
      `${process.env.REACT_APP_API_URL}/api/projects`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    alert("Project created successfully 🎉");

    fetchProjects();
    setShowForm(false);
    setSubmitted(true);

  } catch (err) {
    console.error(err.response?.data || err);
    alert("Error creating project ❌");
  }
};

  /* ---------------- UI ---------------- */

  return (
    <div className={styles.container}>
      {/* HEADER */}
      <div className={styles.header}>
        <div>
          <h2>Hackathon Projects</h2>
          <p>Manage submitted projects and team information.</p>
        </div>

        <button
          className={styles.addBtn}
          onClick={() => {
            setShowForm(true);
            setSubmitted(false);
          }}
        >
          + Add New Project
        </button>
      </div>

      {/* ⭐ FORM / SUCCESS CARD */}
      {showForm ? (
        <div className={styles.card}>
          <h3>Submit New Project</h3>

          <div className={styles.formGrid}>
            {/* Project Name */}
            <div>
              <label>Project Name</label>
              <input
                placeholder="Enter project title"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              />
            </div>

            {/* Tech Stack */}
            <div>
              <label>Tech Stack</label>
              <input
                placeholder="React, Node.js, Python..."
                value={techStack}
                onChange={(e) => setTechStack(e.target.value)}
              />
            </div>

            {/* Organizer Name */}
            <div>
              <label>Organizer Name</label>
              <input
                placeholder="Organization name"
                value={organizerName}
                onChange={(e) =>
                  setOrganizerName(e.target.value)
                }
              />
            </div>

            {/* Status */}
            <div>
              <label>Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option>Draft</option>
                <option>In Review</option>
                <option>Finished</option>
              </select>
            </div>

            {/* Submission Date */}
            <div>
              <label>Submission Date & Time</label>
              <input
                type="datetime-local"
                value={submissionDate}
                onChange={(e) =>
                  setSubmissionDate(e.target.value)
                }
              />
            </div>

            {/* Description */}
            <div style={{ gridColumn: "1 / -1" }}>
              <label>Description</label>
              <textarea
                placeholder="Project description..."
                value={description}
                onChange={(e) =>
                  setDescription(e.target.value)
                }
              />
            </div>

            {/* Banner Upload */}
            <div>
              <label>Project Banner</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setBanner(e.target.files[0])}
              />
            </div>

            {/* PARTICIPANT BENEFITS */}
            <div style={{ gridColumn: "1 / -1" }}>
              <label>Participant Benefits</label>

              <div className={styles.benefitBox}>
                <strong>Certificates</strong>

                {certificateOptions.map((cert) => (
                  <label
                    key={cert}
                    className={styles.checkbox}
                  >
                    {cert}
                    <input
                      type="checkbox"
                      checked={certificates.includes(cert)}
                      onChange={() =>
                        toggleCertificate(cert)
                      }
                    />
                  </label>
                ))}
              </div>

              <div className={styles.benefitBox}>
                <strong>Cash Prize Offered?</strong>

                <label style={{ marginLeft: "12px" }}>
                  No
                  <input
                    type="radio"
                    name="cashPrize"
                    checked={!cashPrize}
                    onChange={() => setCashPrize(false)}
                  />
                </label>

                <label style={{ marginLeft: "12px" }}>
                  Yes
                  <input
                    type="radio"
                    name="cashPrize"
                    checked={cashPrize}
                    onChange={() => setCashPrize(true)}
                  />
                </label>
              </div>

              {cashPrize && (
                <div className={styles.benefitBox}>
                  <strong>Prize Distribution</strong>

                  {prizes.map((p, i) => (
                    <div
                      key={i}
                      className={styles.prizeRow}
                    >
                      <input
                        placeholder="Prize Title"
                        value={p.title}
                        onChange={(e) =>
                          updatePrize(
                            i,
                            "title",
                            e.target.value
                          )
                        }
                      />

                      <input
                        type="number"
                        placeholder="Amount"
                        value={p.amount}
                        onChange={(e) =>
                          updatePrize(
                            i,
                            "amount",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  ))}

                  <button
                    type="button"
                    className={styles.addPrizeBtn}
                    onClick={addPrize}
                  >
                    + Add Another Prize
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className={styles.formActions}>
            <button className={styles.clearBtn}>
              Clear
            </button>
            <button
              className={styles.saveBtn}
              onClick={handleSaveProject}
            >
              Save Project
            </button>
          </div>
        </div>
      ) : submitted ? (
        <div className={styles.successCard}>
          ✅ Project submitted successfully
        </div>
      ) : null}

      {/* EXISTING PROJECTS TABLE */}
      <div className={styles.card}>
        <div className={styles.tableHeader}>
          <h3>Existing Projects</h3>

          <div className={styles.searchBox}>
            <Search size={16} />
            <input placeholder="Search projects..." />
          </div>
        </div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>PROJECT NAME</th>
              <th>TEAM</th>
              <th>TECH STACK</th>
              <th>STATUS</th>
              <th>ACTIONS</th>
            </tr>
          </thead>

          <tbody>
            {projects.map((project) => (
              <tr key={project._id}>
                <td>
                  <strong>{project.projectName}</strong>
                </td>

                <td>{project.organizerEmail}</td>

                <td>
                  {project.techStack.map((t, i) => (
                    <span
                      key={i}
                      className={styles.techTag}
                    >
                      {t}
                    </span>
                  ))}
                </td>

                <td>
                  <span
                    className={`${styles.status} ${styles.finished}`}
                  >
                    {project.status}
                  </span>
                </td>

                <td>
                  <button className={styles.iconBtn}>
                    <Pencil size={16} />
                  </button>
                  <button className={styles.iconBtn}>
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}