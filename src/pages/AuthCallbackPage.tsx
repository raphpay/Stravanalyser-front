import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const BACKEND_URL = import.meta.env.VITE_BACK_END_URL;

const AuthCallbackPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const code = searchParams.get("code");

    if (!code) {
      setError("Code d'autorisation manquant dans l'URL");
      return;
    }

    // Appel backend pour échanger code contre token/profil
    axios
      .post(`${BACKEND_URL}/auth/exchange_token`, { code })
      .then((res) => {
        const { athleteId } = res.data;
        // Rediriger vers page succès avec athleteId
        navigate(`/auth/success/${athleteId}`);
      })
      .catch((err) => {
        console.error(err);
        setError("Erreur lors de l'authentification avec Strava");
      });
  }, [searchParams, navigate]);

  if (error) {
    return <div className="p-4 text-red-600">Erreur : {error}</div>;
  }

  return <div className="p-4">Connexion en cours, merci de patienter...</div>;
};

export default AuthCallbackPage;
