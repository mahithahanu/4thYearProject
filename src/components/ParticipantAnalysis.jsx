import { useState, useMemo } from "react";
import styles from "./ParticipantAnalysis.module.css";
import AdvancedFilters from "./AdvancedFilters";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  RadialLinearScale,
} from "chart.js";
import { Line, Radar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  RadialLinearScale
);

const initialParticipants = [
  {
    id: 1,
    name: "John Doe",
    archetype: "Architect",
    initials: "JD",
    skill: "Python",
    skillPercent: 85,
    compatibility: 92,
    checked: true,
    color: "#20E0D1",
  },
  {
    id: 2,
    name: "Alice Smith",
    archetype: "Collaborator",
    initials: "AS",
    skill: "UX Design",
    skillPercent: 94,
    compatibility: 88,
    checked: false,
    color: "#C7F7F2",
  },
  {
    id: 3,
    name: "Erik Kim",
    archetype: "Specialist",
    initials: "EK",
    skill: "Data Engineering",
    skillPercent: 72,
    compatibility: 78,
    checked: true,
    color: "#20E0D1",
  },
  {
    id: 4,
    name: "Robert Jones",
    archetype: "Leader",
    initials: "RJ",
    skill: "Product Strategy",
    skillPercent: 81,
    compatibility: 85,
    checked: false,
    color: "#C7F7F2",
  },
];

