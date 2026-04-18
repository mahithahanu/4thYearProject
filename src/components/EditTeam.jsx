import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./EditTeamDetails.module.css";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import axios from "axios";

export default function EditTeamDetails() {

  const { id } = useParams();

  const [members, setMembers] = useState([]);
  const [teamName, setTeamName] = useState("");
  const [description, setDescription] = useState("");

  const [editingMember, setEditingMember] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: ""
  });

  const [deleteMember, setDeleteMember] = useState(null);

  /* ---------- FETCH TEAM DETAILS ---------- */

  useEffect(() => {

    const fetchTeam = async () => {

      try {

        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/editteam/${id}`
        );

        const team = res.data.team;

        setTeamName(team.name || "");
        setDescription(team.description || "");

        const formattedMembers = (team.members || []).map((m) => ({
          id: m.email, // use email as unique id
          name: m.name,
          email: m.email,
          role: m.role,
          skills: m.top_skills || []
        }));

        setMembers(formattedMembers);

      } catch (error) {

        console.error("Error fetching team:", error);

      }

    };

    if (id) fetchTeam();

  }, [id]);

  /* ---------- EDIT MEMBER ---------- */

  const handleEditClick = (member) => {

    setEditingMember(member.email);

    setFormData({
      name: member.name,
      email: member.email,
      role: member.role
    });

  };

  const handleSave = async () => {

    try {

      await axios.put(
        `${process.env.REACT_APP_API_URL}/api/editteam/${id}/member/${formData.email}`,
        {
          name: formData.name,
          role: formData.role
        }
      );

      setMembers((prev) =>
        prev.map((m) =>
          m.email === formData.email
            ? { ...m, name: formData.name, role: formData.role }
            : m
        )
      );

      setEditingMember(null);

    } catch (error) {

      console.error("Error updating member:", error);

      alert("Failed to update member");

    }

  };

  /* ---------- DELETE MEMBER ---------- */

  const confirmDelete = async () => {

    try {

      await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/editteam/${id}/member/${deleteMember}`
      );

      setMembers((prev) =>
        prev.filter((m) => m.email !== deleteMember)
      );

      setDeleteMember(null);

    } catch (error) {

      console.error("Error deleting member:", error);

      alert("Failed to delete member");

    }

  };

  /* ---------- FOOTER ACTIONS ---------- */

  const handleCancelChanges = () => {
    window.location.reload();
  };

  const handleSaveChanges = async () => {

    try {

      await axios.put(
        `${process.env.REACT_APP_API_URL}/api/editteam/${id}`,
        {
          name: teamName,
          description: description
        }
      );

      alert("Team updated successfully");

    } catch (error) {

      console.error("Error updating team:", error);

      alert("Failed to update team");

    }

  };

  return (

    <div className={styles.page}>

      <div className={styles.card}>

        <h1>Edit Team Details</h1>

        <p className={styles.sub}>
          Update your team’s core information and manage your collaborative roster.
        </p>

        {/* ---------- GENERAL INFO ---------- */}

        <section className={styles.section}>

          <h3>General Information</h3>

          <label>Team Name</label>

          <input
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
          />

          <label>Team Description</label>

          <textarea
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

        </section>

        {/* ---------- MEMBERS ---------- */}

        <section className={styles.section}>

          <h3>Manage Members</h3>

          {members.map((m) => (

            <div key={m.email} className={styles.memberCard}>

              <div className={styles.memberLeft}>

                <div className={styles.avatarCircle}>
                  {m.name?.charAt(0)}
                </div>

                <div>
                  <p className={styles.name}>{m.name}</p>
                  <span className={styles.role}>{m.role}</span>
                </div>

              </div>

              <div className={styles.skills}>

                {m.skills.map((s, index) => (
                  <span key={index} className={styles.skill}>
                    {s}
                  </span>
                ))}

              </div>

              <div className={styles.actions}>

                <span className={styles.actionIcons}>

                  <FiEdit2
                    size={16}
                    style={{ transform: "scaleX(-1)" }}
                    className={styles.icon}
                    onClick={() => handleEditClick(m)}
                  />

                  <FiTrash2
                    size={16}
                    style={{ transform: "scaleX(-1)" }}
                    className={styles.icon}
                    onClick={() => setDeleteMember(m.email)}
                  />

                </span>

              </div>

            </div>

          ))}

        </section>

        {/* ---------- EDIT MODAL ---------- */}

        {editingMember && (

          <div className={styles.modalOverlay}>

            <div className={styles.modal}>

              <h3>Edit Member</h3>

              <label>Name</label>

              <input
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />

              <label>Email</label>

              <input value={formData.email} disabled />

              <label>Role</label>

              <input
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
              />

              <div className={styles.modalActions}>

                <button
                  className={styles.cancel}
                  onClick={() => setEditingMember(null)}
                >
                  Cancel
                </button>

                <button
                  className={styles.save}
                  onClick={handleSave}
                >
                  Save
                </button>

              </div>

            </div>

          </div>

        )}

        {/* ---------- DELETE MODAL ---------- */}

        {deleteMember && (

          <div className={styles.modalOverlay}>

            <div className={styles.modal}>

              <h3>Delete Member</h3>

              <p>
                Are you sure you want to delete this member?
                This action cannot be undone.
              </p>

              <div className={styles.modalActions}>

                <button
                  className={styles.cancel}
                  onClick={() => setDeleteMember(null)}
                >
                  Cancel
                </button>

                <button
                  className={styles.save}
                  onClick={confirmDelete}
                >
                  Delete
                </button>

              </div>

            </div>

          </div>

        )}

        {/* ---------- FOOTER ---------- */}

        <div className={styles.footer}>

          <button
            className={styles.cancel}
            onClick={handleCancelChanges}
          >
            Cancel
          </button>

          <button
            className={styles.save}
            onClick={handleSaveChanges}
          >
            Save Changes
          </button>

        </div>

      </div>

    </div>

  );

}