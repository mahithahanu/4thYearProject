import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || "http://localhost:8003";

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [typingUsers, setTypingUsers] = useState({});
  const socketRef = useRef(null);

  // Get user from localStorage
  const getUser = () => {
    try {
      // First try to get the full user object
      const userData = localStorage.getItem("user");
      if (userData) {
        return JSON.parse(userData);
      }
      
      // Fallback: construct user from individual localStorage items
      const userEmail = localStorage.getItem("userEmail");
      const token = localStorage.getItem("token");
      if (userEmail && token) {
        // Extract user info from token if possible
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          return {
            id: payload.id,
            _id: payload.id,
            email: payload.email || userEmail,
            name: payload.name || userEmail.split('@')[0],
            role: payload.role || localStorage.getItem("role")
          };
        } catch {
          // If token parsing fails, use email as fallback
          return {
            id: userEmail,
            _id: userEmail,
            email: userEmail,
            name: userEmail.split('@')[0],
            role: localStorage.getItem("role")
          };
        }
      }
      
      return null;
    } catch {
      return null;
    }
  };

  // Initialize socket connection
  useEffect(() => {
    const user = getUser();
    
    if (!user) {
      console.log("No user found, socket not initialized");
      return;
    }

    const newSocket = io(SOCKET_URL, {
      transports: ["websocket", "polling"],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000
    });

    socketRef.current = newSocket;
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Socket connected:", newSocket.id);
      setIsConnected(true);
      
      // Emit user online status
      newSocket.emit("user_online", {
        userId: user.id || user._id,
        userName: user.name,
        userEmail: user.email
      });
    });

    newSocket.on("disconnect", () => {
      console.log("Socket disconnected");
      setIsConnected(false);
    });

    newSocket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
      setIsConnected(false);
    });

    // Listen for user status changes
    newSocket.on("user_status_change", (data) => {
      setOnlineUsers(prev => {
        if (data.status === "online") {
          const exists = prev.some(u => u.userId === data.userId);
          if (!exists) {
            return [...prev, { userId: data.userId, userName: data.userName }];
          }
          return prev;
        } else {
          return prev.filter(u => u.userId !== data.userId);
        }
      });
    });

    // Handle typing indicators
    newSocket.on("user_typing", (data) => {
      setTypingUsers(prev => ({
        ...prev,
        [data.roomId]: [...(prev[data.roomId] || []).filter(u => u.userId !== data.userId), 
                        { userId: data.userId, userName: data.userName }]
      }));
    });

    newSocket.on("user_stop_typing", (data) => {
      setTypingUsers(prev => ({
        ...prev,
        [data.roomId]: (prev[data.roomId] || []).filter(u => u.userId !== data.userId)
      }));
    });

    // Cleanup on unmount
    return () => {
      newSocket.disconnect();
      socketRef.current = null;
    };
  }, []);

  // Join a chat room
  const joinRoom = useCallback((roomId, roomType = "team") => {
    const user = getUser();
    if (socketRef.current && user) {
      socketRef.current.emit("join_room", {
        roomId,
        roomType,
        userId: user.id || user._id,
        userName: user.name
      });
    }
  }, []);

  // Leave a chat room
  const leaveRoom = useCallback((roomId) => {
    const user = getUser();
    if (socketRef.current && user) {
      socketRef.current.emit("leave_room", {
        roomId,
        userId: user.id || user._id,
        userName: user.name
      });
    }
  }, []);

  // Send a message
  const sendMessage = useCallback((roomId, text, roomType = "team") => {
    const user = getUser();
    if (socketRef.current && user) {
      socketRef.current.emit("send_message", {
        roomId,
        roomType,
        senderId: user.id || user._id,
        senderName: user.name,
        senderEmail: user.email,
        text,
        messageType: "text"
      });
    }
  }, []);

  // Start typing indicator
  const startTyping = useCallback((roomId) => {
    const user = getUser();
    if (socketRef.current && user) {
      socketRef.current.emit("typing_start", {
        roomId,
        userId: user.id || user._id,
        userName: user.name
      });
    }
  }, []);

  // Stop typing indicator
  const stopTyping = useCallback((roomId) => {
    const user = getUser();
    if (socketRef.current && user) {
      socketRef.current.emit("typing_stop", {
        roomId,
        userId: user.id || user._id,
        userName: user.name
      });
    }
  }, []);

  // Mark messages as read
  const markAsRead = useCallback((messageIds, roomId) => {
    const user = getUser();
    if (socketRef.current && user) {
      socketRef.current.emit("mark_read", {
        messageIds,
        userId: user.id || user._id,
        roomId
      });
    }
  }, []);

  // Listen for new messages
  const onMessage = useCallback((callback) => {
    if (socketRef.current) {
      socketRef.current.on("receive_message", callback);
      return () => socketRef.current?.off("receive_message", callback);
    }
    return () => {};
  }, []);

  // Listen for messages read
  const onMessagesRead = useCallback((callback) => {
    if (socketRef.current) {
      socketRef.current.on("messages_read", callback);
      return () => socketRef.current?.off("messages_read", callback);
    }
    return () => {};
  }, []);

  // Check if a user is online
  const isUserOnline = useCallback((userId) => {
    return onlineUsers.some(u => u.userId === userId);
  }, [onlineUsers]);

  // Get typing users for a room
  const getTypingUsers = useCallback((roomId) => {
    return typingUsers[roomId] || [];
  }, [typingUsers]);

  const value = {
    socket: socketRef.current,
    isConnected,
    onlineUsers,
    joinRoom,
    leaveRoom,
    sendMessage,
    startTyping,
    stopTyping,
    markAsRead,
    onMessage,
    onMessagesRead,
    isUserOnline,
    getTypingUsers,
    getUser
  };

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};

export default SocketContext;
