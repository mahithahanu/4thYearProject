import axios from "axios";
import { useParams } from "react-router-dom";
import { useState } from "react";

export default function FormTeams() {
  const { hackathonId } = useParams();
  const [loading, setLoading] = useState(false);

  const handleFormTeams = async () => {
    try {
      setLoading(true);

      await axios.post(
        `/api/hackathons/${hackathonId}/form-teams`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      alert("Teams formed successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to form teams");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Auto Form Teams</h2>
      <button onClick={handleFormTeams} disabled={loading}>
        {loading ? "Forming..." : "Start Team Formation"}
      </button>
    </div>
  );
}