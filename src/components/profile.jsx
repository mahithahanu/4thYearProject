// import { useState, useRef, useEffect } from "react";
// import styles from "./Profile.module.css";
// import { Trophy, Calendar } from "lucide-react";

// /* ---------- STATIC DATA (PURE DATA ONLY) ---------- */

// const DATA = {
//   menu: ["Dashboard", "Hackathons", "Projects"],

//   user: {
//     name: "Jane Smith",
//     role: "Software Developer | AI Enthusiast",
//     location: "📍 San Francisco, CA",
//     plan: "PRO ACCOUNT",
//     avatar: "JS",

//     email: "mailto:jane.smith@gmail.com",
//     linkedin: "https://www.linkedin.com/in/janesmith",
//     github: "https://github.com/janesmith",
//   },

//   dashboard: {
//     about:
//       "Aspiring software architect with a focus on machine learning and scalable cloud systems.",
//     skills: [
//       "React",
//       "Python",
//       "TensorFlow",
//       "AWS",
//       "UI/UX",
//       "Node.js",
//       "PostgreSQL",
//       "Docker",
//       "Kubernetes",
//     ],
//     stats: [
//       { value: 12, label: "Hackathons Joined" },
//       { value: 24, label: "Projects Completed" },
//     ],
//   },

//   hackathons: {
//     list: [
//       {
//         tier: "GOLD TIER",
//         title: "Global AI Hack 2024",
//         date: "Dec 15–18 · Virtual Event",
//         role: "Lead Developer",
//         pending: false,
//       },
//       {
//         tier: "OPEN SOURCE",
//         title: "Distributed Data Fest",
//         date: "Jan 10–14 · San Francisco",
//         role: "Backend Contributor",
//         pending: true,
//       },
//     ],
//     highlight: {
//       title: "✨ Portfolio V3 Redesign",
//       description:
//         "Building a next-gen developer portfolio using Three.js and headless CMS.",
//       progress: "65%",
//     },
//   },

//   projects: {
//     list: [
//       {
//         status: "IN PROGRESS",
//         title: "SkillSync Team Formation",
//         description: "AI-based student team recommendation system",
//         role: "Full Stack Developer",
//         pending: false,
//       },
//       {
//         status: "COMPLETED",
//         title: "Bus Metrics Dashboard",
//         description: "Real-time bus in/out tracking using MERN",
//         role: "Frontend & Backend",
//         pending: true,
//       },
//     ],
//     highlight: {
//       title: "🚀 ALL AGE HUB",
//       description:
//         "A unified platform serving kids, adults, and elders with learning, jobs, travel, and devotional content.",
//       progress: "100%",
//     },
//   },
// };

// /* ---------- COMPONENT ---------- */

// export default function Profile() {
//   const [activePage, setActivePage] = useState("Dashboard");
//   const [openLogout, setOpenLogout] = useState(false);
//   const userRef = useRef(null);

//   const handleLogout = () => {
//     localStorage.clear();
//     window.location.href = "/login";
//   };

//   useEffect(() => {
//     const close = (e) => {
//       if (userRef.current && !userRef.current.contains(e.target)) {
//         setOpenLogout(false);
//       }
//     };
//     document.addEventListener("mousedown", close);
//     return () => document.removeEventListener("mousedown", close);
//   }, []);

//   return (
//     <div className={styles.layout}>
//       {/* Sidebar */}
//       <aside className={styles.sidebar}>
//         <div className={styles.brand}>
//           <div className={styles.brandIcon}>S</div>
//           <div>
//             <h3>StudentPortal</h3>
//             <p>v2.4.0</p>
//           </div>
//         </div>

//         <ul className={styles.menu}>
//           {DATA.menu.map((item) => (
//             <li
//               key={item}
//               className={activePage === item ? styles.active : ""}
//               onClick={() => setActivePage(item)}
//             >
//               {item}
//             </li>
//           ))}
//         </ul>

//         {/* USER + LOGOUT */}
//         <div
//           className={styles.user}
//           ref={userRef}
//           onClick={() => setOpenLogout(!openLogout)}
//         >
//           <div className={styles.avatarSmall}>{DATA.user.avatar}</div>
//           <div>
//             <h4>{DATA.user.name}</h4>
//             <p>{DATA.user.plan}</p>
//           </div>

//           {openLogout && (
//             <div className={styles.logoutBox}>
//               <button onClick={handleLogout}>Logout</button>
//             </div>
//           )}
//         </div>
//       </aside>

