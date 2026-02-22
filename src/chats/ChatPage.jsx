import { useState, useCallback } from "react";
import { SocketProvider } from "./SocketContext";
import Sidebar from "./Sidebar";
import ChatWindow from "./ChatWindow";
import RightPanel from "./RightPanel";
import styles from "./ChatPage.module.css";

function ChatPageContent() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [showRightPanel, setShowRightPanel] = useState(false);

  const handleSelectChat = useCallback((chat) => {
    setSelectedChat(chat);
    setShowRightPanel(false);
  }, []);

  const handleTogglePanel = useCallback(() => {
    setShowRightPanel(prev => !prev);
  }, []);

  // Handle starting a direct chat from RightPanel (clicking on team member)
  const handleStartDirectChat = useCallback((chat) => {
    setSelectedChat(chat);
    setShowRightPanel(false);
  }, []);

  return (
    <div className={styles.container}>
      <Sidebar 
        onSelectChat={handleSelectChat} 
        selectedChat={selectedChat}
      />

      <ChatWindow
        chat={selectedChat}
        onTogglePanel={handleTogglePanel}
      />

      {showRightPanel && selectedChat && (
        <RightPanel 
          chat={selectedChat}
          onClose={() => setShowRightPanel(false)}
          onStartDirectChat={handleStartDirectChat}
        />
      )}
    </div>
  );
}

export default function ChatPage() {
  return (
    <SocketProvider>
      <ChatPageContent />
    </SocketProvider>
  );
}
