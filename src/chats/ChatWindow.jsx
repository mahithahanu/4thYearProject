import { useState, useEffect, useRef, useCallback } from "react";
import styles from "./ChatWindow.module.css";
import { FaEllipsisH, FaUsers, FaUser, FaCheck, FaCheckDouble, FaTrophy } from "react-icons/fa";
import ChatInput from "./ChatInput";
import { useSocket } from "./SocketContext";
import { fetchRecentMessages, getDirectRoomId } from "./chatApi";

export default function ChatWindow({ chat, onTogglePanel }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [roomId, setRoomId] = useState(null);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  
  const { 
    joinRoom, 
    leaveRoom, 
    sendMessage, 
    onMessage, 
    startTyping, 
    stopTyping,
    getTypingUsers,
    markAsRead,
    getUser 
  } = useSocket();

  const currentUser = getUser();
  const typingUsers = getTypingUsers(roomId);

  // Scroll to bottom
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  // Initialize room when chat changes
  useEffect(() => {
    if (!chat) return;

    const initRoom = async () => {
      setLoading(true);
      setMessages([]);

      let currentRoomId = chat.roomId;

      // For direct messages, get or create room ID
      if (chat.type === "direct" && !chat.roomId && chat.otherUserId) {
        try {
          const response = await getDirectRoomId(chat.otherUserId);
          if (response.success) {
            currentRoomId = response.roomId;
          }
        } catch (error) {
          console.error("Error getting direct room ID:", error);
        }
      }

      if (currentRoomId) {
        setRoomId(currentRoomId);
        
        // Join the room
        joinRoom(currentRoomId, chat.type);

        // Fetch recent messages
        try {
          const response = await fetchRecentMessages(currentRoomId);
          if (response.success) {
            // Normalize messages to ensure consistent format
            const normalizedMessages = (response.messages || []).map(msg => ({
              ...msg,
              // Ensure senderId is available in a consistent way
              senderId: typeof msg.senderId === 'object' && msg.senderId !== null 
                ? msg.senderId._id?.toString() || msg.senderId.toString()
                : msg.senderId,
              // Preserve sender info from populated data if available
              senderName: msg.senderName || (typeof msg.senderId === 'object' ? msg.senderId.name : null),
              senderEmail: msg.senderEmail || (typeof msg.senderId === 'object' ? msg.senderId.email : null),
            }));
            
            setMessages(normalizedMessages);
            
            // Mark messages as read
            const unreadIds = normalizedMessages
              .filter(m => !m.readBy?.includes(currentUser?.id))
              .map(m => m._id);
            
            if (unreadIds.length > 0) {
              markAsRead(unreadIds, currentRoomId);
            }
          }
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
      }

      setLoading(false);
    };

    initRoom();

    // Cleanup - leave room
    return () => {
      if (roomId) {
        leaveRoom(roomId);
      }
    };
  }, [chat, joinRoom, leaveRoom, markAsRead, currentUser?.id]);

  // Listen for new messages
  useEffect(() => {
    if (!roomId) return;

    const unsubscribe = onMessage((message) => {
      if (message.roomId === roomId) {
        setMessages(prev => [...prev, message]);
        
        // Mark as read if not from current user
        if (message.senderId !== currentUser?.id) {
          markAsRead([message._id], roomId);
        }
      }
    });

    return unsubscribe;
  }, [roomId, onMessage, markAsRead, currentUser?.id]);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Handle send message
  const handleSendMessage = (text) => {
    if (!text.trim() || !roomId) return;
    
    sendMessage(roomId, text, chat.type);
    stopTyping(roomId);
  };

  // Handle typing
  const handleTyping = (isTyping) => {
    if (!roomId) return;
    
    if (isTyping) {
      startTyping(roomId);
    } else {
      stopTyping(roomId);
    }
  };

  // Format message time
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // Check if message is from current user
  const isOwnMessage = (senderId) => {
    // Handle both string senderId (from socket) and object senderId (from DB populate)
    const senderIdStr = typeof senderId === 'object' && senderId !== null 
      ? (senderId._id?.toString() || senderId.toString())
      : senderId?.toString();
    const currentIdStr = currentUser?.id?.toString() || currentUser?._id?.toString();
    return senderIdStr === currentIdStr;
  };

  // Group messages by date
  const groupMessagesByDate = (messages) => {
    const groups = {};
    
    messages.forEach(msg => {
      const date = new Date(msg.createdAt).toLocaleDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(msg);
    });
    
    return groups;
  };

  // No chat selected
  if (!chat) {
    return (
      <section className={styles.emptyState}>
        <div className={styles.emptyIcon}>
          <FaUsers size={48} />
        </div>
        <h2>Select a chat to start messaging</h2>
        <p>Your messages will appear here</p>
      </section>
    );
  }

  const messageGroups = groupMessagesByDate(messages);

  return (
    <section className={styles.chatWindow}>
      {/* HEADER */}
      <div className={styles.header}>
        <div className={styles.headerInfo}>
          <div className={styles.headerAvatar}>
            {chat.type === "team" ? <FaUsers /> : chat.type === "hackathon" ? <FaTrophy /> : <FaUser />}
          </div>
          <div>
            <h3>{chat.name}</h3>
            <span>
              {chat.type === "team" 
                ? `${chat.memberCount || 0} members` 
                : chat.type === "hackathon"
                  ? chat.theme || "Hackathon Chat"
                  : chat.hackathonName || "Direct Message"}
            </span>
          </div>
        </div>

        <div className={styles.menuIcon} onClick={onTogglePanel}>
          <FaEllipsisH />
        </div>
      </div>

      {/* MESSAGES */}
      <div className={styles.messages} ref={messagesContainerRef}>
        {loading ? (
          <div className={styles.loadingMessages}>Loading messages...</div>
        ) : messages.length === 0 ? (
          <div className={styles.noMessages}>
            <p>No messages yet. Start the conversation!</p>
          </div>
        ) : (
          Object.entries(messageGroups).map(([date, msgs]) => (
            <div key={date}>
              <div className={styles.day}>{date}</div>
              
              {msgs.map((msg) => (
                <div
                  key={msg._id}
                  className={`${styles.msgRow} ${isOwnMessage(msg.senderId) ? styles.me : ""}`}
                >
                  {!isOwnMessage(msg.senderId) && (
                    <div className={styles.msgAvatar}>
                      <FaUser />
                    </div>
                  )}
                  
                  <div className={styles.msgContent}>
                    {!isOwnMessage(msg.senderId) && chat.type === "team" && (
                      <div className={styles.name}>
                        {msg.senderName}
                        <span>{formatTime(msg.createdAt)}</span>
                      </div>
                    )}
                    
                    <div className={isOwnMessage(msg.senderId) ? styles.myBubble : styles.msgBubble}>
                      {msg.text}
                      
                      {isOwnMessage(msg.senderId) && (
                        <span className={styles.tick}>
                          {msg.readBy?.length > 1 ? <FaCheckDouble /> : <FaCheck />}
                        </span>
                      )}
                    </div>
                    
                    {isOwnMessage(msg.senderId) && (
                      <span className={styles.time}>{formatTime(msg.createdAt)}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ))
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* TYPING INDICATOR */}
      {typingUsers.length > 0 && (
        <div className={styles.typing}>
          {typingUsers.map(u => u.userName).join(", ")} 
          {typingUsers.length === 1 ? " is" : " are"} typing...
        </div>
      )}

      {/* INPUT */}
      <ChatInput 
        onSend={handleSendMessage}
        onTyping={handleTyping}
      />
    </section>
  );
}
