import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./Participants.module.css";
import axios from "axios";

export default function ParticipantsPage() {

  const { hackathonId } = useParams();

  const [participants, setParticipants] = useState([]);
  const [filteredParticipants, setFilteredParticipants] = useState([]);
  const [search, setSearch] = useState("");

  /* ================= FETCH PARTICIPANTS ================= */

  useEffect(() => {

    const fetchParticipants = async () => {

      try {

        const res = await axios.get(
          `http://localhost:8003/api/register/participants/${hackathonId}`
        );

        console.log("API Response:", res.data);

        const data = res.data.participants || res.data || [];

        setParticipants(data);
        setFilteredParticipants(data);

      } catch (error) {

        console.error("Error fetching participants:", error);

      }

    };

    if (hackathonId) {
      fetchParticipants();
    }

  }, [hackathonId]);


  /* ================= SEARCH ================= */

  const handleSearch = (value) => {

    setSearch(value);

    const filtered = participants.filter((p) =>
      (p.name || "").toLowerCase().includes(value.toLowerCase()) ||
      (p.email || "").toLowerCase().includes(value.toLowerCase()) ||
      (p.college || "").toLowerCase().includes(value.toLowerCase())
    );

    setFilteredParticipants(filtered);

  };


  /* ================= EXPORT CSV ================= */

  const handleExportCSV = () => {

    if (participants.length === 0) return;

    const headers = [
      "Name",
      "Email",
      "College",
      "Skills",
      "Phone",
      "State"
    ];

    const rows = participants.map((p) => [
      p.name,
      p.email,
      p.college,
      p.skills,
      p.phone,
      p.state
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows]
        .map((row) => row.join(","))
        .join("\n");

    const encodedUri = encodeURI(csvContent);

    const link = document.createElement("a");

    link.setAttribute("href", encodedUri);

    link.setAttribute("download", "participants.csv");

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

  };


  /* ================= UI ================= */

  return (
    <div className={styles.container}>

      <h2>Participant Management</h2>

      <p className={styles.subtitle}>
        Review, approve, and manage registration requests for your hackathon.
      </p>


      {/* TOP BAR */}

      <div className={styles.topBar}>

        <div className={styles.totalBox}>
          TOTAL REGISTERED
          <span>{participants.length}</span>
        </div>

        <button
          className={styles.exportBtn}
          onClick={handleExportCSV}
        >
          Export CSV
        </button>

      </div>


      {/* SEARCH */}

      <div className={styles.searchBar}>

        <input
          type="text"
          value={search}
          placeholder="Search by name, email, or university..."
          onChange={(e) => handleSearch(e.target.value)}
        />

      </div>


      {/* TABLE */}

      <div className={styles.tableCard}>

        <table>

          <thead>
            <tr>
              <th>Participant Name</th>
              <th>Email</th>
              <th>University</th>
              <th>Role / Skill</th>
              <th>Status</th>
              {/* <th>Actions</th> */}
            </tr>
          </thead>


          <tbody>

            {filteredParticipants.length === 0 ? (

              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  No participants found
                </td>
              </tr>

            ) : (

              filteredParticipants.map((p) => (

                <tr key={p._id}>

                  <td>{p.name}</td>

                  <td>{p.email}</td>

                  <td>{p.college}</td>

                  <td>{p.skills}</td>

                  <td>
                    <span className={styles.verified}>
                      Registered
                    </span>
                  </td>


                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  );

}