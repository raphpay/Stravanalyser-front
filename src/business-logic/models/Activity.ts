export default interface Activity {
  id: number;
  date: string;
  name: string;
  type: string;
  distanceKm: string;
  elevationGain: number;
  avgHR: number;
  movingTime: number;
  elapsedTime: number;
}