//       {/* Main */}
//       <main className={styles.main}>
//         {/* Header */}
//         <div className={styles.header}>
//           <div className={styles.profile}>
//             <div className={styles.avatar}>{DATA.user.avatar}</div>
//             <div>
//               <h1>{DATA.user.name}</h1>
//               <p>{DATA.user.role}</p>
//               <span>{DATA.user.location}</span>
//             </div>
//           </div>

//           <div className={styles.actions}>
//             <button
//               className={styles.actionBtn}
//               onClick={() => window.open(DATA.user.email)}
//             >
//               Email
//             </button>
//             <button
//               className={styles.actionBtn}
//               onClick={() => window.open(DATA.user.linkedin, "_blank")}
//             >
//               LinkedIn
//             </button>
//             <button
//               className={styles.actionBtn}
//               onClick={() => window.open(DATA.user.github, "_blank")}
//             >
//               GitHub
//             </button>
//           </div>
//         </div>

//         {/* DASHBOARD */}
//         {activePage === "Dashboard" && (
//           <div className={styles.fullPage}>
//             <section className={styles.card}>
//               <h3>About Me</h3>
//               <p>{DATA.dashboard.about}</p>
//             </section>

//             <section className={styles.card}>
//               <h3>Skills</h3>
//               <div className={styles.skills}>
//                 {DATA.dashboard.skills.map((skill) => (
//                   <span key={skill}>{skill}</span>
//                 ))}
//               </div>
//             </section>

//             <div className={styles.stats}>
//               <div className={styles.statBox}>
//                 <Trophy style={{transform:"none"}}/>
//                 <h2>{DATA.dashboard.stats[0].value}</h2>
//                 <p>{DATA.dashboard.stats[0].label}</p>
//               </div>

//               <div className={styles.statBox}>
//                 <Calendar style={{transform:"none"}}/>
//                 <h2>{DATA.dashboard.stats[1].value}</h2>
//                 <p>{DATA.dashboard.stats[1].label}</p>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* HACKATHONS */}
//         {activePage === "Hackathons" && (
//           <div className={styles.fullPage}>
//             <section className={styles.card}>
//               <h3>Hackathons</h3>
//               {DATA.hackathons.list.map((h, i) => (
//                 <div key={i} className={styles.event}>
//                   <div>
//                     <span className={h.pending ? styles.badgeGray : styles.badge}>
//                       {h.tier}
//                     </span>
//                     <h4>{h.title}</h4>
//                     <p>{h.date}</p>
//                     <small>Role: {h.role}</small>
//                   </div>
//                   <button className={h.pending ? styles.pending : ""}>
//                     {h.pending ? "Application Pending" : "Project Details"}
//                   </button>
//                 </div>
//               ))}
//             </section>

//             <section className={styles.projectHighlight}>
//               <h3>{DATA.hackathons.highlight.title}</h3>
//               <p>{DATA.hackathons.highlight.description}</p>
//               <div className={styles.progress}>
//                 <div style={{ width: DATA.hackathons.highlight.progress }} />
//               </div>
//               <button className={styles.launch}>Launch Studio</button>
//             </section>
//           </div>
//         )}

//         {/* PROJECTS */}
//         {activePage === "Projects" && (
//           <div className={styles.fullPage}>
//             <section className={styles.card}>
//               <h3>Projects</h3>
//               {DATA.projects.list.map((p, i) => (
//                 <div key={i} className={styles.event}>
//                   <div>
//                     <span className={p.pending ? styles.badgeGray : styles.badge}>
//                       {p.status}
//                     </span>
//                     <h4>{p.title}</h4>
//                     <p>{p.description}</p>
//                     <small>Role: {p.role}</small>
//                   </div>
//                   <button className={p.pending ? styles.pending : ""}>
//                     {p.pending ? "Completed" : "View Project"}
//                   </button>
//                 </div>
//               ))}
//             </section>

