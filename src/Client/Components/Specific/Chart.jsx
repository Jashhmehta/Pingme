import React from "react";
import { Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const LineChartOptions={
    responsive:true,
    plugins:{
        display:false,
    },
    title:{
        display:false,
    },
    scale:{
        x:{
            display:false,
        },
        y:{
            beginAtZero:true,
            grid:{
                display:false
            },
        }
    }

}
const LineChart = () => {
  const data = {
    labels: ["Jan", "Feb"],
    datasets: [
      {
        label: "My First Dataset",
        data: [65, 59],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  return (
    <div>
      <Line data={data} options={LineChartOptions}/>
    </div>
  );
};

const DoughnutChart = () => {
  const data = {
    labels: ["Red", "Blue", "Yellow"],
    datasets: [
      {
        label: "My First Dataset",
        data: [300, 50, 100],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div>
      <Doughnut data={data} />
    </div>
  );
};

export { LineChart, DoughnutChart };
