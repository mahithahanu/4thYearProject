import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./profile.module.css";

export default function Profile() {

  const email = localStorage.getItem("userEmail");

  const [profile, setProfile] = useState({});
  const [editData, setEditData] = useState({
    location: "",
    linkedin: "",
    github: "",
    occupation: "",
    college: "",
    company: "",
    about: ""
  });

  useEffect(() => {

    axios
      .get(`${process.env.REACT_APP_API_URL}/api/profile?email=${email}`)
      .then((res) => {

        setProfile(res.data);

        setEditData({
          location: res.data.location || "",
          linkedin: res.data.linkedin || "",
          github: res.data.github || "",
          occupation: res.data.occupation || "",
          college: res.data.college || "",
          company: res.data.company || "",
          about: res.data.about || ""
        });

      });

  }, [email]);


  const handleChange = (e) => {

    setEditData({
      ...editData,
      [e.target.name]: e.target.value
    });

  };


  const handleSave = async () => {

    await axios.put(
      `${process.env.REACT_APP_API_URL}/api/profile?email=${email}`,
      editData
    );

    alert("Profile updated");

  };

  return (

    <div className={styles.container}>

      {/* TOP PROFILE CARD */}

      <div className={styles.topCard}>

        <div className={styles.avatar}>
          {profile.name?.charAt(0)}
        </div>

        <h2>{profile.name}</h2>

        <p className={styles.role}>
          {editData.occupation || "Full Stack Developer"}
        </p>

        <p className={styles.location}>
          {editData.location || "Location not set"}
        </p>

      </div>


      {/* ACCOUNT SETTINGS */}

      <div className={styles.card}>

        <h2 className={styles.accountTitle}>Account Settings</h2>
        <p className={styles.subtitle}>
          Manage your public profile and professional details
        </p>

        <div className={styles.grid2}>

          <div>
            <label>Full Name</label>
            <input value={profile.name || ""} disabled />
          </div>

          <div>
            <label>Email Address</label>
            <input value={profile.email || ""} disabled />
          </div>

          <div>
            <label>Occupation</label>
            <input
              name="occupation"
              value={editData.occupation}
              onChange={handleChange}
              placeholder="Full Stack Developer"
            />
          </div>

          <div>
            <label>Location</label>
            <input
              name="location"
              value={editData.location}
              onChange={handleChange}
              placeholder="San Francisco, CA"
            />
          </div>

          <div>
            <label>LinkedIn URL</label>
            <input
              name="linkedin"
              value={editData.linkedin}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>GitHub URL</label>
            <input
              name="github"
              value={editData.github}
              onChange={handleChange}
            />
          </div>

        </div>


        {/* STATUS BUTTONS */}

        <div className={styles.statusSection}>

          <label>Professional Status</label>

          <div className={styles.statusButtons}>

            <button
              className={
                editData.occupation === "student"
                  ? styles.activeStatus
                  : ""
              }
              onClick={() =>
                setEditData({ ...editData, occupation: "student" })
              }
            >
              Student
            </button>

            <button
              className={
                editData.occupation === "company"
                  ? styles.activeStatus
                  : ""
              }
              onClick={() =>
                setEditData({ ...editData, occupation: "company" })
              }
            >
              Employee
            </button>

          </div>

        </div>


        {/* CONDITIONAL FIELDS */}

        {editData.occupation === "student" && (

          <div className={styles.inputBlock}>
            <label>College / University</label>
            <input
              name="college"
              value={editData.college}
              onChange={handleChange}
            />
          </div>

        )}

        {editData.occupation === "company" && (

          <div className={styles.inputBlock}>
            <label>Company</label>
            <input
              name="company"
              value={editData.company}
              onChange={handleChange}
            />
          </div>

        )}


        {/* BIO */}

        <div className={styles.bio}>
          <label>Bio</label>
          <textarea
            name="about"
            value={editData.about}
            onChange={handleChange}
          />
        </div>


        {/* BUTTONS */}

        <div className={styles.actions}>

          <button className={styles.cancelBtn}>
            Cancel
          </button>

          <button
            className={styles.saveBtn}
            onClick={handleSave}
          >
            Save Changes
          </button>

        </div>

      </div>

    </div>

  );
}