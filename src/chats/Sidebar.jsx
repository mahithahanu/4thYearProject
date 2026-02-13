import { useState } from "react";
import styles from "./Sidebar.module.css";
import InviteMemberModal from "./InviteMemberModal";

/* CHAT LIST (GROUPS) */
const chats = [
  {
    id: 1,
    name: "AI-Automator Team",
    lastMsg: "Sarah: Just updated the docs",
    time: "12:45 PM",
    type: "group"
  },
  {
    id: 2,
    name: "General Chat",
    lastMsg: "24 members online",
    time: "Yesterday",
    type: "group"
  }
];

/* MEMBERS LIST (INDIVIDUALS) */
const members = [
  { id: 101, name: "Sarah Chen", status: "Online" },
  { id: 102, name: "Marcus Wright", status: "2h ago" },
  { id: 103, name: "Emily Davis", status: "Offline" }
];

export default function Sidebar({ onSelectChat }) {
  const [activeTab, setActiveTab] = useState("messages");
  const [showInviteModal, setShowInviteModal] = useState(false);

  const list = activeTab === "messages" ? chats : members;

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
        </div>

        {/* INVITE BUTTON */}
        <button
          className={styles.newMsg}
          onClick={() => setShowInviteModal(true)}
        >
          + Invite Member
        </button>

        {/* TABS */}
        <div className={styles.tabs}>
          <span
            className={activeTab === "messages" ? styles.active : ""}
            onClick={() => setActiveTab("messages")}
          >
            Messages
          </span>
          <span
            className={activeTab === "members" ? styles.active : ""}
            onClick={() => setActiveTab("members")}
          >
            Members
          </span>
        </div>

        {/* LIST */}
        <div className={styles.chatList}>
          {list.map(item => (
            <div
              key={item.id}
              className={styles.chatItem}
              onClick={() =>
                onSelectChat({
                  id: item.id,
                  name: item.name,
                  isMember: activeTab === "members"
                })
              }
            >
              <div className={styles.avatar}>
                {activeTab === "members" ? "👤" : "💬"}
              </div>

              <div className={styles.chatInfo}>
                <h4>{item.name}</h4>
                <p>
                  {activeTab === "members"
                    ? item.status
                    : item.lastMsg}
                </p>
              </div>

              <span className={styles.time}>
                {item.time || ""}
              </span>
            </div>
          ))}
        </div>
      </aside>

      {/* INVITE MEMBER MODAL */}
      {showInviteModal && (
        <InviteMemberModal
          onClose={() => setShowInviteModal(false)}
        />
      )}
    </>
  );
}