//             <section className={styles.projectHighlight}>
//               <h3>{DATA.projects.highlight.title}</h3>
//               <p>{DATA.projects.highlight.description}</p>
//               <div className={styles.progress}>
//                 <div style={{ width: DATA.projects.highlight.progress }} />
//               </div>
//               <button className={styles.launch}>Open Project</button>
//             </section>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import styles from "./profile.module.css";
import { Trophy, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
export default function Profile() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [openLogout, setOpenLogout] = useState(false);
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const userRef = useRef(null);
   const userEmail = localStorage.getItem("userEmail");


  useEffect(() => {
    axios
      .get(`http://localhost:8003/api/profile?email=${userEmail}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    const close = (e) => {
      if (userRef.current && !userRef.current.contains(e.target)) {
        setOpenLogout(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  if (!data) return <h2>Loading...</h2>;

  return (
    <div className={styles.layout}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <ul className={styles.menu}>
          {["Dashboard", "Hackathons", "Projects"].map((item) => (
            <li
              key={item}
              className={activePage === item ? styles.active : ""}
              onClick={() => setActivePage(item)}
            >
              {item}
            </li>
          ))}
        </ul>

        {/* User + Logout */}
        <div
          className={styles.user}
          ref={userRef}
          onClick={() => setOpenLogout(!openLogout)}
        >
          <div className={styles.avatarSmall}>{data.avatar}</div>
          <div>
            <h4>{data.name}</h4>
            <p>{data.plan}</p>
          </div>

          {openLogout && (
            <div className={styles.logoutBox}>
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </aside>

      {/* Main */}
      <main className={styles.main}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.profile}>
            <div className={styles.avatar}>{data.avatar}</div>
            <div>
              <h1>{data.name}</h1>
              <p>{data.role}</p>
              <span>{data.location}</span>
            </div>
          </div>

          <div className={styles.actions}>
            <button
              className={styles.actionBtn}
              onClick={() => window.open(`mailto:${data.email}`)}
            >
              Email
            </button>
            <button
              className={styles.actionBtn}
              onClick={() => window.open(data.linkedin, "_blank")}
            >
              LinkedIn
            </button>
            <button
              className={styles.actionBtn}
              onClick={() => window.open(data.github, "_blank")}
            >
              GitHub
            </button>
          </div>
        </div>

        {/* Dashboard */}
        {activePage === "Dashboard" && (
          <div className={styles.fullPage}>
            <section className={styles.card}>
              <h3>About Me</h3>
              <p>{data.about}</p>
            </section>

            <section className={styles.card}>
              <h3>Skills</h3>
              <div className={styles.skills}>
                {(data.skills || []).map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
            </section>

            <div className={styles.stats}>
              {(data.stats || []).map((stat, i) => (
                <div key={i} className={styles.statBox}>
                  {i === 0 ? <Trophy /> : <Calendar />}
                  <h2>{stat.value}</h2>
                  <p>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Hackathons */}
        {activePage === "Hackathons" && (
          <div className={styles.fullPage}>
            <section className={styles.card}>
              <h3>Hackathons</h3>
              {(data.hackathons || []).map((h, i) => (
                <div key={i} className={styles.event}>
                  <div>
                    <span>{h.tier}</span>
                    <h4>{h.title}</h4>
                    <p>{h.date}</p>
                    <small>Role: {h.role}</small>
                  </div>
                  <button>
                    {h.pending ? "Application Pending" : "Project Details"}
                  </button>
                </div>
              ))}
            </section>

            {data.hackathonHighlight && (
              <section className={styles.projectHighlight}>
                <h3>{data.hackathonHighlight.title}</h3>
                <p>{data.hackathonHighlight.description}</p>
                <div className={styles.progress}>
                  <div
                    style={{ width: data.hackathonHighlight.progress }}
                  />
                </div>
              </section>
            )}
          </div>
        )}

        {/* Projects */}
        {activePage === "Projects" && (
          <div className={styles.fullPage}>
            <section className={styles.card}>
              <h3>Projects</h3>
              {(data.projects || []).map((p, i) => (
                <div key={i} className={styles.event}>
                  <div>
                    <span>{p.status}</span>
                    <h4>{p.title}</h4>
                    <p>{p.description}</p>
                    <small>Role: {p.role}</small>
                  </div>
                  <button>
                    {p.pending ? "Completed" : "View Project"}
                  </button>
                </div>
              ))}
            </section>

            {data.projectHighlight && (
              <section className={styles.projectHighlight}>
                <h3>{data.projectHighlight.title}</h3>
                <p>{data.projectHighlight.description}</p>
                <div className={styles.progress}>
                  <div
                    style={{ width: data.projectHighlight.progress }}
                  />
                </div>
              </section>
            )}
          </div>
        )}
      </main>
    </div>
  );
}