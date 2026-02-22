import { useState, useEffect } from "react";
import styles from "./RightPanel.module.css";
import { useSocket } from "./SocketContext";
import { fetchTeamMembers } from "./chatApi";
import { FaUser, FaCircle, FaTimes, FaCrown, FaEnvelope, FaComments } from "react-icons/fa";

export default function RightPanel({ chat, onClose, onStartDirectChat }) {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  
  const { isUserOnline, onlineUsers, getUser } = useSocket();
  const currentUser = getUser();

  // Fetch team members when chat changes
  useEffect(() => {
    if (chat?.type === "team" && chat?.id) {
      loadMembers();
    } else if (chat?.type === "hackathon" && chat?.id) {
      // For hackathon chats, we'll show team info
      setMembers([]);
      setLoading(false);
    } else if (chat?.type === "direct") {
      // For direct messages, show the other user
      setMembers([{
        userId: chat.otherUserId,
        name: chat.name,
        email: chat.otherUserEmail || "",
        role: "member"
      }]);
      setLoading(false);
    }
  }, [chat]);

  const loadMembers = async () => {
    try {
      setLoading(true);
      const response = await fetchTeamMembers(chat.id);
      if (response.success) {
        setMembers(response.members || []);
      }
    } catch (error) {
      console.error("Error loading team members:", error);
    } finally {
      setLoading(false);
    }
  };

  // Count online members
  const onlineCount = members.filter(m => isUserOnline(m.userId)).length;

  // Filter members by search
  const filteredMembers = members.filter(m => 
    m.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <aside className={styles.panel}>
      <div className={styles.header}>
        <h3>{chat?.type === "team" ? "Team Details" : "Chat Details"}</h3>
        <button className={styles.closeBtn} onClick={onClose}>
          <FaTimes />
        </button>
      </div>

      <input 
        className={styles.search} 
        placeholder="Search members..." 
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <h4 className={styles.sectionTitle}>
        {chat?.type === "team" ? "TEAM MEMBERS" : "PARTICIPANTS"}
        <span>{onlineCount} ONLINE</span>
      </h4>

      <div className={styles.memberList}>
        {loading ? (
          <div className={styles.loading}>Loading...</div>
        ) : filteredMembers.length === 0 ? (
          <div className={styles.empty}>No members found</div>
        ) : (
          filteredMembers.map((member) => {
            const isCurrentUser = member.userId === currentUser?.id || member.userId === currentUser?._id;
            return (
              <div key={member.userId} className={styles.member}>
                <div className={styles.memberAvatar}>
                  <FaUser />
                  <span 
                    className={`${styles.statusDot} ${
                      isUserOnline(member.userId) ? styles.online : styles.offline
                    }`}
                  >
                    <FaCircle size={8} />
                  </span>
                </div>
                
                <div className={styles.memberInfo}>
                  <p className={styles.name}>
                    {member.name}
                    {isCurrentUser && " (You)"}
                    {member.role === "leader" && (
                      <FaCrown className={styles.leaderIcon} title="Team Leader" />
                    )}
                  </p>
                  <span className={styles.email}>
                    <FaEnvelope size={10} /> {member.email}
                  </span>
                </div>
                
                <div className={styles.memberActions}>
                  {!isCurrentUser && onStartDirectChat && (
                    <button 
                      className={styles.chatBtn}
                      onClick={() => onStartDirectChat({
                        id: member.userId,
                        name: member.name,
                        type: "direct",
                        otherUserId: member.userId,
                        otherUserEmail: member.email
                      })}
                      title="Send direct message"
                    >
                      <FaComments size={14} />
                    </button>
                  )}
                  <span className={styles.status}>
                    {isUserOnline(member.userId) ? "Online" : "Offline"}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>

      {chat?.type === "team" && (
        <>
          <h4 className={styles.sectionTitle}>TEAM INFO</h4>
          <div className={styles.teamInfo}>
            <p><strong>Team:</strong> {chat.name}</p>
            {chat.hackathonName && (
              <p><strong>Hackathon:</strong> {chat.hackathonName}</p>
            )}
            <p><strong>Members:</strong> {members.length}</p>
          </div>
        </>
      )}

      {chat?.type === "hackathon" && (
        <>
          <h4 className={styles.sectionTitle}>HACKATHON INFO</h4>
          <div className={styles.teamInfo}>
            <p><strong>Hackathon:</strong> {chat.name}</p>
            {chat.theme && (
              <p><strong>Theme:</strong> {chat.theme}</p>
            )}
            <p>This is a group chat for all participants in this hackathon.</p>
          </div>
        </>
      )}
    </aside>
  );
}
