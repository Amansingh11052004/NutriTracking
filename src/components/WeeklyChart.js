import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { getWeeklyData } from "../services/api";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Legend, Tooltip);

function WeeklyChart() {
  const [data, setData] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await getWeeklyData();
    setData(res);
  };

  // 🔥 FIXED CHART DATA
  const labels = Object.keys(data);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Calories",
        data: labels.map(d => data[d]?.calories || 0),
        borderColor: "#27ae60",
        tension: 0.4
      },
      {
        label: "Protein",
        data: labels.map(d => data[d]?.protein || 0),
        borderColor: "#2980b9",
        tension: 0.4
      },
      {
        label: "Fat",
        data: labels.map(d => data[d]?.fat || 0),
        borderColor: "#e67e22",
        tension: 0.4
      },
      {
        label: "Carbs",
        data: labels.map(d => data[d]?.carbs || 0),
        borderColor: "#8e44ad",
        tension: 0.4
      }
    ]
  };

  return <Line data={chartData} />;
}

export default WeeklyChart;