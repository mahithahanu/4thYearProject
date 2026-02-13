import { useState } from "react";
import Sidebar from "./Sidebar";
import ChatWindow from "./ChatWindow";
import RightPanel from "./RightPanel";
import styles from "./ChatPage.module.css";

export default function ChatPage() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [showRightPanel, setShowRightPanel] = useState(false);

  return (
    <div className={styles.container}>
      <Sidebar onSelectChat={setSelectedChat} />

      <ChatWindow
        chat={selectedChat}
        onTogglePanel={() => setShowRightPanel(prev => !prev)}
      />

      {showRightPanel && selectedChat && <RightPanel />}
    </div>
  );
}