export default function SkillTrends() {
  const [participants, setParticipants] = useState(initialParticipants);
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("none"); // none | skill | compatibility
  const [showFilters, setShowFilters] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState(null);


  const toggleCheck = (id) => {
    setParticipants((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, checked: !p.checked } : p
      )
    );
  };

  // 🔎 Search + Sort logic
  const filteredParticipants = useMemo(() => {
    let list = [...participants];

    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.skill.toLowerCase().includes(q) ||
          p.archetype.toLowerCase().includes(q)
      );
    }

    if (sortBy === "skill") {
      list.sort((a, b) => b.skillPercent - a.skillPercent);
    }

    if (sortBy === "compatibility") {
      list.sort((a, b) => b.compatibility - a.compatibility);
    }

    return list;
  }, [participants, query, sortBy]);

  const selected = filteredParticipants.filter((p) => p.checked);


  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { display: false } },
      y: { display: false },
    },
  };

  const radarData = {
    labels: ["TECHNICAL", "COMPATIBILITY", "TECH SKILL", "CONSISTENCY"],
    datasets: selected.map((p) => ({
      label: p.name,
      data: [
        p.skillPercent,
        p.compatibility,
        p.skillPercent,
        p.compatibility,
      ],
      fill: true,
      backgroundColor: "rgba(32,224,209,0.15)",
      borderColor: "#20e0d1",
      pointBackgroundColor: "#20e0d1",
      borderWidth: 2,
    })),
  };

  const radarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      r: {
        angleLines: { color: "#e6ecf2" },
        grid: { color: "#eef2f6" },
        ticks: { display: false },
        pointLabels: {
          color: "#6b7280",
          font: { size: 11, weight: 600 },
        },
        suggestedMin: 0,
        suggestedMax: 100,
      },
    },
  };
  const data = useMemo(() => {
    let baseData = [42, 48, 55, 58, 54, 50, 62, 78, 65, 52, 48, 70];
  
    if (!appliedFilters) {
      return {
        labels: ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"],
        datasets: [
          {
            data: baseData,
            borderColor: "#20e3c2",
            backgroundColor: "rgba(32,227,194,0.2)",
            fill: true,
            tension: 0.45,
            pointRadius: 0,
          },
        ],
      };
    }
  
    const skillBoost = appliedFilters.skills.length * 3;
  
    const personalityBoost =
      (appliedFilters.personalityMetrics.leadership +
        appliedFilters.personalityMetrics.collaboration +
        appliedFilters.personalityMetrics.analytical) / 30;
  
    const availabilityBoost = appliedFilters.availability.current ? 6 : 0;
  
    const multiplier =
      1 + (skillBoost + personalityBoost + availabilityBoost) / 100;
  
    const filteredData = baseData.map((v) =>
      Math.min(100, Math.round(v * multiplier))
    );
  
    return {
      labels: ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"],
      datasets: [
        {
          data: filteredData,
          borderColor: "#20e3c2",
          backgroundColor: "rgba(32,227,194,0.2)",
          fill: true,
          tension: 0.45,
          pointRadius: 0,
        },
      ],
    };
  }, [appliedFilters]);
  const growthStats = useMemo(() => {
    if (!appliedFilters) {
      return {
        growth: 12.4,
        label: "Stable Growth",
        badge: "Baseline",
      };
    }
  
    const skillScore = appliedFilters.skills.length * 2;
    const personalityScore =
      (appliedFilters.personalityMetrics.leadership +
        appliedFilters.personalityMetrics.collaboration +
        appliedFilters.personalityMetrics.analytical) / 60;
  
    const availabilityScore = appliedFilters.availability.current ? 4 : 0;
  
    const totalGrowth = Number(
      (8 + skillScore + personalityScore + availabilityScore).toFixed(1)
    );
  
    return {
      growth: totalGrowth,
      label:
        totalGrowth > 20
          ? "High Acceleration"
          : totalGrowth > 14
          ? "Strong Momentum"
          : "Moderate Growth",
      badge:
        totalGrowth > 20
          ? "Excellent"
          : totalGrowth > 14
          ? "Strong"
          : "Average",
    };
  }, [appliedFilters]);
  
  return (
    <div className={styles.page}>
      <div className={styles.layout}>
        <div className={styles.left}>
          {/* Search + Filters */}
          <div className={styles.searchRow}>
            <input
              className={styles.search}
              placeholder="Search participants..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
  className={styles.advancedInline}
  onClick={() => setShowAdvanced(true)}
>
  Advanced Filters
</button>


          </div>

          {/* Sorting */}
          <div className={styles.sortRow}>
            <span className={styles.sortLabel}>Sort by:</span>
            <button
              onClick={() => setSortBy("skill")}
              className={`${styles.sortBtn} ${
                sortBy === "skill" ? styles.activeSort : ""
              }`}
            >
              Primary Skill %
            </button>
            <button
              onClick={() => setSortBy("compatibility")}
              className={`${styles.sortBtn} ${
                sortBy === "compatibility" ? styles.activeSort : ""
              }`}
            >
              Compatibility %
            </button>
            <button
              onClick={() => setSortBy("none")}
              className={`${styles.sortBtn} ${
                sortBy === "none" ? styles.activeSort : ""
              }`}
            >
              Reset
            </button>
          </div>

          {/* Graph ABOVE cards */}
          <div className={styles.card}>
            <div className={styles.header}>
              <div>
                <p className={styles.subTitle}>
                  GLOBAL PARTICIPANT SKILL TRENDS
                </p>
                <h2>Growth +{growthStats.growth}%</h2>
              </div>
              <span className={styles.badge}>{growthStats.badge}</span>
            </div>
            <div className={styles.chartBox}>
              <Line data={data} options={options} />
            </div>
          </div>

          {/* Cards */}
          <div className={styles.participantsSection}>
            <div className={styles.participantsHeader}>
              <h2>Participant Insight Cards</h2>
              <span className={styles.count}>
                {filteredParticipants.length} Total
              </span>
            </div>

            <div className={styles.grid}>
              {filteredParticipants.map((p) => (
                <div className={styles.participantCard} key={p.id}>
                  <input
                    type="checkbox"
                    checked={p.checked}
                    onChange={() => toggleCheck(p.id)}
                    className={styles.checkbox}
                  />

                  <div className={styles.topRow}>
                    <div
                      className={styles.avatar}
                      style={{ backgroundColor: p.color }}
                    >
                      {p.initials}
                    </div>
                    <div className={styles.info}>
                      <h3>{p.name}</h3>
                      <p>
                        Archetype: <span>{p.archetype}</span>
                      </p>
                    </div>
                  </div>

                  <div className={styles.metricsRow}>
                    <div className={styles.metricBox}>
                      <p className={styles.metricLabel}>
                        PRIMARY SKILL
                      </p>
                      <div className={styles.circleWrap}>
                        <svg className={styles.circle} viewBox="0 0 36 36">
                          <path
                            className={styles.bg}
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          />
                          <path
                            className={styles.progress}
                            strokeDasharray={`${p.skillPercent}, 100`}
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          />
                        </svg>
                        <span className={styles.circleText}>
                          {p.skillPercent}%
                        </span>
                      </div>
                      <p className={styles.skillName}>{p.skill}</p>
                    </div>

                    <div className={styles.metricBox}>
                      <p className={styles.metricLabel}>
                        COMPATIBILITY
                      </p>
                      <div className={styles.compatibilityBars}>
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className={`${styles.vBar} ${
                              i < Math.round(p.compatibility / 20)
                                ? styles.vBarActive
                                : ""
                            }`}
                          />
                        ))}
                      </div>
                      <p className={styles.compatibilityScore}>
                        {p.compatibility}% Score
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredParticipants.length === 0 && (
              <p style={{ padding: "16px", color: "#6b7280" }}>
                No participants match your search.
              </p>
            )}
          </div>
        </div>

        {/* RIGHT */}
        <div className={styles.sidebar}>
          <h3>Selected Comparison</h3>
          <p>Comparing {selected.length} active participants</p>

          {selected.map((p) => (
            <div key={p.id} className={styles.compareItem}>
              <div className={styles.compareAvatar}>{p.initials}</div>
              <div>
                <strong>{p.name}</strong>
                <p>{p.skill}</p>
              </div>
              <span>{p.skillPercent}%</span>
            </div>
          ))}

          {selected.length > 0 && (
            <div className={styles.analysisCard}>
              <p className={styles.analysisTitle}>
                PERFORMANCE MATRIX
              </p>
              <div className={styles.radarWrap}>
                <Radar data={radarData} options={radarOptions} />
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Advanced Filters Slide Panel */}
<div
  className={`${styles.advancedOverlay} ${
    showAdvanced ? styles.open : ""
  }`}
>
<AdvancedFilters
  onApply={(filters) => {
    setAppliedFilters(filters);   // 👈 STORE FILTERS
    setShowAdvanced(false);
  }}
  onClose={() => setShowAdvanced(false)}
/>


</div>

{showAdvanced && (
  <div
    className={styles.backdrop}
    onClick={() => setShowAdvanced(false)}
  />
)}


    </div>
  );
}