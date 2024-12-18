
// export function LeaderboardPage() {
//     return (
//         <div>
//             <h1>Leaderboard Page</h1>
//         </div>
//     );
// };

 
import React from "react";
import { Doughnut, Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from "chart.js";
import { useNavigate } from "react-router-dom";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

export default function LeaderboardPage() {
  const navigate = useNavigate(); // For navigation to home page

  // Doughnut Chart Data (Player percentage)
  const doughnutData = {
    labels: ["Player 1", "Player 2"],
    datasets: [
      {
        data: [55, 45], // Player percentages
        backgroundColor: ["#4CAF50", "#FF5733"],
        hoverBackgroundColor: ["#66BB6A", "#FF7043"],
      },
    ],
  };

  // Bar Chart Data (Statistics)
  const barData = {
    labels: ["Score", "Accuracy", "Time Played", "Challenges Won"],
    datasets: [
      {
        label: "Player 1",
        backgroundColor: "#4CAF50",
        data: [85, 78, 120, 30], // Sample data for Player 1
      },
      {
        label: "Player 2",
        backgroundColor: "#FF5733",
        data: [65, 90, 95, 20], // Sample data for Player 2
      },
    ],
  };

  // Emoji emotions and captions
  const emotions = [
    { emoji: "😄", label: "Happy" },
    { emoji: "😐", label: "Neutral" },
    { emoji: "😞", label: "Sad" },
    { emoji: "😡", label: "Angry" },
    { emoji: "😢", label: "Crying" },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-4 space-y-8">
      {/* Header */}
      <h1 className="text-4xl font-bold text-center mt-4">Game Results Page</h1>

      {/* Charts Section */}
      <div className="w-full flex flex-wrap justify-center gap-8">
        {/* Doughnut Chart */}
        <div className="w-1/3 bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-center mb-4">Player Percentages</h2>
          <Doughnut data={doughnutData} />
        </div>

        {/* Bar Chart */}
        <div className="w-2/3 bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-center mb-4">Game Statistics</h2>
          <Bar data={barData} />
        </div>
      </div>

      {/* Emoji Section */}
      <div className="w-full flex justify-around items-center mt-6">
        {emotions.map((emotion, index) => (
          <div key={index} className="flex flex-col items-center space-y-2">
            <div className="text-5xl">{emotion.emoji}</div>
            <div className="text-lg font-semibold">{emotion.label}</div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="mt-8">
        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 bg-green-500 hover:bg-green-600 rounded-full shadow-lg text-lg font-bold"
        >
          Return to Home
        </button>
      </div>
    </div>
  );
}
