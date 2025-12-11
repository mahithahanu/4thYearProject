import React from "react";
import styles from "./About.module.css";
import { ShieldCheck, Zap, BarChart2, Crosshair, Eye, Globe } from "lucide-react";

export default function StatusCard() {
  return (
    <section className={styles.outer}>
      <div className={styles.about}>
        <div className={styles.header}>
          {/* <p>ABOUT US</p> */}
          <h2>
            Unveiling Our Identity, <br /> Vision and Values
          </h2>
          <p className={styles.description}>
            We're passionate about chemical innovation. With years of experience
            in the industry, we've established ourselves as leaders in providing
            high-quality chemical solutions.
          </p>
        </div>

        {/* GREEN VALUE CARD */}
        <div className={styles.wrapper}>
          <div className={styles.card}>
            {/* TOP LEFT */}
            <div className={`${styles.item} ${styles.topLeft}`}>
              <ShieldCheck size={26} />
              <p>Safety</p>
            </div>

            {/* TOP RIGHT */}
            <div className={`${styles.item} ${styles.topRight}`}>
              <Zap size={26} />
              <p>Innovation</p>
            </div>

            {/* BOTTOM CENTER */}
            <div className={styles.bottomCenter}>
              <div className={styles.item}>
                <BarChart2 size={26} />
                <p>Efficient</p>
              </div>

              <div className={styles.item}>
                <Crosshair size={26} />
                <p>Precision</p>
              </div>
            </div>
          </div>
        </div>

        {/* VISION & MISSION */}
        <div className={styles.visionMission}>
          <div className={styles.box}>
            <h3><Eye size={20}/> Vision</h3>
            <p>
              To lead the way in chemical manufacturing by delivering innovative,
              sustainable, and cost-effective solutions.
            </p>
          </div>

          <div className={styles.box}>
            <h3><Globe size={20}/> Mission</h3>
            <p>
              To leverage our expertise, resources, and technology to manufacture
              chemical products that exceed industry standards.
            </p>
          </div>
        </div>

        
      </div>
    </section>
  );
}