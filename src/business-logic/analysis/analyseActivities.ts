import dayjs from "dayjs";
import type Activity from "../models/Activity.js";
import type Timeline from "../models/Timeline.js";
import analyzeTimeline from "./timelineAnalysis.js";

export async function analyseActivities(activities: Activity[]) {
  const tssMap = buildTSSByDay(activities);
  // ------ Curseur de conversion----
  const timeline = computeLoadTimeline(tssMap);
  // ------ Curseur de conversion----

  const analysisResult = analyzeTimeline(timeline);
  return { timeline, analysisResult };
}

// === 1. Build daily TSS map ===
export default function buildTSSByDay(activities: Activity[]) {
  const map: Record<string, number> = {};

  for (const act of activities) {
    const date = act.date.split("T")[0];
    const tss = estimateTSS(act.movingTime / 60, act.avgHR);

    map[date] = (map[date] || 0) + tss;
  }

  return map;
}

export function estimateTSS(durationMin: number, hrAvg: number) {
  const hrMax = 190;
  const IF = hrAvg ? hrAvg / hrMax : 0.7; // intensité approx
  return durationMin * IF * IF;
}

// === Build full timeline + CTL/ATL/TSB ===
function computeLoadTimeline(tssMap: Record<string, number>) {
  const days = 180;
  const today = dayjs().startOf("day");
  const timeline: Timeline[] = [];

  for (let i = days - 1; i >= 0; i--) {
    const date = today.subtract(i, "day").format("YYYY-MM-DD");
    const tss = tssMap[date] || 0;

    timeline.push({ date, tss });
  }

  for (let i = 0; i < timeline.length; i++) {
    const ctlWindow = timeline.slice(Math.max(0, i - 41), i + 1);
    const atlWindow = timeline.slice(Math.max(0, i - 6), i + 1);

    const ctl = ctlWindow.reduce((sum, d) => sum + d.tss, 0) / ctlWindow.length;
    const atl = atlWindow.reduce((sum, d) => sum + d.tss, 0) / atlWindow.length;
    const tsb = ctl - atl;

    timeline[i].ctl = Number(ctl.toFixed(1));
    timeline[i].atl = Number(atl.toFixed(1));
    timeline[i].tsb = Number(tsb.toFixed(1));
  }

  return timeline;
}
