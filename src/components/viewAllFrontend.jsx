import styles from "./viewAll.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ViewAllFrontend() {

  const [hackathons, setHackathons] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchText, setSearchText] = useState("");

  const navigate = useNavigate();

  useEffect(() => {

    const fetchHackathons = async () => {

      try {

        const email = localStorage.getItem("userEmail");

        const res = await axios.get(
          `http://localhost:8003/api/register/registered?email=${email}`
        );

        console.log("Registered hackathons:", res.data);

        setHackathons(res.data || []);

      } catch (error) {
        console.error("Failed to fetch hackathons:", error);
      }

    };

    fetchHackathons();

  }, []);

  const handleViewClick = (hackathonId) => {
    navigate(`/hackthondetails/${hackathonId}`);
  };

  const filteredData = hackathons.filter((item) => {

    const now = new Date();

    let status = "Upcoming";

    if (item.hackathonStart && item.hackathonEnd) {

      const start = new Date(item.hackathonStart);
      const end = new Date(item.hackathonEnd);

      if (now >= start && now <= end) status = "Ongoing";
      if (now > end) status = "Completed";
    }

    const matchesStatus =
      statusFilter === "All" || status === statusFilter;

    const matchesSearch =
      item.name.toLowerCase().includes(searchText.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  return (
    <div className={styles.wrapper}>

      <h2 className={styles.heading}>All Registered Hackathons</h2>

      {/* Top Controls */}
      <div className={styles.topBar}>

        <input
          className={styles.search}
          placeholder="Search hackathon..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        <select
          className={styles.filter}
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">Filter: All</option>
          <option value="Upcoming">Upcoming</option>
          <option value="Ongoing">Ongoing</option>
          <option value="Completed">Completed</option>
        </select>

      </div>

      {/* Table */}
      <table className={styles.table}>

        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Mode</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {filteredData.map((item) => (

            <tr key={item._id}>

              <td className={styles.name}>{item.name}</td>

              <td>
                {item.hackathonStart
                  ? new Date(item.hackathonStart).toLocaleDateString()
                  : "-"}
              </td>

              <td>{item.mode || "-"}</td>

              <td>
                <span className={styles.status}>
                  {item.hackathonEnd &&
                    new Date() > new Date(item.hackathonEnd)
                    ? "Completed"
                    : item.hackathonStart &&
                      new Date() >= new Date(item.hackathonStart)
                    ? "Ongoing"
                    : "Upcoming"}
                </span>
              </td>

              <td>
                <button
                  className={styles.viewBtn}
                  onClick={() => handleViewClick(item._id)}
                >
                  View
                </button>
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}