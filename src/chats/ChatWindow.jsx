import styles from "./ChatWindow.module.css";
import {
  FaEllipsisH,
} from "react-icons/fa";
import ChatInput from "./ChatInput";

export default function ChatWindow({ chat, onTogglePanel }) {
  // 👉 NO CHAT SELECTED
  if (!chat) {
    return (
      <section className={styles.emptyState}>
        <h2>Select a chat to start messaging</h2>
        <p>Your messages will appear here</p>
      </section>
    );
  }

   const handleSendMessage = (msg) => {
    console.log("Sending:", msg);
    // later → socket.emit / api call
  };

  // 👉 CHAT SELECTED
  return (
    <section className={styles.chatWindow}>
      {/* HEADER */}
      <div className={styles.header}>
        <div>
          <h3>{chat.name}</h3>
          <span>{chat.members} members active now</span>
        </div>

        <div className={styles.menuIcon} onClick={onTogglePanel}>
          <FaEllipsisH />
        </div>
      </div>

      {/* MESSAGES */}
      <div className={styles.messages}>
        <div className={styles.msgRow}>
          <div className={styles.msgBubble}>
            Hey! This is the start of <b>{chat.name}</b> chat 👋
          </div>
        </div>
      </div>

      <ChatInput onSend={handleSendMessage} />



    </section>
  );
}
