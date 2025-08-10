import axios from "axios";
import { useEffect, useState } from "react";
import type StravaProfile from "../business-logic/models/StravaProfile";

export default function DashboardPage() {
  const BACKEND_URL = import.meta.env.VITE_BACK_END_URL;

  const [profile, setProfile] = useState<StravaProfile | null>(null);

  async function getProfileInfo() {
    const cachedUser = localStorage.getItem("current_user") as string;
    if (cachedUser) {
      const data = JSON.parse(cachedUser) as StravaProfile;
      setProfile(data);
    } else {
      try {
        const athleteId = localStorage.getItem("athleteId");
        const res = await axios.get(`${BACKEND_URL}/auth/profile/${athleteId}`);
        const user: StravaProfile = res.data;
        console.log("user", user);
        setProfile(user);
        localStorage.setItem("current_user", JSON.stringify(user));
      } catch (error) {
        console.error("Error getting profile info", error);
      }
    }
  }

  useEffect(() => {
    async function init() {
      getProfileInfo();
    }
    init();
  }, []);

  if (!profile) return <div>Chargement du profil...</div>;
  return (
    <div>
      Bienvenue {profile.firstname} {profile.lastname} !
    </div>
  );
}
