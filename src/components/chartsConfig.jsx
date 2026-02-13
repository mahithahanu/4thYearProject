import { Chart as ChartJS } from "chart.js/auto";

/* ---------- TEAM DATA ---------- */
export const allTeams = [
  {
    name: "Team Alpha",
    score: 98,
    progress: [60, 75, 85, 92, 98],
  },
  {
    name: "Team Beta",
    score: 92,
    progress: [58, 70, 80, 88, 92],
  },
  {
    name: "Team Gamma",
    score: 90,
    progress: [55, 68, 78, 85, 90],
  },
  {
    name: "Team Delta",
    score: 88,
    progress: [52, 65, 75, 82, 88],
  },
  {
    name: "Team Epsilon",
    score: 86,
    progress: [50, 62, 72, 80, 86],
  },
];

const top5 = [...allTeams];

/* ---------- LINE ---------- */
export const lineData = {
  labels: ["Ideation", "Development", "Prototype", "Final Pitch", "Ends"],
  datasets: top5.map((team, index) => ({
    label: team.name,
    data: team.progress,
    borderColor: [
      "#14b8a6",
      "#06b6d4",
      "#22c55e",
      "#f59e0b",
      "#6366f1",
    ][index],
    tension: 0.4,
    pointRadius: 4,
  })),
};

/* ---------- BAR ---------- */
export const barData = {
  labels: [
    "Innovation",
    "Technical",
    "Impact",
    "Presentation",
  ],
  datasets: [
    {
      data: [8.5, 8.2, 7.9, 8.7],
      backgroundColor: "#14b8a6",
      borderRadius: 8,
    },
  ],
};

/* ---------- RADAR ---------- */
export const radarData = {
  labels: [
    "Problem Solving",
    "Innovation",
    "Tech Skills",
    "Teamwork",
    "Presentation",
  ],
  datasets: top5.map((team, index) => ({
    label: team.name,
    data: team.progress.map((v) => v - 50),
    borderColor: [
      "#14b8a6",
      "#06b6d4",
      "#22c55e",
      "#f59e0b",
      "#6366f1",
    ][index],
    backgroundColor: "rgba(20,184,166,0.12)",
    borderWidth: 2,
  })),
};

/* ---------- TECHNOLOGY ---------- */
export const technologyData = [
  { label: "AI", value: 35, color: "#14b8a6" },
  { label: "IoT", value: 25, color: "#06b6d4" },
  { label: "Blockchain", value: 20, color: "#22c55e" },
  { label: "Other", value: 20, color: "#f59e0b" },
];

export const doughnutData = {
  labels: technologyData.map((t) => t.label),
  datasets: [
    {
      data: technologyData.map((t) => t.value),
      backgroundColor: technologyData.map((t) => t.color),
      borderWidth: 0,
      cutout: "70%",
    },
  ],
};

export const doughnutOptions = {
  plugins: {
    legend: { display: false },
  },
  maintainAspectRatio: false,
};
