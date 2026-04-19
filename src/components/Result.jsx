import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Result.module.css";
import { FiFileText, FiBarChart2 } from "react-icons/fi";
import { FiAward } from "react-icons/fi";

export default function Result() {

  const [result, setResult] = useState(null);
  const email = localStorage.getItem("userEmail");

  useEffect(() => {
    const fetchResult = async () => {
      try {

        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/resultspage/results/${email}`
        );

        setResult(res.data);

      } catch (error) {
        console.error("Error fetching result:", error);
      }
    };

    fetchResult();
  }, [email]);

  if (!result) return <div className={styles.wrapper}>Loading...</div>;

  const scores = [
    ["Innovation", result.scoringBreakdown.innovation * 10],
    ["Technical Complexity", result.scoringBreakdown.technicalComplexity * 10],
    ["Presentation", result.scoringBreakdown.presentation * 10],
    ["Market Potential", result.scoringBreakdown.marketPotential * 10],
  ];

  const place =
    result.rank === 1
      ? "1st Place Winner"
      : result.rank === 2
      ? "2nd Place Winner"
      : result.rank === 3
      ? "3rd Place Winner"
      : `Rank ${result.rank}`;

  return (
    <div className={styles.wrapper}>
      <div className={styles.topCard}>
        <div className={styles.iconCircle}>
          <FiAward size={26} />
        </div>

        <h1>Congratulations!</h1>
        <h2>{place}</h2>

        <p>Your project performed exceptionally well in this hackathon.</p>
      </div>

      <div className={styles.grid}>
        <div className={styles.leftColumn}>
          <div className={styles.card}>
            <div className={styles.cardTitle}>
              <FiFileText size={18} />
              <span>Project Summary</span>
            </div>

            <h3>{result.project}</h3>

            <p className={styles.description}>
              <strong>Team:</strong> {result.team}
              <br />
              <strong>Email:</strong> {result.email}
            </p>
          </div>
        </div>

        <div className={styles.rightColumn}>
          <div className={styles.card}>
            <div className={styles.cardTitle}>
              <FiBarChart2 size={18} />
              <span>Scoring Breakdown</span>
            </div>

            {scores.map(([label, value]) => (
              <div key={label} className={styles.scoreItem}>
                <div className={styles.scoreTop}>
                  <span>{label}</span>
                  <span className={styles.scoreValue}>
                    {(value / 10).toFixed(1)}/10
                  </span>
                </div>

                <div className={styles.progress}>
                  <div
                    className={styles.progressFill}
                    style={{ width: `${value}%` }}
                  />
                </div>
              </div>
            ))}

            <div className={styles.overallBox}>
              <span>OVERALL SCORE</span>
              <h1>{result.score}</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}