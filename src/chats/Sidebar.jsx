import { useState, useEffect, useCallback } from "react";
import styles from "./Sidebar.module.css";
import InviteMemberModal from "./InviteMemberModal";
import { useSocket } from "./SocketContext";
import { fetchConversations, fetchTeamMembers, fetchMyInvites, acceptInvite, declineInvite, searchUsers, fetchAllUsers } from "./chatApi";
import { FaUsers, FaUser, FaCircle, FaSearch, FaPlus, FaEnvelope, FaCheck, FaTimes, FaUserPlus, FaTrophy } from "react-icons/fa";

export default function Sidebar({ onSelectChat, selectedChat }) {
  const [activeTab, setActiveTab] = useState("messages");
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [invites, setInvites] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [processingInvite, setProcessingInvite] = useState(null);
  
  const { isConnected, isUserOnline, socket } = useSocket();

  // Fetch conversations and invites on mount
  useEffect(() => {
    loadConversations();
    loadInvites();
  }, []);

  // Load all users when "find" tab is active
  useEffect(() => {
    if (activeTab === "find" && allUsers.length === 0) {
      loadAllUsers();
    }
  }, [activeTab]);

  // Debounced search for users
  useEffect(() => {
    if (activeTab === "find" && searchQuery.length >= 2) {
      const timer = setTimeout(() => {
        handleUserSearch(searchQuery);
      }, 300);
      return () => clearTimeout(timer);
    } else if (activeTab === "find" && searchQuery.length === 0) {
      setSearchResults([]);
    }
  }, [searchQuery, activeTab]);

  // Load all users
  const loadAllUsers = async () => {
    try {
      setSearchLoading(true);
      const data = await fetchAllUsers();
      if (data.success) {
        setAllUsers(data.users || []);
      }
    } catch (error) {
      console.error("Error loading users:", error);
    } finally {
      setSearchLoading(false);
    }
  };

  // Search users by name/email
  const handleUserSearch = async (query) => {
    try {
      setSearchLoading(true);
      const data = await searchUsers(query);
      if (data.success) {
        setSearchResults(data.users || []);
      }
    } catch (error) {
      console.error("Error searching users:", error);
    } finally {
      setSearchLoading(false);
    }
  };

  // Listen for new invites via socket
  useEffect(() => {
    if (socket) {
      const handleNewInvite = (data) => {
        // Reload invites when a new one arrives
        loadInvites();
      };
      
      socket.on("new_invite", handleNewInvite);
      
      return () => {
        socket.off("new_invite", handleNewInvite);
      };
    }
  }, [socket]);

  // Load invites from API
  const loadInvites = async () => {
    try {
      const data = await fetchMyInvites();
      if (data.success) {
        setInvites(data.invites || []);
      }
    } catch (error) {
      console.error("Error loading invites:", error);
    }
  };

  // Load conversations from API
  const loadConversations = async () => {
    try {
      setLoading(true);
      const data = await fetchConversations();
      if (data.success) {
        setConversations(data.conversations || []);
        
        // Extract unique team members from all teams
        const allMembers = [];
        const seenEmails = new Set();
        
        for (const conv of data.teams || []) {
          if (conv.id) {
            try {
              const membersData = await fetchTeamMembers(conv.id);
              if (membersData.success) {
                for (const member of membersData.members || []) {
                  if (!seenEmails.has(member.email)) {
                    seenEmails.add(member.email);
                    allMembers.push({
                      id: member.userId,
                      name: member.name,
                      email: member.email,
                      role: member.role,
                      teamId: conv.id,
                      teamName: conv.name
                    });
                  }
                }
              }
            } catch (e) {
              console.error("Error fetching team members:", e);
            }
          }
        }
        
        setTeamMembers(allMembers);
      }
    } catch (error) {
      console.error("Error loading conversations:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle accept invite
  const handleAcceptInvite = async (inviteId) => {
    try {
      setProcessingInvite(inviteId);
      const response = await acceptInvite(inviteId);
      if (response.success) {
        // Remove from invites list
        setInvites(prev => prev.filter(inv => inv._id !== inviteId));
        // Reload conversations to show the new team
        loadConversations();
      }
    } catch (error) {
      console.error("Error accepting invite:", error);
      alert(error.message || "Failed to accept invite");
    } finally {
      setProcessingInvite(null);
    }
  };

  // Handle decline invite
  const handleDeclineInvite = async (inviteId) => {
    try {
      setProcessingInvite(inviteId);
      const response = await declineInvite(inviteId);
      if (response.success) {
        setInvites(prev => prev.filter(inv => inv._id !== inviteId));
      }
    } catch (error) {
      console.error("Error declining invite:", error);
      alert(error.message || "Failed to decline invite");
    } finally {
      setProcessingInvite(null);
    }
  };

  // Filter based on active tab
  const getFilteredList = () => {
    if (activeTab === "messages") {
      return conversations.filter(c => 
        c.name?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    } else if (activeTab === "members") {
      return teamMembers.filter(m => 
        m.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.email?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return [];
  };

  const filteredList = getFilteredList();

  // Handle chat selection
  const handleSelectChat = (item) => {
    if (activeTab === "messages") {
      onSelectChat({
        id: item.id,
        roomId: item.roomId,
        name: item.name,
        type: item.type,
        memberCount: item.memberCount,
        hackathonName: item.hackathonName,
        hackathonId: item.hackathonId,
        theme: item.theme,
        otherUserId: item.otherUserId,
        otherUserEmail: item.otherUserEmail
      });
    } else if (activeTab === "find") {
      // Start direct message with found user
      onSelectChat({
        id: item._id,
        roomId: null,
        name: item.name,
        type: "direct",
        otherUserId: item._id,
        otherUserEmail: item.email
      });
      // Switch to messages tab after selecting
      setActiveTab("messages");
    } else {
      // Direct message with team member
      onSelectChat({
        id: item.id,
        roomId: null,
        name: item.name,
        type: "direct",
        otherUserId: item.id,
        otherUserEmail: item.email
      });
    }
  };

  // Format last message time
  const formatTime = (dateString) => {
    if (!dateString) return "";
    
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    
    if (diff < 60000) return "Just now";
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) {
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    }
    if (diff < 604800000) {
      return date.toLocaleDateString([], { weekday: "short" });
    }
    return date.toLocaleDateString([], { month: "short", day: "numeric" });
  };

  return (
    <>
      <aside className={styles.sidebar}>
        {/* LOGO */}
        <div className={styles.logo}>
          <div className={styles.logoIcon}>▦</div>
          <div>
            <h3>SkillMatrix</h3>
            <span>PLATFORM</span>
          </div>
          <div className={`${styles.connectionStatus} ${isConnected ? styles.connected : styles.disconnected}`}>
            <FaCircle size={8} />
          </div>
        </div>

        {/* CREATE/INVITE BUTTON */}
        <button
          className={styles.newMsg}
          onClick={() => setShowInviteModal(true)}
        >
          <FaPlus size={12} /> 
          {activeTab === "messages" ? "New Chat" : "Invite Member"}
        </button>

        {/* SEARCH */}
        <div className={styles.searchBox}>
          <FaSearch className={styles.searchIcon} />
          <input 
            type="text"
            placeholder={
              activeTab === "find" 
                ? "Search by name or email..." 
                : activeTab === "invites" 
                  ? "Search invites..." 
                  : activeTab === "messages" 
                    ? "Search chats..." 
                    : "Search members..."
            }
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* TABS */}
        <div className={styles.tabs}>
          <span
            className={activeTab === "messages" ? styles.active : ""}
            onClick={() => setActiveTab("messages")}
          >
            <FaUsers size={14} /> Chats
          </span>
          <span
            className={activeTab === "find" ? styles.active : ""}
            onClick={() => setActiveTab("find")}
          >
            <FaUserPlus size={14} /> Find
          </span>
          <span
            className={activeTab === "invites" ? styles.active : ""}
            onClick={() => { setActiveTab("invites"); loadInvites(); }}
          >
            <FaEnvelope size={14} /> 
            {invites.length > 0 && (
              <span className={styles.badge}>{invites.length}</span>
            )}
          </span>
        </div>

        {/* LIST */}
        <div className={styles.chatList}>
          {loading && activeTab !== "invites" && activeTab !== "find" ? (
            <div className={styles.loading}>Loading...</div>
          ) : activeTab === "find" ? (
            // FIND USERS TAB
            searchLoading ? (
              <div className={styles.loading}>Searching...</div>
            ) : searchQuery.length === 0 ? (
              // Show all users when no search
              allUsers.length === 0 ? (
                <div className={styles.empty}>
                  <FaUserPlus size={24} style={{ opacity: 0.3, marginBottom: 10 }} />
                  <p>Loading users...</p>
                </div>
              ) : (
                allUsers.map(user => (
                  <div
                    key={user._id}
                    className={styles.chatItem}
                    onClick={() => handleSelectChat(user)}
                  >
                    <div className={styles.avatar}>
                      <FaUser />
                      {isUserOnline(user._id) && (
                        <span className={styles.onlineIndicator}></span>
                      )}
                    </div>
                    <div className={styles.chatInfo}>
                      <h4>{user.name}</h4>
                      <p>{user.email}</p>
                    </div>
                    <span className={styles.roleTag}>{user.role}</span>
                  </div>
                ))
              )
            ) : searchQuery.length < 2 ? (
              <div className={styles.empty}>
                <p>Type at least 2 characters to search</p>
              </div>
            ) : searchResults.length === 0 ? (
              <div className={styles.empty}>
                <p>No users found</p>
              </div>
            ) : (
              searchResults.map(user => (
                <div
                  key={user._id}
                  className={styles.chatItem}
                  onClick={() => handleSelectChat(user)}
                >
                  <div className={styles.avatar}>
                    <FaUser />
                    {isUserOnline(user._id) && (
                      <span className={styles.onlineIndicator}></span>
                    )}
                  </div>
                  <div className={styles.chatInfo}>
                    <h4>{user.name}</h4>
                    <p>{user.email}</p>
                  </div>
                  <span className={styles.roleTag}>{user.role}</span>
                </div>
              ))
            )
          ) : activeTab === "invites" ? (
            // INVITES TAB
            invites.length === 0 ? (
              <div className={styles.empty}>
                <FaEnvelope size={24} style={{ opacity: 0.3, marginBottom: 10 }} />
                <p>No pending invites</p>
              </div>
            ) : (
              invites.map(invite => (
                <div key={invite._id} className={styles.inviteItem}>
                  <div className={styles.inviteInfo}>
                    <h4>{invite.teamName}</h4>
                    <p>From: {invite.senderName}</p>
                    {invite.hackathonName && (
                      <span className={styles.hackathonTag}>{invite.hackathonName}</span>
                    )}
                    {invite.message && (
                      <p className={styles.inviteMessage}>"{invite.message}"</p>
                    )}
                  </div>
                  <div className={styles.inviteActions}>
                    <button
                      className={styles.acceptBtn}
                      onClick={() => handleAcceptInvite(invite._id)}
                      disabled={processingInvite === invite._id}
                    >
                      <FaCheck />
                    </button>
                    <button
                      className={styles.declineBtn}
                      onClick={() => handleDeclineInvite(invite._id)}
                      disabled={processingInvite === invite._id}
                    >
                      <FaTimes />
                    </button>
                  </div>
                </div>
              ))
            )
          ) : filteredList.length === 0 ? (
            <div className={styles.empty}>
              {activeTab === "messages" 
                ? "No conversations yet" 
                : "No team members found"}
            </div>
          ) : (
            filteredList.map(item => (
              <div
                key={item.id}
                className={`${styles.chatItem} ${
                  selectedChat?.id === item.id ? styles.activeChat : ""
                }`}
                onClick={() => handleSelectChat(item)}
              >
                <div className={styles.avatar}>
                  {activeTab === "members" ? (
                    <>
                      <FaUser />
                      {isUserOnline(item.id) && (
                        <span className={styles.onlineIndicator}></span>
                      )}
                    </>
                  ) : item.type === "team" ? (
                    <FaUsers />
                  ) : item.type === "hackathon" ? (
                    <FaTrophy />
                  ) : (
                    <FaUser />
                  )}
                </div>

                <div className={styles.chatInfo}>
                  <h4>{item.name}</h4>
                  <p>
                    {activeTab === "members" 
                      ? (isUserOnline(item.id) ? "Online" : item.teamName || "Offline")
                      : item.type === "team" 
                        ? `${item.memberCount || 0} members` 
                        : item.type === "hackathon"
                          ? item.theme || "Hackathon Chat"
                          : item.lastMessage || "Start a conversation"}
                  </p>
                </div>

                <span className={styles.time}>
                  {activeTab === "messages" && formatTime(item.updatedAt)}
                </span>
              </div>
            ))
          )}
        </div>
      </aside>

      {/* INVITE MEMBER MODAL */}
      {showInviteModal && (
        <InviteMemberModal
          onClose={() => setShowInviteModal(false)}
          selectedTeam={selectedChat?.type === "team" ? selectedChat : null}
          onInvite={(invite) => {
            console.log("Invite sent:", invite);
            setShowInviteModal(false);
          }}
        />
      )}
    </>
  );
}
