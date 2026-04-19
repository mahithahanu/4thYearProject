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
  const [loading, setLoading] = useState(false);

  /* ================= FETCH MEMBERS ================= */

  useEffect(() => {
    fetchMembers();
  }, [search]);

  const fetchMembers = async () => {
  try {

    setLoading(true);

    const user = JSON.parse(localStorage.getItem("user"));

    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/members/members`,
      {
        params: {
          email: user.email,
          search: search
        }
      }
    );

    setMembers(res.data);

    if (res.data.length > 0) {
      setSelectedMember(res.data[0]);
    } else {
      setSelectedMember(null);
    }

  } catch (err) {
    console.error("Failed to fetch members:", err);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className={styles.wrapper}>

      {/* ================= SIDEBAR ================= */}

      <aside className={styles.sidebar}>

        <input
          className={styles.search}
          placeholder="Search members..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className={styles.memberList}>

          {loading && <p>Loading members...</p>}

          {!loading && members.length === 0 && (
            <p>No members found</p>
          )}

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

            </div>
          ))}

        </div>
      </aside>

      {/* ================= MAIN ================= */}

      <main className={styles.main}>

        {selectedMember ? (
          <>

            {/* PROFILE HEADER */}

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

                  {selectedMember.overall_score && (
                    <span className={styles.score}>
                      Score: {selectedMember.overall_score}
                    </span>
                  )}

                </div>

                {/* SOCIAL LINKS */}

                <div className={styles.socials}>

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


            {/* CONTENT */}

            <div className={styles.content}>

              {/* LEFT SIDE */}

              <div>

                <h3>Top Skills</h3>

                {selectedMember.skills?.length > 0 ? (
                  selectedMember.skills.map((skill, index) => (
                    <Skill
                      key={index}
                      name={skill.name}
                      value={skill.value}
                    />
                  ))
                ) : (
                  <p>No skills available</p>
                )}


                {/* CORE COMPETENCIES */}

                <div className={styles.core}>

                  <h4 style={{ color: "#009688" }}>
                    CORE COMPETENCIES
                  </h4>

                  <div className={styles.tags}>

                    {selectedMember.skills?.map((skill, index) => (
                      <span key={index}>{skill.name}</span>
                    ))}

                  </div>

                </div>

              </div>


              {/* RIGHT SIDE */}

              <div>

                <h3>Professional Experience</h3>

                {selectedMember.experience?.length > 0 ? (
                  selectedMember.experience.map((exp, index) => (
                    <Timeline
                      key={index}
                      year={exp.year}
                      title={exp.title}
                      company={exp.company}
                      desc={exp.desc}
                    />
                  ))
                ) : (
                  <p>No experience data</p>
                )}

              </div>

            </div>

          </>
        ) : (
          <p>Select a member to view profile</p>
        )}

      </main>

    </div>
  );
}


/* ================= SKILL COMPONENT ================= */

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


/* ================= EXPERIENCE TIMELINE ================= */

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