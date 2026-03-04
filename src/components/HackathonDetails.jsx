import { useEffect, useState } from "react";
import styles from "./HackathonDetails.module.css";
import Timeline from "./TimeLine";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaUsers,
  FaGlobe,
  FaMapMarkerAlt,
  FaRegClipboard,
  FaBullseye,
  FaCalendarAlt,
} from "react-icons/fa";

export default function HackathonDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [hackathon, setHackathon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAllowed, setIsAllowed] = useState(false);

  /* ================= FETCH HACKATHON ================= */
  useEffect(() => {
    const fetchHackathon = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("TOKEN 👉", token);
        const email = localStorage.getItem("userEmail");
        console.log("EMAIL 👉", email);

        if (!token) {
          console.error("No token found. User not logged in.");
          setLoading(false);
          return;
        }

        const res = await fetch(
          `http://localhost:8003/api/hackathons/${id}?email=${email}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        if (res.status === 403) {
          console.warn("User not allowed to view this hackathon.");
          setIsAllowed(false);
        } else if (res.status === 401) {
          console.warn("Unauthorized. Invalid token.");
          setIsAllowed(false);
        } else {
          setHackathon(data);
          setIsAllowed(true);
        }

        console.log("HACKATHON DETAILS 👉", data);
      } catch (err) {
        console.error("Error fetching hackathon:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHackathon();
  }, [id]);

  /* ================= COUNTDOWN ================= */
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!hackathon?.hackathonStart) return;

    const targetTime = new Date(hackathon.hackathonStart).getTime();

    const interval = setInterval(() => {
      const now = Date.now();
      const diff = targetTime - now;

      if (diff <= 0) {
        clearInterval(interval);
        setHasStarted(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [hackathon?.hackathonStart]);

  if (loading) return <p className={styles.loading}>Loading details...</p>;
  if (!hackathon) return <p>Hackathon not found</p>;
  if (!isAllowed) return <p>You are not authorized to view this hackathon.</p>;

  /* ================= DERIVED DATA ================= */
  const eventDetails = [
    { icon: FaUsers, value: `${hackathon.teamSize || "N/A"} Participants` },
    { icon: FaGlobe, value: hackathon.mode },
    {
      icon: FaMapMarkerAlt,
      value: hackathon.mode === "offline" ? hackathon.location : "Online",
    },
  ];

  return (
    <div className={styles.page}>
      {/* ================= HERO ================= */}
      <section
        className={styles.heroCard}
        style={{
          backgroundImage: hackathon.banner
            ? `url(http://localhost:8003${hackathon.banner})`
            : "none",
        }}
      >
        <div className={styles.heroOverlay}>
          <span className={styles.badge}>
            {hackathon.registrationEnd &&
            new Date(hackathon.registrationEnd) > new Date()
              ? "REGISTRATION OPEN"
              : "REGISTRATION CLOSED"}
          </span>

          <h1 className={styles.title}>{hackathon.name}</h1>
          <p className={styles.subtitle}>
            Organized by {hackathon.organizer}
          </p>

          <div className={styles.actions}>
            <button
              className={styles.primaryBtn}
              onClick={() =>  navigate(`/studenthackathonform/${id}`)}
              disabled={
                hackathon.registrationEnd &&
                new Date(hackathon.registrationEnd) < new Date()
              }
            >
              Register Now
            </button>

            <button className={styles.secondaryBtn}>View Guide</button>
          </div>
        </div>
      </section>

      {/* ================= COUNTDOWN ================= */}
      <section className={styles.countdownCard}>
        <div>
          <span className={styles.smallText}>
            {hasStarted ? "LIVE NOW" : "STARTS IN"}
          </span>
          <h3>
            {hasStarted ? "Hackathon Started 🚀" : "Countdown to Kickoff"}
          </h3>
        </div>

        {!hasStarted && (
          <div className={styles.timer}>
            {["days", "hours", "minutes", "seconds"].map((unit) => (
              <div key={unit} className={styles.timeBox}>
                <h2>{timeLeft[unit]}</h2>
                <span>{unit.toUpperCase()}</span>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ================= DETAILS GRID ================= */}
      <section className={styles.detailsGrid}>
        <div className={styles.leftCol}>
          <div className={styles.card}>
            <h4>About the Event</h4>
            <p>{hackathon.theme} focused hackathon.</p>

            {hackathon.skills?.length > 0 && (
              <>
                <h5 className={styles.skillsTitle}>Skills Required</h5>
                <div className={styles.skillsWrap}>
                  {hackathon.skills.map((skill, i) => (
                    <span key={i} className={styles.skillChip}>
                      {skill}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className={styles.card}>
            <Timeline />
          </div>

          <div className={styles.rulesGrid}>
            <div className={styles.rulesCard}>
              <div className={styles.rulesHeader}>
                <FaRegClipboard />
                <h4>Rules</h4>
              </div>
              <ul>
                {(hackathon.rules || []).map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>

            <div className={styles.rulesCard}>
              <div className={styles.rulesHeader}>
                <FaBullseye />
                <h4>Eligibility</h4>
              </div>
              <ul>
                <li>{hackathon.eligibilityText}</li>
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.rightCol}>
          <div className={styles.sideCard}>
            <h4>Event Details</h4>
            <ul>
              {eventDetails.map((detail, i) => {
                const Icon = detail.icon;
                return (
                  <li key={i}>
                    <Icon /> {detail.value}
                  </li>
                );
              })}
              <li>
                <FaCalendarAlt />{" "}
                {new Date(hackathon.hackathonStart).toLocaleDateString()}
              </li>
            </ul>

            <button
              className={styles.primaryBtn}
              onClick={() => navigate("/studenthackathonform")}
              disabled={
                !isAllowed || // 🔐 Disable if user not allowed
                (hackathon.registrationEnd &&
                  new Date(hackathon.registrationEnd) < new Date())
              }
            >
              {isAllowed ? "Register Now" : "Not Allowed"}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
