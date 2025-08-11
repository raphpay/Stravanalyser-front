import "./App.css";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import AuthCallbackPage from "./pages/AuthCallbackPage";
import AuthSuccessPage from "./pages/AuthSuccessPage";
import DashboardPage from "./pages/DashboardPage";
import HelpPage from "./pages/HelpPage";
import HomePage from "./pages/HomePage";

const AppContent: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/auth/success/:athleteId" element={<AuthSuccessPage />} />
      <Route path="/auth/callback" element={<AuthCallbackPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/help" element={<HelpPage />} />
    </Routes>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
