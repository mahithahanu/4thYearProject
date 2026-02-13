import React from "react";
import styles from "./OrganizerServices.module.css"; // CSS Module import
import {
  MessageSquare,
  Building2,
  BarChart3,
  Users,
  GraduationCap,
  LineChart
} from "lucide-react";


export default function OrganizerWorkingProcess() {
  const steps = [
    {
      title: "Team Analysis",
      description: "Collaborate instantly with your team through smart, real-time messaging.",
      icon: <MessageSquare size={28} />,
    },
    {
      title: "Participant Analysis",
      description: "A centralized space to plan, prioritize, and execute your tasks.",
      icon:<Building2 size={28} />,
    },
    {
      title: "Edit Team Details",
      description: "Get a clear, visual snapshot of your project’s current status.",
      icon: <BarChart3 size={28} />,
    }, {
      title: "Creating Hackathon",
      description: "Instantly view team structure, roles, and responsibilities.",
      icon: <Users size={28} />,
    },
   
  ];

  return (
    <section className={styles.workingProcess}>
      <h2 className={styles.heading}>Our Working Process</h2>
      <div className={styles.steps}>
        {steps.map((step, index) => (
          <div className={styles.stepCard} key={index}>
            <div className={styles.icon}>{step.icon}</div>
            <h3 className={styles.stepTitle}>{step.title}</h3>
            <p className={styles.stepDescription}>{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}