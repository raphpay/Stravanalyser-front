import axios from "axios";
import { useEffect, useState } from "react";
import { analyseActivities } from "../business-logic/analysis/analyseActivities";
import type { AnalysisResult } from "../business-logic/analysis/timelineAnalysis";
import type Activity from "../business-logic/models/Activity";
import type StravaProfile from "../business-logic/models/StravaProfile";
import type Timeline from "../business-logic/models/Timeline";
import TimelineTable from "./TimelineTable";

export default function DashboardPage() {
  const BACKEND_URL = import.meta.env.VITE_BACK_END_URL;

  const [profile, setProfile] = useState<StravaProfile | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [analysisDone, setAnalysisDone] = useState<boolean>();
  const [timeline, setTimeline] = useState<Timeline[]>();
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(
    null
  );

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
        setProfile(user);
        localStorage.setItem("current_user", JSON.stringify(user));
      } catch (error) {
        console.error("Error getting profile info", error);
      }
    }
  }

  async function fetchActivities() {
    const athleteId = localStorage.getItem("athleteId");
    const refresh = activities.length === 0;
    const res = await axios.get(`${BACKEND_URL}/activities`, {
      params: { athleteId, refresh },
    });
    const rawData = res.data as any[];
    const data: Activity[] = rawData.map((item) => ({
      id: item.id,
      date: item.start_date,
      name: item.name,
      type: item.type,
      distanceKm: (item.distance / 1000).toFixed(2).toString(),
      elevationGain: item.total_elevation_gain,
      avgHR: item.average_heartrate,
      movingTime: item.moving_time,
      elapsedTime: item.elapsed_time,
    }));
    setActivities(data);
  }

  async function analyseUserActivities() {
    try {
      const result = await analyseActivities(activities);
      setTimeline(result.timeline.slice(-10));
      setAnalysisDone(true);
      setAnalysisResult(result.analysisResult);
    } catch (error) {
      console.error("Error analysing", error);
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
    <div className="flex flex-col gap-2">
      Bienvenue {profile.firstname} {profile.lastname} !
      <button
        onClick={() => fetchActivities()}
        className="bg-orange-500 text-white px-4 py-2 rounded cursor-pointer"
      >
        {activities.length === 0
          ? "Recharger les activités"
          : "Charger les activités"}
      </button>
      <button
        onClick={analyseUserActivities}
        disabled={activities.length === 0}
        className="bg-orange-500 disabled:bg-orange-50 text-white disabled:text-black px-4 py-2 rounded enabled:cursor-pointer"
      >
        Analyser les activités
      </button>
      {/* {activities && (
        <ul>
          {activities.map((act) => (
            <li key={act.id}>
              {act.name} - {act.distanceKm} km
            </li>
          ))}
        </ul>
      )} */}
      {activities && !analysisDone && (
        <p>Activités chargées, analyses les maintenant !!</p>
      )}
      {analysisDone && analysisResult && <p>{analysisResult.status}</p>}
      {analysisDone && analysisResult && <p>{analysisResult.suggestion}</p>}
      {analysisDone && analysisResult && analysisResult?.recovery && (
        <p>{analysisResult.recovery}</p>
      )}
      {analysisDone && analysisResult && timeline && (
        <TimelineTable timeline={timeline} />
      )}
    </div>
  );
}
