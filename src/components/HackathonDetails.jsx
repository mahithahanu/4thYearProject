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
  const [isRegistered, setIsRegistered] = useState(false);

  /* ================= FETCH HACKATHON ================= */

  useEffect(() => {

    const fetchHackathon = async () => {

      try {

        const token = localStorage.getItem("token");
        const email = localStorage.getItem("userEmail");

        const res = await fetch(
          `${process.env.REACT_APP_API_URL}/api/hackathons/${id}?email=${email}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        if (res.status === 403) {
          setIsAllowed(false);
        } else {
          setHackathon(data);
          setIsAllowed(true);
        }

      } catch (err) {
        console.error("Error fetching hackathon:", err);
      } finally {
        setLoading(false);
      }

    };

    const checkRegistration = async () => {

      try {

        const email = localStorage.getItem("userEmail");

        const res = await fetch(
          `${process.env.REACT_APP_API_URL}/api/register/check?email=${email}&hackathonId=${id}`
        );

        const data = await res.json();

        if (data.registered) {
          setIsRegistered(true);
        }

      } catch (err) {
        console.error("Registration check failed", err);
      }

    };

    fetchHackathon();
    checkRegistration();

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

  if (loading) return <p>Loading details...</p>;
  if (!hackathon) return <p>Hackathon not found</p>;
  if (!isAllowed) return <p>You are not authorized to view this hackathon.</p>;

  /* ================= BUTTON STATE ================= */

  const isClosed =
    hackathon.registrationEnd &&
    new Date(hackathon.registrationEnd) < new Date();

  let buttonText = "Register Now";

  if (isRegistered) buttonText = "Registered";
  else if (isClosed) buttonText = "Closed";

  /* ================= EVENT DETAILS ================= */

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

      {/* HERO */}
      <section
        className={styles.heroCard}
        style={{
          backgroundImage: hackathon.banner
            ? `url(${process.env.REACT_APP_API_URL}${hackathon.banner})`
            : "none",
        }}
      >

        <div className={styles.heroOverlay}>

          <span className={styles.badge}>
            {isClosed ? "REGISTRATION CLOSED" : "REGISTRATION OPEN"}
          </span>

          <h1 className={styles.title}>{hackathon.name}</h1>

          <p className={styles.subtitle}>
            Organized by {hackathon.organizer}
          </p>

          <div className={styles.actions}>

            <button
              className={styles.primaryBtn}
              disabled={isRegistered || isClosed}
              onClick={() => navigate(`/studenthackathonform/${id}`)}
            >
              {buttonText}
            </button>

            <button className={styles.secondaryBtn}>
              View Guide
            </button>

          </div>

        </div>

      </section>

      {/* COUNTDOWN */}

      <section className={styles.countdownCard}>

        <div>
          <span className={styles.smallText}>
            {hasStarted ? "LIVE NOW" : "STARTS IN"}
          </span>

          <h3>
            {hasStarted
              ? "Hackathon Started 🚀"
              : "Countdown to Kickoff"}
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

      {/* DETAILS GRID */}

      <section className={styles.detailsGrid}>

        <div className={styles.leftCol}>

          <div className={styles.card}>
            <h4>About the Event</h4>
            <p>{hackathon.theme} focused hackathon.</p>
          </div>

          <div className={styles.card}>
            <Timeline hackathonId={id}/>
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
                <FaCalendarAlt />
                {new Date(hackathon.hackathonStart).toLocaleDateString()}
              </li>

            </ul>

            <button
              className={styles.primaryBtn}
              disabled={isRegistered || isClosed}
              onClick={() => navigate(`/studenthackathonform/${id}`)}
            >
              {buttonText}
            </button>

          </div>

        </div>

      </section>

    </div>
  );
}