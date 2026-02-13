import { useRef, useEffect, useState } from "react";
import styles from "./TeamAnalysis.module.css";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

/* ===== STATIC BAR DATA ===== */
const barData = {
  synergy: ["b1", "b2", "b3", "b4", "b5"],
  velocity: ["b2", "b3", "b4", "b3", "b4"],
  skill: ["b4", "b3", "b2", "b1", "b2"],
  happiness: ["b2", "b3", "b4", "b4", "b5"],
};

/* ===== RECENT ACTIVITIES ===== */
const recentActivities = [
  { name: "Sarah Jenkins", action: "pushed 12 commits to", target: "core-api-v2", time: "12 MINUTES AGO" },
  { name: "Emma Stone", action: "updated the", target: "Design System", time: "2 HOURS AGO" },
  { name: "Mike Ross", action: "resolved 4 blocking issues in", target: "Sprint 24", time: "4 HOURS AGO" },
  { name: "Milestone Reached", action: "Team Velocity record of", target: "42 pts/wk", time: "YESTERDAY" },
  { name: "Skill Badge Earned", action: "Design team completed", target: "Advanced Figma", time: "YESTERDAY" },
];


export default function Dashboard() {
  const wrapperRef = useRef();
  const leftRef = useRef();
  const [leftHeight, setLeftHeight] = useState(0);

  useEffect(() => {
    if (leftRef.current) setLeftHeight(leftRef.current.offsetHeight);
    const handleResize = () => {
      if (leftRef.current) setLeftHeight(leftRef.current.offsetHeight);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const exportPDF = async () => {
    if (!wrapperRef.current) return;
    
    // Capture the entire dashboard as a canvas
    const canvas = await html2canvas(wrapperRef.current, {
      scale: 2, // improve resolution
      useCORS: true, // if using external images
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("team-analysis.pdf");
  };

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      {/* ================= TEAM ANALYSIS ================= */}
      <div className={styles.header}>
        <h2 className={styles.title}>Team Analysis</h2>
        <div className={styles.actions}>
          {/* <button className={styles.lightBtn}>Last 30 Days</button> */}
          <button className={styles.primaryBtn} onClick={exportPDF}>
            Export Report
          </button>
        </div>
      </div>

      <div className={styles.cards}>
        <Card title="SYNERGY SCORE" value="88%" delta="+5.2%" positive bars={barData.synergy} />
        <Card title="VELOCITY" value="42" sub=" pts" delta="+2.1%" positive bars={barData.velocity} />
        <Card title="SKILL GAP" value="12%" delta="-3.0%" bars={barData.skill} />
        <Card title="HAPPINESS INDEX" value="9.2" sub="/10" delta="+1.4%" positive bars={barData.happiness} />
      </div>

      {/* ================= MAIN GRID: LEFT + RIGHT ================= */}
      <div className={styles.mainGrid}>
        {/* ===== LEFT SIDE ===== */}
        <div ref={leftRef}>
          {/* Metric Comparison */}
          <div className={styles.metricWrapper}>
            <div className={styles.metricCard}>
              <div className={styles.metricHeader}>
                <h3>Metric Comparison</h3>
                <p>Commits vs Design Tasks (Last 30 Days)</p>
              </div>
              <div className={styles.chartWrap}>
                <Line data={metricData} options={metricOptions} />
              </div>
            </div>
          </div>

          {/* Time + Stack */}
          <div className={styles.lowerWrapper}>
            <div className={styles.lowerCard}>
              <h4 className={styles.lowerTitle}>Time Allocation</h4>
              <div className={styles.donutWrap}>
                <svg width="140" height="140" viewBox="0 0 140 140">
                  <circle cx="70" cy="70" r="56" className={styles.donutBg} />
                  <circle cx="70" cy="70" r="56" className={styles.donutFg} />
                </svg>
                <div className={styles.donutCenter}>
                  <h3>65%</h3>
                  <p>CODING</p>
                </div>
              </div>
              <div className={styles.legend}>
                <span><i className={styles.l1} /> Coding (28h)</span>
                <span><i className={styles.l2} /> Meetings (8h)</span>
                <span><i className={styles.l3} /> Research (4h)</span>
                <span><i className={styles.l4} /> Planning (2h)</span>
              </div>
            </div>

            <div className={styles.lowerCard}>
              <h4 className={styles.lowerTitle}>Stack Proficiency</h4>
              <Stack label="React / Next.js" value={94} />
              <Stack label="TypeScript" value={88} />
              <Stack label="Figma / UI Design" value={72} />
              <Stack label="Node.js / Express" value={65} />
              <Stack label="AWS / Cloud" value={45} />
            </div>
          </div>
        </div>

        {/* ===== RIGHT SIDE ===== */}
        <RecentActivity activities={recentActivities} height={leftHeight} />
      </div>
    </div>
  );
}

/* ===== CARD ===== */
function Card({ title, value, sub, delta, positive, bars }) {
  return (
    <div className={styles.card}>
      <p className={styles.cardTitle}>{title}</p>
      <div className={styles.cardBody}>
        <div>
          <h3 className={styles.value}>
            {value} {sub && <span>{sub}</span>}
          </h3>
          <p className={positive ? styles.positive : styles.negative}>{delta}</p>
        </div>
        <Bars bars={bars} />
      </div>
    </div>
  );
}

/* ===== BARS ===== */
function Bars({ bars }) {
  return (
    <div className={styles.barGroup}>
      {bars.map((b, i) => (
        <div key={i} className={`${styles.bar} ${styles[b]}`} />
      ))}
    </div>
  );
}

/* ===== STACK ===== */
function Stack({ label, value }) {
  return (
    <div className={styles.stackRow}>
      <div className={styles.stackHeader}>
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className={styles.stackBar}>
        <div style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

/* ===== RECENT ACTIVITY ===== */
function RecentActivity({ activities, height }) {
  return (
    <div className={styles.activityCard} style={{ height: height || "auto" }}>
      <div className={styles.activityCardInner}>
        <h4>Recent Activity</h4>

        <ul className={styles.activityList}>
          {activities.map((act, i) => (
            <li key={i}>
              <strong>{act.name}</strong> {act.action}
              <span> {act.target}</span>
              <p>{act.time}</p>
            </li>
          ))}
        </ul>

        <div className={styles.insightBox}>
          <strong>⚡ TEAM INSIGHT</strong>
          <p>
            Velocity has increased by <b>14%</b> since the latest backend rotation began.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ===== LINE CHART DATA ===== */
const metricData = {
  labels: ["WEEK 1", "WEEK 2", "WEEK 3", "WEEK 4"],
  datasets: [
    { label: " COMMITS", data: [20, 28, 65, 32, 85], borderColor: "#0aa89e", tension: 0.45, borderWidth: 3, pointRadius: 0 },
    { label: " DESIGN TASKS", data: [25, 35, 42, 25, 45], borderColor: "#7adaca", tension: 0.45, borderWidth: 3, pointRadius: 0 },
  ],
};

const metricOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
      align: "end",
      labels: { usePointStyle: true, boxWidth: 6, font: { size: 11 }, color: "#6b8b90" },
    },
  },
  scales: { x: { grid: { display: false }, ticks: { color: "#9bb4b8", font: { size: 10 } } }, y: { display: false } },
};