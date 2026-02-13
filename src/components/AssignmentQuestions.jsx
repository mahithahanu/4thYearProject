import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AssignmentQuestions.module.css";

const questions = [
  {
    question: "How do you usually approach a complex technical problem?",
    options: [
      "Break it into smaller, manageable tasks",
      "Research existing solutions and documentation",
      "Plan multiple approaches before coding",
      "Start prototyping and learn through iteration",
    ],
  },
  {
    question: "When working in a team, what role do you naturally take?",
    options: [
      "Organizer who keeps everyone aligned",
      "Problem-solver who tackles tough issues",
      "Supporter who helps wherever needed",
      "Visionary who suggests ideas and improvements",
    ],
  },
  {
    question: "How do you respond when a solution you tried doesn’t work?",
    options: [
      "Analyze what failed and adjust systematically",
      "Look for alternative solutions or references",
      "Ask teammates for feedback",
      "Quickly try a different approach",
    ],
  },
  {
    question: "How comfortable are you with learning new tools or technologies?",
    options: [
      "Very comfortable and enjoy learning",
      "Comfortable with good documentation",
      "Prefer tools I already know",
      "Only learn when absolutely necessary",
    ],
  },
  {
    question: "How do you usually manage deadlines?",
    options: [
      "Plan early and track progress",
      "Work steadily and adapt",
      "Perform best under pressure",
      "Rely on team coordination",
    ],
  },
  {
    question: "When conflicts arise in a team, what do you do?",
    options: [
      "Mediate and find a fair solution",
      "Focus on facts and logic",
      "Avoid conflict when possible",
      "Let the team lead handle it",
    ],
  },
  {
    question: "How do you prefer to communicate with teammates?",
    options: [
      "Frequent updates and discussions",
      "Only when necessary",
      "Written messages or docs",
      "Planned meetings only",
    ],
  },
  {
    question: "What motivates you the most during a project?",
    options: [
      "Solving challenging problems",
      "Learning something new",
      "Building something impactful",
      "Working with a strong team",
    ],
  },
  {
    question: "How do you handle feedback on your work?",
    options: [
      "Actively seek and apply it",
      "Accept if constructive",
      "Prefer minimal feedback",
      "Reflect privately before acting",
    ],
  },
  {
    question: "If a teammate is struggling, what do you do?",
    options: [
      "Offer help proactively",
      "Share resources",
      "Inform the team lead",
      "Focus on my tasks unless asked",
    ],
  },
  {
    question: "How do you make decisions in uncertain situations?",
    options: [
      "Analyze data and outcomes",
      "Trust intuition",
      "Discuss with teammates",
      "Run a quick experiment",
    ],
  },
  {
    question: "What will your availability be during the hackathon?",
    options: [
      "Fully available for entire duration",
      "Available most of the time",
      "Available only during specific hours",
      "Limited availability due to commitments",
    ],
  },
];

export default function Assessment() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState(
    Array(questions.length).fill(null)
  );

  const answeredCount = answers.filter(
    (ans) => ans !== null
  ).length;

  const progress = Math.round(
    (answeredCount / questions.length) * 100
  );

  const selectOption = (index) => {
    const updated = [...answers];
    updated[current] = index;
    setAnswers(updated);
  };

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent((prev) => prev + 1);
    } else {
      console.log("Submitted Answers:", answers);

      // 👉 redirect after completion
      navigate("/");
    }
  };

  const handleBack = () => {
    if (current > 0) {
      setCurrent((prev) => prev - 1);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.top}>
          <div>
            <p className={styles.qno}>
              QUESTION {current + 1} OF {questions.length}
            </p>
            <p className={styles.progress}>
              {progress}% Complete
            </p>
          </div>
        </div>

        <h2 className={styles.question}>
          {questions[current].question}
        </h2>

        <div className={styles.options}>
          {questions[current].options.map((opt, index) => (
            <div
              key={index}
              className={`${styles.option} ${
                answers[current] === index
                  ? styles.active
                  : ""
              }`}
              onClick={() => selectOption(index)}
            >
              <span className={styles.radio}></span>
              <p>{opt}</p>
            </div>
          ))}
        </div>

        <div className={styles.footer}>
          <button
            className={styles.back}
            disabled={current === 0}
            onClick={handleBack}
          >
            ← BACK
          </button>

          <button
            className={styles.next}
            disabled={answers[current] === null}
            onClick={handleNext}
          >
            {current === questions.length - 1
              ? "FINISH"
              : "NEXT →"}
          </button>
        </div>
      </div>
    </div>
  );
}
