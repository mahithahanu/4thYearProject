import { useState } from "react";
import styles from "./EditTeamDetails.module.css";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

const initialMembers = [
  {
    id: "JD",
    name: "John Doe",
    email: "john.doe@skillsync.com",
    role: "LEAD DESIGNER",
    skills: ["UI", "UX", "FIGMA"],
  },
  {
    id: "JS",
    name: "Jane Smith",
    email: "jane.smith@skillsync.com",
    role: "SENIOR DEV",
    skills: ["REACT", "TYPESCRIPT"],
  },
  {
    id: "MA",
    name: "Marcus Aurelius",
    email: "marcus.a@skillsync.com",
    role: "QA ENGINEER",
    skills: ["CYPRESS", "JEST"],
  },
];

export default function EditTeamDetails() {
  const [members, setMembers] = useState(initialMembers);

  // edit states
  const [editingMember, setEditingMember] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
  });

  // delete states
  const [deleteMember, setDeleteMember] = useState(null);

  /* ---------- EDIT ---------- */
  const handleEditClick = (member) => {
    setEditingMember(member.id);
    setFormData({
      name: member.name,
      email: member.email,
      role: member.role,
    });
  };

  const handleSave = () => {
    setMembers((prev) =>
      prev.map((m) =>
        m.id === editingMember ? { ...m, ...formData } : m
      )
    );
    setEditingMember(null);
  };

  /* ---------- DELETE ---------- */
  const confirmDelete = () => {
    setMembers((prev) => prev.filter((m) => m.id !== deleteMember));
    setDeleteMember(null);
  };

  /* ---------- FOOTER ACTIONS ---------- */
  const handleCancelChanges = () => {
    setMembers(initialMembers);     // reset members
    setEditingMember(null);         // close edit modal
    setDeleteMember(null);          // close delete modal
    setFormData({ name: "", email: "", role: "" });
  };

  const handleSaveChanges = () => {
    console.log("Final team data:", members);
    alert("Team changes saved successfully!");
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1>Edit Team Details</h1>
        <p className={styles.sub}>
          Update your team’s core information and manage your collaborative roster.
        </p>

        {/* General Info */}
        <section className={styles.section}>
          <h3>General Information</h3>

          <label>Team Name</label>
          <input value="Frontend Avengers" readOnly />

          <label>Team Description</label>
          <textarea
            rows="3"
            value="Responsible for the SkillSync UI/UX overhaul and design system maintenance."
            readOnly
          />
        </section>

        {/* Members */}
        <section className={styles.section}>
          <h3>Manage Members</h3>

          {members.map((m) => (
            <div key={m.id} className={styles.memberCard}>
              <div className={styles.memberLeft}>
                <div className={styles.avatarCircle}>{m.id}</div>
                <div>
                  <p className={styles.name}>{m.name}</p>
                  <span className={styles.role}>{m.role}</span>
                </div>
              </div>

              <div className={styles.skills}>
                {m.skills.map((s) => (
                  <span key={s} className={styles.skill}>
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
                    onClick={() => setDeleteMember(m.id)}
                  />
                </span>
              </div>
            </div>
          ))}
        </section>

        {/* EDIT MODAL */}
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
              <input
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />

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
                <button className={styles.save} onClick={handleSave}>
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {/* DELETE CONFIRM MODAL */}
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
                <button className={styles.save} onClick={confirmDelete}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
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