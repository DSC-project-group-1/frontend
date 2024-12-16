import "./index.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import { LandingPage } from "./pages/LandingPage.jsx";
import { LeaderboardPage } from "./pages/LeaderboardPage.jsx";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/leaderboard" element={<LeaderboardPage />} />
    </Routes>
  </BrowserRouter>
);
