import { useParams } from "react-router-dom";

export default function RulesPage() {
  const { id } = useParams();

  return (
    <div>
      <h2>Rules</h2>
      <textarea placeholder="Add hackathon rules here..." rows="8" />
      <button>Save Rules</button>
    </div>
  );
}
