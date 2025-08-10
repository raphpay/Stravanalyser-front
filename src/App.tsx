import "./App.css";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import AuthSuccessPage from "./pages/AuthSuccessPage";
import DashboardPage from "./pages/DashboardPage";
import HomePage from "./pages/HomePage";

const AppContent: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/auth/success/:athleteId" element={<AuthSuccessPage />} />
      <Route path="/dashboard/" element={<DashboardPage />} />
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
