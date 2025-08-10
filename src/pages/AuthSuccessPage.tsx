import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function AuthSuccessPage() {
  const { athleteId } = useParams<{ athleteId: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (athleteId) {
      localStorage.setItem("athleteId", athleteId);
      navigate("/dashboard");
    }
  }, [athleteId, navigate]);

  return <div>Connexion réussie, redirection...</div>;
}
