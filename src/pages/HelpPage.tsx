import { useNavigate } from "react-router-dom";

export default function HelpPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-2">
      <button
        className="fixed top-6 left-6 w-12 h-12 text-orange-500  cursor-pointer"
        onClick={() => navigate(-1)}
        aria-label="retour"
        title="Retour"
      >
        Retour
      </button>
      Hello
    </div>
  );
}
