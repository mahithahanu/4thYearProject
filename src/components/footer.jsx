import React from "react";
import styles from "./footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>

        {/* LEFT TOP */}
        {/* <div className={styles.topRow}>
          <div className={styles.logoSection}>
            <h3>GOODNESS</h3>
            <p>Call Us: +91 90909 90909</p>
          </div>

          <div className={styles.socials}>
            <span>Follow us:</span>
            <div className={styles.icons}>
              <i className="ri-facebook-fill"></i>
              <i className="ri-twitter-fill"></i>
              <i className="ri-instagram-line"></i>
            </div>
          </div>

          <div className={styles.payments}>
            <img src="https://img.icons8.com/color/48/visa.png" alt="visa"/>
            <img src="https://img.icons8.com/color/48/mastercard.png" alt="master"/>
            <img src="https://img.icons8.com/color/48/google-pay.png" alt="gpay"/>
            <img src="https://img.icons8.com/color/48/paytm.png" alt="paytm"/>
          </div>
        </div> */}

        {/* LINKS */}
        <div className={styles.linksGrid}>

          {/* STORE */}
          <div>
            <h4>Office Location</h4>
            <p>SkillSync HQ</p>
            <p>Surampalem, Kakinada</p>
            <p>skillsync@gmail.com</p>
          </div>

          {/* INFORMATION */}
          <div>
            <h4>Information</h4>
            <p>About SkillSync</p>
            <p>FAQ</p>
            <p>Contact us</p>
            <p>Help</p>
            <p>Careers</p>
          </div>

          {/* MY ACCOUNT */}
          <div>
            <h4>My Dashboard</h4>
            <p>Profile</p>
            <p>Projects</p>
            <p>Saved Groups</p>
            <p>Logout</p>
          </div>

          {/* CATEGORIES */}
          <div>
            <h4>SkillSync Chat</h4>
            <p>Workplace</p>
            <p>Project Info</p>
            <p>Team Info</p>
            <p>Mentorship</p>
            <p>Skill Progress</p>
          </div>

          {/* SUBSCRIBE */}
          <div>
            <h4>Stay Connected</h4>
            <p>Get the latest updates on skills, events & opportunities</p>
            <div className={styles.subscribeBox}>
              <input type="email" placeholder="Your email address" />
              <button>→</button>
            </div>
          </div>

        </div>

        {/* <p className={styles.copy}>Copyright © 2025 Goodness. All rights reserved</p> */}
      </div>
    </footer>
  );
}