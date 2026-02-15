import styles from "./Participants.module.css";

export default function ParticipantsPage() {
  return (
    <div className={styles.container}>
      <h2>Participant Management</h2>
      <p className={styles.subtitle}>
        Review, approve, and manage registration requests for your hackathon.
      </p>

      {/* Top Controls */}
      <div className={styles.topBar}>
        <div className={styles.totalBox}>
          TOTAL REGISTERED
          <span>1,248</span>
        </div>

        <button className={styles.exportBtn}>Export CSV</button>
      </div>

      {/* Search */}
      <div className={styles.searchBar}>
        <input type="text" placeholder="Search by name, email, or university..." />
      </div>

      {/* Table */}
      <div className={styles.tableCard}>
        <table>
          <thead>
            <tr>
              <th>Participant Name</th>
              <th>Email</th>
              <th>University</th>
              <th>Role/Skill</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Sarah Chen</td>
              <td>sarah.chen@example.edu</td>
              <td>Stanford University</td>
              <td>Full Stack</td>
              <td><span className={styles.verified}>Verified</span></td>
              <td>✓ ✕ ✉</td>
            </tr>

            <tr>
              <td>Marcus Miller</td>
              <td>m.miller@tech.org</td>
              <td>MIT</td>
              <td>Data Scientist</td>
              <td><span className={styles.pending}>Pending</span></td>
              <td>✓ ✕ ✉</td>
            </tr>

            <tr>
              <td>David Kim</td>
              <td>d.kim@university.ca</td>
              <td>University of Toronto</td>
              <td>Frontend Dev</td>
              <td><span className={styles.waitlisted}>Waitlisted</span></td>
              <td>✓ ✕ ✉</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
