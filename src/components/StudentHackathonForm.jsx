import { useState } from "react";
import styles from "./StudentHackathon.module.css";
import { FaUserGraduate } from "react-icons/fa";

export default function StudentHackathonForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    state: "",
    github: "",
    linkedin: "",
    college: "",
    degree: "",
    yearOfStudy: "",
    graduationYear: "",
    skills: "",
    hackathon: "",
    hackathonName: "",
    startDate: "",
    endDate: "",
    problemStatement: "",
    techStack: "",
    role: "",
    resume: null,
    c1: false,
    c2: false,
    c3: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setForm({
      ...form,
      [name]:
        type === "checkbox"
          ? checked
          : type === "file"
          ? files[0]
          : value,
    });
  };

  const isFormValid =
    Object.values({
      name: form.name,
      email: form.email,
      phone: form.phone,
      state: form.state,
      github: form.github,
      linkedin: form.linkedin,
      college: form.college,
      degree: form.degree,
      yearOfStudy: form.yearOfStudy,
      graduationYear: form.graduationYear,
      skills: form.skills,
      hackathon: form.hackathon,
      resume: form.resume,
    }).every(Boolean) &&
    form.c1 &&
    form.c2 &&
    form.c3;

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        {/* HEADER */}
        <div className={styles.header}>
          <FaUserGraduate className={styles.icon} />
          <h1>Student Hackathon Registration</h1>
          <p>Join SkillMatrix and build the future with AI</p>
        </div>

        {/* PERSONAL */}
        <h3 className={styles.section}>Personal Information</h3>
        <div className={styles.grid}>
          <input name="name" placeholder="Full Name" onChange={handleChange} />
          <input name="email" placeholder="Email Address" onChange={handleChange} />
          <input name="phone" placeholder="Phone Number" onChange={handleChange} />

          <select name="state" onChange={handleChange}>
            <option value="">Select State</option>
            <option>Andhra Pradesh</option>
            <option>Karnataka</option>
            <option>Tamil Nadu</option>
            <option>Telangana</option>
          </select>

          <input name="github" placeholder="GitHub URL" onChange={handleChange} />
          <input name="linkedin" placeholder="LinkedIn URL" onChange={handleChange} />
        </div>

        {/* ACADEMIC */}
        <h3 className={styles.section}>Academic Details</h3>
        <div className={styles.grid}>
          <input name="college" placeholder="College / University" onChange={handleChange} />
          <input name="degree" placeholder="Degree / Program" onChange={handleChange} />

          <select name="yearOfStudy" onChange={handleChange}>
            <option value="">Year of Study</option>
            <option>1st Year</option>
            <option>2nd Year</option>
            <option>3rd Year</option>
            <option>Final Year</option>
          </select>

          <select name="graduationYear" onChange={handleChange}>
            <option value="">Graduation Year</option>
            <option>2025</option>
            <option>2026</option>
            <option>2027</option>
          </select>
        </div>

        {/* TECH */}
        <h3 className={styles.section}>Technical Profile</h3>
        <input
          className={styles.full}
          name="skills"
          placeholder="Primary Skills (React, ML, Java, Python...)"
          onChange={handleChange}
        />

        {/* RESUME */}
<h3 className={styles.section}>Résumé</h3>

<label className={styles.resumeBox}>
  <input
    type="file"
    name="resume"
    accept="application/pdf"
    hidden
    onChange={handleChange}
  />

  <div className={styles.resumeContent}>
    <div className={styles.resumeIcon}>📄</div>
    <p className={styles.resumeText}>
      Click to upload or drag and drop
    </p>
    <span className={styles.resumeHint}>PDF only (Max 5MB)</span>
  </div>
</label>


        {/* EXPERIENCE */}
        <div className={styles.inline}>
          <span>Have you participated in a hackathon before?</span>
          <label>
            <input type="radio" name="hackathon" value="Yes" onChange={handleChange} /> Yes
          </label>
          <label>
            <input type="radio" name="hackathon" value="No" onChange={handleChange} /> No
          </label>
        </div>

        {/* CHECKBOXES */}
        <div className={styles.checks}>
          <label>
            <input type="checkbox" name="c1" onChange={handleChange} /> I agree to the Code of Conduct
          </label>
          <label>
            <input type="checkbox" name="c2" onChange={handleChange} /> I agree to Terms & Conditions
          </label>
          <label>
            <input type="checkbox" name="c3" onChange={handleChange} /> I consent to media coverage
          </label>
        </div>

        <button className={styles.btn} >
          Register Now 
        </button>

        <p className={styles.footer}>Powered by SkillMatrix © 2024</p>
      </div>
    </div>
  );
}
