export default interface StravaProfile {
  id: number;
  username: string;
  resource_state: number;
  firstname: string;
  lastname: string;
  bio?: string;
  city?: string;
  state?: string;
  country?: string;
  sex?: string;
  premium: boolean;
  summit: boolean;
  created_at: string;
  updated_at: string;
  badge_type_id: number;
  weight: number;
  profile_medium?: string;
  profile?: string;
  friend?: boolean;
  follower?: boolean;
}
