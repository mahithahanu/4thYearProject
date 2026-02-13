import { useState, useRef } from "react";
import EmojiPicker from "emoji-picker-react";
import styles from "./ChatInput.module.css";
import { FaPaperclip, FaSmile, FaPaperPlane } from "react-icons/fa";

export default function ChatInput({ onSend }) {
  const [message, setMessage] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const fileInputRef = useRef(null);

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
    setMessage((prev) => prev + emojiData.emoji);
  };

  const handleSend = () => {
    if (!message.trim()) return;
    onSend(message);
    setMessage("");
    setShowEmoji(false);
  };

  return (
    <div className={styles.inputWrapper}>
      <div className={styles.inputBox}>
        {/* 📎 Paperclip */}
        <FaPaperclip
          className={styles.clipIcon}
          onClick={handleClipClick}
        />

        {/* Text input */}
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />

        {/* 🙂 Emoji */}
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
