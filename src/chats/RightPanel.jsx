import styles from "./RightPanel.module.css";

export default function RightPanel() {
  return (
    <aside className={styles.panel}>
      <input className={styles.search} placeholder="Search files or people" />

      <h4 className={styles.sectionTitle}>
        TEAM MEMBERS <span>4 ONLINE</span>
      </h4>

      <div className={styles.member}>
        <img src="https://i.pravatar.cc/40?img=5" />
        <div>
          <p>Sarah Chen</p>
          <span>Project Mentor</span>
        </div>
      </div>

      <div className={styles.member}>
        <img src="https://i.pravatar.cc/40?img=12" />
        <div>
          <p>Marcus Wright</p>
          <span>Fullstack Dev</span>
        </div>
      </div>

      <h4 className={styles.sectionTitle}>SHARED RESOURCES</h4>

      <div className={styles.file}>📄 api_docs_v2.pdf</div>
      <div className={styles.file}>🖼 dashboard_final.png</div>
      <div className={styles.file}>🔗 GitHub Repository</div>

      <button className={styles.viewAll}>View All Assets</button>
    </aside>
  );
}
