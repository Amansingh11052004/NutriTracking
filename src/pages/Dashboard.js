import { useEffect, useState } from "react";
import { getTodayLogs, getSuggestion, getWeeklyData } from "../services/api";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip
} from "chart.js";

import "../styles/dashboard.css";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Legend, Tooltip);

function Dashboard() {
  const [logs, setLogs] = useState([]);
  const [weeklyData, setWeeklyData] = useState({});
  const [suggestion, setSuggestion] = useState("");

  const [totalCalories, setTotalCalories] = useState(0);
  const [totalProtein, setTotalProtein] = useState(0);
  const [totalFat, setTotalFat] = useState(0);
  const [totalCarbs, setTotalCarbs] = useState(0);

  // 🔥 GET PROFILE
  const profile = JSON.parse(localStorage.getItem("profile"));

  // 🔥 DYNAMIC GOALS
  const CAL_GOAL = profile?.calories || 2000;
  const PROTEIN_GOAL = profile?.protein || 100;
  const FAT_GOAL = 70;
  const CARBS_GOAL = 300;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await getTodayLogs();
      setLogs(data);

      let cal = 0, protein = 0, fat = 0, carbs = 0;

      data.forEach(item => {
        cal += item.calories;
        protein += item.protein;
        fat += item.fat;
        carbs += item.carbs;
      });

      setTotalCalories(cal.toFixed(1));
      setTotalProtein(protein.toFixed(1));
      setTotalFat(fat.toFixed(1));
      setTotalCarbs(carbs.toFixed(1));

      const sug = await getSuggestion();
      setSuggestion(sug);

      const weekly = await getWeeklyData();
      setWeeklyData(weekly || {});
    } catch (err) {
      console.error("Error:", err);
    }
  };

  

  // 🔥 CHART DATA
  const labels = Object.keys(weeklyData || {});

  const chartData = {
    labels,
    datasets: [
      {
        label: "Calories",
        data: labels.map(d => weeklyData[d]?.calories ?? 0),
        borderColor: "#27ae60",
        tension: 0.4
      },
      {
        label: "Protein",
        data: labels.map(d => weeklyData[d]?.protein ?? 0),
        borderColor: "#2980b9",
        tension: 0.4
      },
      {
        label: "Fat",
        data: labels.map(d => weeklyData[d]?.fat ?? 0),
        borderColor: "#e67e22",
        tension: 0.4
      },
      {
        label: "Carbs",
        data: labels.map(d => weeklyData[d]?.carbs ?? 0),
        borderColor: "#8e44ad",
        tension: 0.4
      }
    ]
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Dashboard</h1>

      {/* METRICS */}
      <div className="metrics-row">

  <Metric title="Calories" value={totalCalories} goal={CAL_GOAL} color="green" />
  <Metric title="Protein" value={totalProtein} goal={PROTEIN_GOAL} color="blue" unit="g" />
  <Metric title="Fat" value={totalFat} goal={FAT_GOAL} color="orange" unit="g" />
  <Metric title="Carbs" value={totalCarbs} goal={CARBS_GOAL} color="purple" unit="g" />

  {/* AI */}
  <div className="ai-card">
    <h4>AI</h4>
    <p>{suggestion}</p>
  </div>

  {/* 🔥 HEALTH CARD INSIDE ROW */}
  <div className="health-card">
  <h4>Health</h4>

  {profile ? (
    <>
      <p>
        BMI:{" "}
        <strong className={
          profile.bmi < 18.5
            ? "bmi-low"
            : profile.bmi < 25
            ? "bmi-normal"
            : "bmi-high"
        }>
          {profile.bmi}
        </strong>
      </p>

      <p>
        Status:{" "}
        <span className="status-badge">
          {profile.bmi < 18.5
            ? "Underweight"
            : profile.bmi < 25
            ? "Normal"
            : "Overweight"}
        </span>
      </p>

      <p>
        Goal:{" "}
        <span className={
          totalCalories < CAL_GOAL ? "goal-good" : "goal-bad"
        }>
          {totalCalories < CAL_GOAL
            ? "On Track ✔"
            : "Limit Intake ⚠"}
        </span>
      </p>
    </>
  ) : (
    <p>Set profile</p>
  )}
</div>

</div>

      {/* MAIN */}
      <div className="main-section">

        {/* FOOD LIST */}
        <div className="food-panel">
          <h3>Food List</h3>

          {logs.length === 0 ? (
            <p>No food added</p>
          ) : (
            logs.map((item, index) => (
              <div key={index} className="food-card">
                <strong>{item.food}</strong>
                <p>Cal: {item.calories} | Protein: {item.protein}g</p>
              </div>
            ))
          )}
        </div>

        {/* GRAPH */}
        <div className="graph-panel">
          <h3>Weekly Progress</h3>
          <Line data={chartData} />
        </div>

      </div>
    </div>
  );
}

// METRIC COMPONENT
function Metric({ title, value, goal, color, unit = "" }) {
  const progress = Math.min((parseFloat(value) / goal) * 100, 100);

  return (
    <div className="metric-card">
      <p>{title}</p>
      <h2 className={color}>{value}{unit}</h2>

      <div className="progress-bar">
        <div
          className={`progress-fill ${color}-bg`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <span>{progress.toFixed(0)}%</span>
    </div>
  );
}

export default Dashboard;