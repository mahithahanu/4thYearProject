import styles from "./TeamInfo.module.css";
import { useState } from "react";
const getInitials = (name) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
const members = [
  {
    name: "Alex Rivera",
    email: "alex.rivera@skillsync.com",
    role: "Senior Developer",
    location: "San Francisco, CA",
    isYou: true,
    skills: [
      { name: "React & Next.js", value: 94 },
      { name: "TypeScript", value: 88 },
      { name: "Node.js / Backend", value: 82 },
      { name: "UI Architecture", value: 75 },
    ],
    experience: [
      {
        year: "2021 – PRESENT",
        title: "Senior Software Engineer",
        company: "SkillSync · San Francisco",
        desc: "Led frontend architecture using Next.js."
      },
      {
        year: "2018 – 2021",
        title: "Full Stack Developer",
        company: "Innovate Tech · Seattle",
        desc: "Built real-time dashboards."
      },
      
    ]

  },
  {
    name: "Jamie Chen",
    email: "jamie.chen@skillsync.com",
    role: "UI Designer",
    location: "New York, NY",
    skills: [
      { name: "Figma", value: 92 },
      { name: "UI Design", value: 90 },
      { name: "UX Research", value: 85 },
      { name: "Design Systems", value: 80 },
    ],
    experience: [
      {
        year: "2020 – PRESENT",
        title: "Lead UI Designer",
        company: "Creative Labs · NY",
        desc: "Designed scalable design systems."
      },  {
        year: "2021 – PRESENT",
        title: "Senior Software Engineer",
        company: "SkillSync · San Francisco",
        desc: "Led frontend architecture using Next.js."
      },
      {
        year: "2018 – 2021",
        title: "Full Stack Developer",
        company: "Innovate Tech · Seattle",
        desc: "Built real-time dashboards."
      }
    ]
  },
  
  {
    name: "Jordan Smith",
    email: "jordan.smith@skillsync.com",
    role: "Product Manager",
    location: "Austin, TX",
    skills: [
      { name: "Product Strategy", value: 90 },
      { name: "Roadmapping", value: 88 },
      { name: "Analytics", value: 82 },
      { name: "Stakeholder Mgmt", value: 85 },
    ],
    experience: [
      {
        year: "2019 – PRESENT",
        title: "Senior Product Manager",
        company: "VisionWorks · Austin",
        desc: "Led product roadmaps and cross-team execution."
      },
      {
        year: "2018 – 2021",
        title: "Full Stack Developer",
        company: "Innovate Tech · Seattle",
        desc: "Built real-time dashboards."
      }
    ]
  },
  
  
];

export default function Profile() {
  const [search, setSearch] = useState("");
  const [selectedMember, setSelectedMember] = useState(members[0]);

  const filteredMembers = members.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.wrapper}>
      {/* SIDEBAR */}
      <aside className={styles.sidebar}>
        {/* <h2 className={styles.logo}>SkillSync</h2> */}

        <input
          className={styles.search}
          placeholder="Search members..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className={styles.memberList}>
          {filteredMembers.map((m) => (
            <div
            key={m.email}
            className={`${styles.member} ${
                selectedMember.email === m.email ? styles.active : ""
              }`}
              onClick={() => setSelectedMember(m)}
            >
<div className={styles.avatar}>
  {getInitials(m.name)}
</div>

              <div className={styles.memberInfo}>
                <p className={styles.memberName}>{m.name}</p>
                <p className={styles.memberRole}>{m.role}</p>
              </div>

              {m.isYou && <span className={styles.youBadge}>YOU</span>}
            </div>
          ))}
        </div>
      </aside>

      {/* MAIN */}
      <main className={styles.main}>
        {/* HEADER */}
        <div className={styles.header}>
        <div className={styles.profileCircle}>
  {getInitials(selectedMember.name)}
</div>


          <div className={styles.headerInfo}>
            <h1>{selectedMember.name}</h1>
            <p className={styles.email}>{selectedMember.email}</p>

            <div className={styles.meta}>
              <span className={styles.badge}>
                {selectedMember.role.toUpperCase()}
              </span>
              <span className={styles.location}>
                {selectedMember.location}
              </span>
            </div>

            <div className={styles.socials}>
              <a href="#" className={styles.linkedin}>
                LinkedIn
              </a>
              <a href="#" className={styles.github}>
                GitHub
              </a>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className={styles.content}>
          {/* LEFT */}
          <div>
            <h3>Top Skills</h3>

            {selectedMember.skills.map((skill) => (
              <Skill
                key={skill.name}
                name={skill.name}
                value={skill.value}
              />
            ))}

            <div className={styles.core}>
              <h4 style={{color:"#009688"}}>CORE COMPETENCIES</h4>
              <div className={styles.tags}>
                <span>System Design</span>
                <span>Cloud Architecture</span>
                <span>Agile</span>
                <span>CI/CD</span>
                <span>Leadership</span>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div>
          <h3>Professional Experience</h3>

{selectedMember.experience?.map((exp, index) => (
  <Timeline
    key={index}
    year={exp.year}
    title={exp.title}
    company={exp.company}
    desc={exp.desc}
  />
))}
          </div>
        </div>
      </main>
    </div>
  );
}

function Skill({ name, value }) {
  return (
    <div className={styles.skill}>
      <div className={styles.skillHeader}>
        <span>{name}</span>
        <span>{value}%</span>
      </div>
      <div className={styles.bar}>
        <div className={styles.fill} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}
function Timeline({ year, title, company, desc }) {
  return (
    <div className={styles.timeline}>
      <div className={styles.line} />
      <div className={styles.circle} />
      <div className={styles.timelineContent}>
        <span className={styles.year}>{year}</span>
        <h4 className={styles.title}>{title}</h4>
        <p className={styles.company}>{company}</p>
        <p className={styles.desc}>{desc}</p>
      </div>
    </div>
  );
}