export default function HomePage() {
  const BACKEND_URL = import.meta.env.VITE_BACK_END_URL;

  async function connectStrava() {
    window.location.href = `${BACKEND_URL}/auth/login`;
  }

  return (
    <div className="p-4">
      <button
        onClick={connectStrava}
        className="bg-orange-500 text-white px-4 py-2 rounded"
      >
        Se connecter à Strava
      </button>
    </div>
  );
}
