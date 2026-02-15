import { useParams } from "react-router-dom";

export default function PublishingPage() {
  const { id } = useParams();

  return (
    <div>
      <h2>Publishing Settings</h2>

      <label>
        <input type="checkbox" />
        Make Hackathon Public
      </label>

      <br />

      <button>Update Status</button>
    </div>
  );
}
