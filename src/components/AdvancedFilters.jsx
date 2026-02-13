import { useState } from "react";
import styles from "./AdvancedFilters.module.css";

const allSkills = ["Python", "React", "SQL", "Node", "MongoDB"];

export default function AdvancedFilters({ onApply, onClose }) {
  const [selectedSkills, setSelectedSkills] = useState([
    "Python",
    "React",
    "SQL",
  ]);

  const [metrics, setMetrics] = useState({
    leadership: 80,
    collaboration: 65,
    analytical: 90,
  });

  const [projects, setProjects] = useState({
    hackathons: true,
    innovation: true,
    sustainability: true,
    fintech: false,
  });

  const [availability, setAvailability] = useState({
    current: true,
    partTime: false,
  });

  const toggleSkill = (skill) => {
    setSelectedSkills((prev) =>
      prev.includes(skill)
        ? prev.filter((s) => s !== skill)
        : [...prev, skill]
    );
  };

  const handleMetricChange = (key, value) => {
    setMetrics({ ...metrics, [key]: Number(value) });
  };

  const toggleProject = (key) => {
    setProjects({ ...projects, [key]: !projects[key] });
  };

  const toggleAvailability = (key) => {
    setAvailability({ ...availability, [key]: !availability[key] });
  };

  const clearAll = () => {
    setSelectedSkills([]);
    setMetrics({
      leadership: 0,
      collaboration: 0,
      analytical: 0,
    });
    setProjects({
      hackathons: false,
      innovation: false,
      sustainability: false,
      fintech: false,
    });
    setAvailability({
      current: false,
      partTime: false,
    });
  };

  const applyFilters = () => {
    const filters = {
      skills: selectedSkills,
      personalityMetrics: metrics,
      projectHistory: projects,
      availability,
    };

    onApply && onApply(selectedSkills.length === 0 ? null : filters);
  };

  return (
    <div
      className={styles.container}
      onClick={(e) => e.stopPropagation()}
    >
      {/* HEADER */}
      <div className={styles.header}>
        <h3>Advanced Filters</h3>
        <span
          className={styles.close}
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
        >
          ×
        </span>
      </div>

      {/* CONTENT */}
      <div className={styles.content}>
        {/* TECHNICAL SKILLS 
        <div className={styles.section}>
          <p className={styles.title}>TECHNICAL SKILLS</p>
          <div className={styles.skillChips}>
            {allSkills.map((skill) => (
              <span
                key={skill}
                className={`${styles.chip} ${
                  selectedSkills.includes(skill)
                    ? styles.activeChip
                    : ""
                }`}
                onClick={() => toggleSkill(skill)}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* PERSONALITY METRICS */}
        <div className={styles.section}>
          <p className={styles.title}>PERSONALITY METRICS</p>

          {Object.entries(metrics).map(([key, value]) => (
            <div key={key} className={styles.sliderBlock}>
              <div className={styles.labelRow}>
                <span>
                  {key.replace(/^\w/, (c) => c.toUpperCase())}
                </span>
                <span>{value}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={value}
                onChange={(e) =>
                  handleMetricChange(key, e.target.value)
                }
              />
            </div>
          ))}
        </div>

        {/* PROJECT HISTORY */}
        <div className={styles.section}>
          <p className={styles.title}>PROJECT HISTORY</p>

          <label className={styles.checkbox}>
            <input
              type="checkbox"
              checked={projects.hackathons}
              onChange={() => toggleProject("hackathons")}
            />
            <span>Internal Hackathons</span>
          </label>

          <label className={styles.checkbox}>
            <input
              type="checkbox"
              checked={projects.innovation}
              onChange={() => toggleProject("innovation")}
            />
            <span>Global Open Innovation</span>
          </label>

          <label className={styles.checkbox}>
            <input
              type="checkbox"
              checked={projects.sustainability}
              onChange={() => toggleProject("sustainability")}
            />
            <span>Sustainability Challenge</span>
          </label>

          <label className={styles.checkbox}>
            <input
              type="checkbox"
              checked={projects.fintech}
              onChange={() => toggleProject("fintech")}
            />
            <span>Fintech Sprint</span>
          </label>
        </div>

        {/* AVAILABILITY */}
        <div className={styles.section}>
          <p className={styles.title}>AVAILABILITY</p>

          <div className={styles.toggleRow}>
            <span>Currently Available</span>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={availability.current}
                onChange={() => toggleAvailability("current")}
              />
              <span className={styles.slider}></span>
            </label>
          </div>

          <div className={styles.toggleRow}>
            <span>Part-time Engagement</span>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={availability.partTime}
                onChange={() => toggleAvailability("partTime")}
              />
              <span className={styles.slider}></span>
            </label>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className={styles.footer}>
        <button className={styles.clear} onClick={clearAll}>
          Clear All
        </button>
        <button className={styles.apply} onClick={applyFilters}>
          Apply Filters
        </button>
      </div>
    </div>
    
  );
}