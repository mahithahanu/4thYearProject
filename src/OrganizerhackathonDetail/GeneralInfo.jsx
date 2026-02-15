import styles from "./GeneralInfo.module.css";

export default function GeneralInfoPage() {
  return (
    <div className={styles.container}>
      <h2>General Information</h2>
      <p className={styles.subtitle}>
        Define the core identity and primary details of your hackathon.
      </p>

      <div className={styles.card}>
        <div className={styles.grid}>
          {/* Left Side */}
          <div className={styles.left}>
            <label>Hackathon Title</label>
            <input
              type="text"
              defaultValue="Global AI Hackathon 2024"
            />

            <label>Tagline</label>
            <input
              type="text"
              defaultValue="Building the future of Generative AI together"
            />

            <label>Event Type</label>
            <select defaultValue="Hybrid">
              <option>Online</option>
              <option>Offline</option>
              <option>Hybrid</option>
            </select>
          </div>

          {/* Right Side */}
          <div className={styles.right}>
            <label>Banner Image</label>
            <div className={styles.bannerBox}>
              <span>Upload Banner</span>
            </div>
            <small>Recommended size 1200x400px (JPG, PNG, max 5MB)</small>
          </div>
        </div>

        {/* Description */}
        <div className={styles.description}>
          <label>Event Description</label>
          <textarea
            rows="8"
            defaultValue={`Join us for a 48-hour sprint of innovation where developers, designers, and AI enthusiasts from around the globe come together to push the boundaries of what's possible with large language models.

This year's theme focuses on "AI for Good," encouraging participants to develop projects that address climate change, healthcare accessibility, and educational equality.

What to expect:
- Mentorship from industry leaders
- Exclusive access to premium AI APIs
- $50,000 in total prizes
- Networking opportunities with top tech recruiters`}
          />
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <span className={styles.saved}>All changes saved locally</span>

          <div>
            <button className={styles.discard}>Discard</button>
            <button className={styles.save}>Save Changes</button>
          </div>
        </div>
      </div>
    </div>
  );
}
