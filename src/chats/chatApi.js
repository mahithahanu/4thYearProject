const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8003/api";

// Helper to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`
  };
};

// Fetch all conversations (teams + direct messages)
export const fetchConversations = async () => {
  const response = await fetch(`${API_URL}/teams/conversations`, {
    headers: getAuthHeaders()
  });
  
  if (!response.ok) {
    throw new Error("Failed to fetch conversations");
  }
  
  return response.json();
};

// Fetch user's teams
export const fetchUserTeams = async () => {
  const response = await fetch(`${API_URL}/teams/my-teams`, {
    headers: getAuthHeaders()
  });
  
  if (!response.ok) {
    throw new Error("Failed to fetch teams");
  }
  
  return response.json();
};

// Fetch team by ID
export const fetchTeamById = async (teamId) => {
  const response = await fetch(`${API_URL}/teams/${teamId}`, {
    headers: getAuthHeaders()
  });
  
  if (!response.ok) {
    throw new Error("Failed to fetch team");
  }
  
  return response.json();
};

// Fetch team members
export const fetchTeamMembers = async (teamId) => {
  const response = await fetch(`${API_URL}/teams/${teamId}/members`, {
    headers: getAuthHeaders()
  });
  
  if (!response.ok) {
    throw new Error("Failed to fetch team members");
  }
  
  return response.json();
};

// Fetch recent messages for a room
export const fetchRecentMessages = async (roomId, limit = 30) => {
  const response = await fetch(`${API_URL}/chat/recent/${roomId}?limit=${limit}`, {
    headers: getAuthHeaders()
  });
  
  if (!response.ok) {
    throw new Error("Failed to fetch messages");
  }
  
  return response.json();
};

// Fetch chat history with pagination
export const fetchChatHistory = async (roomId, page = 1, limit = 50) => {
  const response = await fetch(`${API_URL}/chat/history/${roomId}?page=${page}&limit=${limit}`, {
    headers: getAuthHeaders()
  });
  
  if (!response.ok) {
    throw new Error("Failed to fetch chat history");
  }
  
  return response.json();
};

// Create a new team
export const createTeam = async (teamData) => {
  const response = await fetch(`${API_URL}/teams/create`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(teamData)
  });
  
  if (!response.ok) {
    throw new Error("Failed to create team");
  }
  
  return response.json();
};

// Add member to team
export const addTeamMember = async (teamId, memberData) => {
  const response = await fetch(`${API_URL}/teams/${teamId}/members`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(memberData)
  });
  
  if (!response.ok) {
    throw new Error("Failed to add member");
  }
  
  return response.json();
};

// Remove member from team
export const removeTeamMember = async (teamId, memberId) => {
  const response = await fetch(`${API_URL}/teams/${teamId}/members/${memberId}`, {
    method: "DELETE",
    headers: getAuthHeaders()
  });
  
  if (!response.ok) {
    throw new Error("Failed to remove member");
  }
  
  return response.json();
};

// Get direct message room ID
export const getDirectRoomId = async (otherUserId) => {
  const response = await fetch(`${API_URL}/teams/dm/${otherUserId}`, {
    headers: getAuthHeaders()
  });
  
  if (!response.ok) {
    throw new Error("Failed to get direct room ID");
  }
  
  return response.json();
};

// Search messages in a room
export const searchMessages = async (roomId, query) => {
  const response = await fetch(`${API_URL}/chat/search/${roomId}?q=${encodeURIComponent(query)}`, {
    headers: getAuthHeaders()
  });
  
  if (!response.ok) {
    throw new Error("Failed to search messages");
  }
  
  return response.json();
};

// Mark messages as read
export const markMessagesAsRead = async (messageIds, userId) => {
  const response = await fetch(`${API_URL}/chat/read`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ messageIds, userId })
  });
  
  if (!response.ok) {
    throw new Error("Failed to mark messages as read");
  }
  
  return response.json();
};

// ==================== INVITE APIs ====================

// Send an invite to join a team
export const sendInvite = async (teamId, inviteeEmail, message = "") => {
  const response = await fetch(`${API_URL}/invites/send`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ teamId, inviteeEmail, message })
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error || "Failed to send invite");
  }
  
  return data;
};

// Get pending invites for current user
export const fetchMyInvites = async () => {
  const response = await fetch(`${API_URL}/invites/my-invites`, {
    headers: getAuthHeaders()
  });
  
  if (!response.ok) {
    throw new Error("Failed to fetch invites");
  }
  
  return response.json();
};

// Get invites sent by current user
export const fetchSentInvites = async () => {
  const response = await fetch(`${API_URL}/invites/sent`, {
    headers: getAuthHeaders()
  });
  
  if (!response.ok) {
    throw new Error("Failed to fetch sent invites");
  }
  
  return response.json();
};

// Accept an invite
export const acceptInvite = async (inviteId) => {
  const response = await fetch(`${API_URL}/invites/accept/${inviteId}`, {
    method: "POST",
    headers: getAuthHeaders()
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error || "Failed to accept invite");
  }
  
  return data;
};

// Decline an invite
export const declineInvite = async (inviteId) => {
  const response = await fetch(`${API_URL}/invites/decline/${inviteId}`, {
    method: "POST",
    headers: getAuthHeaders()
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error || "Failed to decline invite");
  }
  
  return data;
};

// Cancel a sent invite
export const cancelInvite = async (inviteId) => {
  const response = await fetch(`${API_URL}/invites/cancel/${inviteId}`, {
    method: "DELETE",
    headers: getAuthHeaders()
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error || "Failed to cancel invite");
  }
  
  return data;
};

// ==================== USER SEARCH ====================

// Search users by name or email
export const searchUsers = async (query) => {
  const response = await fetch(`${API_URL}/users/search?query=${encodeURIComponent(query)}`, {
    headers: getAuthHeaders()
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error || "Failed to search users");
  }
  
  return data;
};

// Get all users (for browsing)
export const fetchAllUsers = async () => {
  const response = await fetch(`${API_URL}/users`, {
    headers: getAuthHeaders()
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error || "Failed to fetch users");
  }
  
  return data;
};
