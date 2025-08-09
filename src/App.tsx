import { useState } from "react";
import "./App.css";

function App() {
  const BACKEND_URL = import.meta.env.VITE_BACK_END_URL;
  const [message, setMessage] = useState<string>("");

  async function callBackend() {
    try {
      const res = await fetch(`${BACKEND_URL}/test`);
      console.log("res", BACKEND_URL, res);
      const text = await res.text();
      setMessage(text);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div className="p-4">
      <button
        onClick={callBackend}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Test
      </button>
      {message && <p className="mt-4 text-lg">{message}</p>}
    </div>
  );
}

export default App;
