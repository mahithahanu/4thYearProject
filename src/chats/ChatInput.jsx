import { useState, useRef, useEffect, useCallback } from "react";
import EmojiPicker from "emoji-picker-react";
import styles from "./ChatInput.module.css";
import { FaPaperclip, FaSmile, FaPaperPlane } from "react-icons/fa";

export default function ChatInput({ onSend, onTyping }) {
  const [message, setMessage] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const fileInputRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  // Handle typing indicator with debounce
  const handleTypingChange = useCallback((value) => {
    setMessage(value);
    
    // Start typing
    if (value.trim() && !isTyping) {
      setIsTyping(true);
      onTyping?.(true);
    }
    
    // Clear previous timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    
    // Stop typing after 2 seconds of no input
    typingTimeoutRef.current = setTimeout(() => {
      if (isTyping) {
        setIsTyping(false);
        onTyping?.(false);
      }
    }, 2000);
  }, [isTyping, onTyping]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  const handleClipClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("Selected file:", file.name);
    }
  };

  const handleEmojiClick = (emojiData) => {
    handleTypingChange(message + emojiData.emoji);
  };

  const handleSend = () => {
    if (!message.trim()) return;
    
    // Stop typing indicator
    if (isTyping) {
      setIsTyping(false);
      onTyping?.(false);
    }
    
    onSend(message);
    setMessage("");
    setShowEmoji(false);
  };

  return (
    <div className={styles.inputWrapper}>
      <div className={styles.inputBox}>
        {/* Paperclip */}
        <FaPaperclip
          className={styles.clipIcon}
          onClick={handleClipClick}
        />

        {/* Text input */}
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => handleTypingChange(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />

        {/* Emoji */}
        <FaSmile
          className={styles.emojiIcon}
          onClick={() => setShowEmoji((p) => !p)}
        />
      </div>

      {/* Send button */}
      <button className={styles.sendBtn} onClick={handleSend}>
        <FaPaperPlane />
      </button>

      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        hidden
        onChange={handleFileChange}
      />

      {/* Emoji Picker */}
      {showEmoji && (
        <div className={styles.emojiPicker}>
          <EmojiPicker
            onEmojiClick={handleEmojiClick}
            height={350}
            width={300}
            searchDisabled={false}
            skinTonesDisabled={false}
            previewConfig={{ showPreview: false }}
          />
        </div>
      )}
    </div>
  );
}
