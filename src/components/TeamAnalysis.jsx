import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
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

const barData = {
  synergy: ["b1", "b2", "b3", "b4", "b5"],
  velocity: ["b2", "b3", "b4", "b3", "b4"],
  skill: ["b4", "b3", "b2", "b1", "b2"],
  happiness: ["b2", "b3", "b4", "b4", "b5"],
};

export default function Dashboard() {
  const wrapperRef = useRef();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  // const { teamName } = useParams();
  /* ================= FETCH ================= */
  const { teamName, type } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_URL}/api/events/team-analysis/${type}/${teamName}`
        );
  
        const result = await res.json();
        setData(result);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [teamName, type]);

  if (loading) return <h2>Loading...</h2>;
  if (!data) return <h2>No Data</h2>;

  /* ================= DONUT ================= */
  const time = data?.timeAllocation || {};
  const total =
    (time.coding || 0) +
    (time.meetings || 0) +
    (time.research || 0) +
    (time.planning || 0);

  const percent = total ? (time.coding / total) * 100 : 0;

  const radius = 56;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  /* ================= CHART ================= */
  const metricData = {
    labels: ["WEEK 1", "WEEK 2", "WEEK 3", "WEEK 4"],
    datasets: [
      {
        label: "COMMITS",
        data: data?.metricComparison?.commits || [],
        borderColor: "#0aa89e",
        tension: 0.45,
        borderWidth: 3,
        pointRadius: 0,
      },
      {
        label: "DESIGN TASKS",
        data: data?.metricComparison?.designTasks || [],
        borderColor: "#7adaca",
        tension: 0.45,
        borderWidth: 3,
        pointRadius: 0,
      },
    ],
  };

  const metricOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top", align: "end" },
    },
    scales: {
      x: { grid: { display: false } },
      y: { display: false },
    },
  };

  /* ================= PDF ================= */
  const exportPDF = async () => {
    const canvas = await html2canvas(wrapperRef.current, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("team-analysis.pdf");
  };

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      {/* HEADER */}
      <div className={styles.header}>
        <h2 className={styles.title}>Team Analysis</h2>
        <button className={styles.primaryBtn} onClick={exportPDF}>
          Export Report
        </button>
      </div>

      {/* CARDS */}
      <div className={styles.cards}>
        <Card
          title="SYNERGY SCORE"
          value={`${data?.synergyScore?.value || 0}%`}
          delta={data?.synergyScore?.delta || "0%"}
          positive={data?.synergyScore?.delta?.includes("+")}
          bars={barData.synergy}
        />
        <Card
          title="VELOCITY"
          value={data?.velocity?.value || 0}
          sub="pts"
          delta={data?.velocity?.delta || "0%"}
          positive={data?.velocity?.delta?.includes("+")}
          bars={barData.velocity}
        />
        <Card
          title="SKILL GAP"
          value={`${data?.skillGap?.value || 0}%`}
          delta={data?.skillGap?.delta || "0%"}
          positive={data?.skillGap?.delta?.includes("+")}
          bars={barData.skill}
        />
        <Card
          title="HAPPINESS INDEX"
          value={data?.happinessIndex?.value || 0}
          sub="/10"
          delta={data?.happinessIndex?.delta || "0%"}
          positive={data?.happinessIndex?.delta?.includes("+")}
          bars={barData.happiness}
        />
      </div>

      {/* MAIN GRID */}
      <div className={styles.mainGrid}>
  <div className={styles.leftColumn}>
          {/* GRAPH */}
          <div className={styles.metricWrapper}>
            <div className={styles.metricCard}>
              <h3>Metric Comparison</h3>
              <div className={styles.chartWrap}>
                <Line data={metricData} options={metricOptions} />
              </div>
            </div>
          </div>

          {/* TIME + STACK */}
          <div className={styles.lowerWrapper}>
            <div className={styles.lowerCard}>
              <h4 className={styles.lowerTitle}>Time Allocation</h4>

              <div className={styles.donutWrap}>
                <svg width="140" height="140" viewBox="0 0 140 140">
                  <circle cx="70" cy="70" r={radius} className={styles.donutBg} />
                  <circle
                    cx="70"
                    cy="70"
                    r={radius}
                    className={styles.donutFg}
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                  />
                </svg>

                <div className={styles.donutCenter}>
                  <h3>{Math.round(percent)}%</h3>
                  <p>CODING</p>
                </div>
              </div>

              <div className={styles.legend}>
                <span><i className={styles.l1}/> Coding ({time.coding || 0}h)</span>
                <span><i className={styles.l2}/> Meetings ({time.meetings || 0}h)</span>
                <span><i className={styles.l3}/> Research ({time.research || 0}h)</span>
                <span><i className={styles.l4}/> Planning ({time.planning || 0}h)</span>
              </div>
            </div>

            <div className={styles.lowerCard}>
              <h4 className={styles.lowerTitle}>Stack Proficiency</h4>
              {data?.stackProficiency?.map((item, i) => (
                <Stack key={i} label={item.label} value={item.value} />
              ))}
            </div>
          </div>
        </div>

        {/* RECENT ACTIVITY */}
        <RecentActivity activities={data?.recentActivities || []} />
      </div>
    </div>
  );
}

/* CARD */
function Card({ title, value, sub, delta, positive, bars }) {
  return (
    <div className={styles.card}>
      <p className={styles.cardTitle}>{title}</p>
      <div className={styles.cardBody}>
        <div>
          <h3>{value} {sub}</h3>
          <p className={positive ? styles.positive : styles.negative}>
            {delta}
          </p>
        </div>
        <Bars bars={bars} />
      </div>
    </div>
  );
}

function Bars({ bars }) {
  return (
    <div className={styles.barGroup}>
      {bars.map((b, i) => (
        <div key={i} className={`${styles.bar} ${styles[b]}`} />
      ))}
    </div>
  );
}

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

function RecentActivity({ activities }) {
  return (
    <div className={styles.activityCard}>
      <h4>Recent Activity</h4>
      <ul className={styles.activityList}>
        {activities.map((act, i) => (
          <li key={i}>
            <strong>{act.name}</strong> {act.action} <span>{act.target}</span>
            <p>{act.time}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}