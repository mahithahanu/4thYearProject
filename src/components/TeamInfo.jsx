import styles from "./TeamInfo.module.css";
import { useState, useEffect } from "react";
import axios from "axios";

const getInitials = (name) =>
  name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

export default function Profile() {
  const [search, setSearch] = useState("");
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);

  // FETCH MEMBERS
  useEffect(() => {
    fetchMembers();
  }, [search]);

  const fetchMembers = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8003/api/members?search=${search}`
      );
      setMembers(res.data);

      if (res.data.length > 0 && !selectedMember) {
        setSelectedMember(res.data[0]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.wrapper}>
      {/* SIDEBAR */}
      <aside className={styles.sidebar}>
        <input
          className={styles.search}
          placeholder="Search members..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className={styles.memberList}>
          {members.map((m) => (
            <div
              key={m._id}
              className={`${styles.member} ${
                selectedMember?._id === m._id ? styles.active : ""
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

              {m.isYou && (
                <span className={styles.youBadge}>YOU</span>
              )}
            </div>
          ))}
        </div>
      </aside>

      {/* MAIN */}
      <main className={styles.main}>
        {selectedMember && (
          <>
            <div className={styles.header}>
              <div className={styles.profileCircle}>
                {getInitials(selectedMember.name)}
              </div>

              <div className={styles.headerInfo}>
                <h1>{selectedMember.name}</h1>
                <p className={styles.email}>
                  {selectedMember.email}
                </p>

                <div className={styles.meta}>
                  <span className={styles.badge}>
                    {selectedMember.role?.toUpperCase()}
                  </span>
                  <span className={styles.location}>
                    {selectedMember.location}
                  </span>
                </div>

                <div className={styles.socials}>
  {selectedMember.linkedin && (
    <a
      href={selectedMember.linkedin}
      target="_blank"
      rel="noreferrer"
      className={styles.socialBtn}
    >
      LinkedIn
    </a>
  )}

  {selectedMember.github && (
    <a
      href={selectedMember.github}
      target="_blank"
      rel="noreferrer"
      className={styles.socialBtn}
    >
      GitHub
    </a>
  )}
</div>
              </div>
            </div>

            <div className={styles.content}>
              {/* LEFT */}
              <div>
                <h3>Top Skills</h3>

                {selectedMember.skills?.map((skill) => (
                  <Skill
                    key={skill._id}
                    name={skill.name}
                    value={skill.value}
                  />
                ))}

                <div className={styles.core}>
                  <h4 style={{ color: "#009688" }}>
                    CORE COMPETENCIES
                  </h4>
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

                {selectedMember.experience?.map(
                  (exp, index) => (
                    <Timeline
                      key={index}
                      year={exp.year}
                      title={exp.title}
                      company={exp.company}
                      desc={exp.desc}
                    />
                  )
                )}
              </div>
            </div>
          </>
        )}
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
        <div
          className={styles.fill}
          style={{ width: `${value}%` }}
        />
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