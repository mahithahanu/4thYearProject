import { useState, useEffect } from "react";
import { FaSearch, FaTimes, FaUser, FaUsers, FaCheck } from "react-icons/fa";
import styles from "./InviteMemberModal.module.css";
import { sendInvite, createTeam, fetchUserTeams } from "./chatApi";

export default function InviteMemberModal({ onClose, onInvite, selectedTeam }) {
  const [activeTab, setActiveTab] = useState("invite");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [teamName, setTeamName] = useState("");
  const [teams, setTeams] = useState([]);
  const [selectedTeamId, setSelectedTeamId] = useState(selectedTeam?.id || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Load user's teams for selection
  useEffect(() => {
    loadTeams();
  }, []);

  const loadTeams = async () => {
    try {
      const response = await fetchUserTeams();
      if (response.success) {
        setTeams(response.teams || []);
        // Auto-select if there's only one team or if selectedTeam is provided
        if (selectedTeam?.id) {
          setSelectedTeamId(selectedTeam.id);
        } else if (response.teams?.length === 1) {
          setSelectedTeamId(response.teams[0]._id);
        }
      }
    } catch (err) {
      console.error("Error loading teams:", err);
    }
  };

  const handleInvite = async () => {
    if (!email.trim()) {
      setError("Email is required");
      return;
    }
    
    if (!selectedTeamId) {
      setError("Please select a team");
      return;
    }
    
    setLoading(true);
    setError("");
    setSuccess("");
    
    try {
      const response = await sendInvite(selectedTeamId, email.trim(), message.trim());
      
      if (response.success) {
        setSuccess("Invite sent successfully!");
        setEmail("");
        setMessage("");
        
        // Callback and close after delay
        setTimeout(() => {
          onInvite?.(response.invite);
          onClose();
        }, 1500);
      }
    } catch (err) {
      setError(err.message || "Failed to send invite");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTeam = async () => {
    if (!teamName.trim()) {
      setError("Team name is required");
      return;
    }
    
    setLoading(true);
    setError("");
    setSuccess("");
    
    try {
      // Note: createTeam needs hackathonId - for now show info message
      setError("Please create teams from the hackathon page");
    } catch (err) {
      setError(err.message || "Failed to create team");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* HEADER */}
        <div className={styles.header}>
          <h3>{activeTab === "invite" ? "Invite Member to Team" : "Create Team"}</h3>
          <FaTimes onClick={onClose} className={styles.closeIcon} />
        </div>

        {/* TABS */}
        <div className={styles.tabs}>
          <button 
            className={activeTab === "invite" ? styles.activeTab : ""}
            onClick={() => { setActiveTab("invite"); setError(""); setSuccess(""); }}
          >
            <FaUser /> Invite Member
          </button>
          <button 
            className={activeTab === "create" ? styles.activeTab : ""}
            onClick={() => { setActiveTab("create"); setError(""); setSuccess(""); }}
          >
            <FaUsers /> Create Team
          </button>
        </div>

        {/* CONTENT */}
        <div className={styles.content}>
          {activeTab === "invite" ? (
            <>
              {/* Team Selection */}
              <div className={styles.inputGroup}>
                <label>Select Team *</label>
                <select
                  value={selectedTeamId}
                  onChange={(e) => setSelectedTeamId(e.target.value)}
                  className={styles.select}
                >
                  <option value="">-- Select a team --</option>
                  {teams.map(team => (
                    <option key={team._id} value={team._id}>
                      {team.name}
                    </option>
                  ))}
                </select>
                {teams.length === 0 && (
                  <p className={styles.hint}>You need to be part of a team to send invites</p>
                )}
              </div>
              
              <div className={styles.inputGroup}>
                <label>Email Address *</label>
                <input
                  type="email"
                  placeholder="Enter member's email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              
              <div className={styles.inputGroup}>
                <label>Message (Optional)</label>
                <textarea
                  placeholder="Add a personal message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={2}
                  className={styles.textarea}
                />
              </div>
            </>
          ) : (
            <>
              <div className={styles.inputGroup}>
                <label>Team Name *</label>
                <input
                  type="text"
                  placeholder="Enter team name..."
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                />
              </div>
              
              <p className={styles.hint}>
                Teams are created within hackathons. Go to a hackathon page to create a team.
              </p>
            </>
          )}

          {error && <p className={styles.error}>{error}</p>}
          {success && <p className={styles.success}><FaCheck /> {success}</p>}
        </div>

        {/* FOOTER */}
        <div className={styles.footer}>
          <button className={styles.cancel} onClick={onClose}>
            Cancel
          </button>
          <button 
            className={styles.submit} 
            onClick={activeTab === "invite" ? handleInvite : handleCreateTeam}
            disabled={loading || (activeTab === "invite" && teams.length === 0)}
          >
            {loading ? "Sending..." : activeTab === "invite" ? "Send Invite" : "Create Team"}
          </button>
        </div>
      </div>
    </div>
  );
}
