import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./ResultsPage.module.css";

export default function ResultsPage() {

  const { hackathonId } = useParams();

  const [pdf, setPdf] = useState(null);
  const [uploaded, setUploaded] = useState(false);
  const [fileName, setFileName] = useState("");

  const handleUpload = async () => {

    if (!pdf) {
      alert("Select a PDF file");
      return;
    }

    try {

      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("resultsPdf", pdf);

      await axios.post(
        `http://localhost:8003/api/resultspage/${hackathonId}/upload`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          }
        }
      );

      setUploaded(true);
      setFileName(pdf.name);

    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };

  const handleNextRound = () => {
    setUploaded(false);
    setPdf(null);
  };

  return (
    <div className={styles.container}>

      {/* TOP BAR */}

      {uploaded && (
        <div className={styles.topBar}>
          <button
            className={styles.nextBtn}
            onClick={handleNextRound}
          >
            Upload For Next Round
          </button>
        </div>
      )}

      <div className={styles.card}>

        {!uploaded ? (
          <>
            <h1>Global AI Hackathon 2024</h1>

            <p className={styles.link}>
              Upload Final Results PDF
            </p>

            {/* UPLOAD BOX */}

            <div className={styles.uploadBox}>

              <input
                type="file"
                accept="application/pdf"
                onChange={(e) =>
                  setPdf(e.target.files[0])
                }
              />

              <p>Drop PDF here or click to upload</p>

              <small>
                Only PDF files supported (Max 25MB)
              </small>

              <button
                className={styles.selectBtn}
                onClick={() =>
                  document
                    .querySelector('input[type="file"]')
                    .click()
                }
              >
                Select File
              </button>

            </div>

            <button
              className={styles.publishBtn}
              onClick={handleUpload}
            >
              Publish Results
            </button>
          </>
        ) : (

          /* SUCCESS SCREEN */

          <div className={styles.success}>

            <h2>Results Uploaded Successfully 🎉</h2>

            <p>
              File Uploaded:
              <strong> {fileName}</strong>
            </p>

            <p>
              Results have been parsed and saved.
            </p>

          </div>

        )}

      </div>

      {/* FOOTER */}

      <div className={styles.footer}>
        <span>Secure SSL Upload</span>
        <span>Deadline: June 15</span>
        <span>Need help?</span>
      </div>

    </div>
  );
}