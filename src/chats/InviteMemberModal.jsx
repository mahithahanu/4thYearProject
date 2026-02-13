import { FaSearch, FaTimes } from "react-icons/fa";
import styles from "./InviteMemberModal.module.css";

const members = [
  {
    id: 1,
    name: "Alex Chen",
    role: "Full Stack Developer",
    avatar: "https://i.pravatar.cc/40?img=1",
  },
  {
    id: 2,
    name: "Sarah Miller",
    role: "UI/UX Designer",
    avatar: "https://i.pravatar.cc/40?img=5",
  },
  {
    id: 3,
    name: "Jordan Smith",
    role: "Data Scientist",
    avatar: "https://i.pravatar.cc/40?img=8",
  },
  {
    id: 4,
    name: "Emily Zhang",
    role: "Backend Engineer",
    avatar: "https://i.pravatar.cc/40?img=12",
  },
  {
    id: 5,
    name: "Marcus Thorne",
    role: "Product Manager",
    avatar: "https://i.pravatar.cc/40?img=15",
  },
];

export default function InviteMemberModal({ onClose }) {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className={styles.header}>
          <h3>Invite New Member</h3>
          <FaTimes onClick={onClose} className={styles.searchstyle}/>
        </div>

        {/* SEARCH */}
        <div className={styles.searchBox}>
          <FaSearch className={styles.searchicon}/>
          <input placeholder="Search by name or skill..." />
        </div>

        {/* MEMBERS */}
        <div className={styles.list}>
          {members.map((m) => (
            <div key={m.id} className={styles.member}>
              <div className={styles.left}>
                <img src={m.avatar} alt={m.name} />
                <div>
                  <h4>{m.name}</h4>
                  <p>{m.role}</p>
                </div>
              </div>
              <button>Send →</button>
            </div>
          ))}
        </div>

        {/* FOOTER */}
        <div className={styles.footer}>
          <span>128 potential matches found</span>
          <div className={styles.actions}>
            <button className={styles.cancel} onClick={onClose}>
              Cancel
            </button>
            <button className={styles.viewAll}>View All</button>
          </div>
        </div>
      </div>
    </div>
  );
}
