"use client";
import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";

Chart.register(ArcElement);
const colors = [
  "#FF6384",
  "#36A2EB",
  "#FFCE56",
  "#4CAF50",
  "#FF9800",
  "#9C27B0",
  "#2196F3",
  "#F44336",
  "#8BC34A",
  "#FF5722",
  "#607D8B",
  "#673AB7",
  "#E91E63",
  "#00BCD4",
  "#FFEB3B",
];

const DonutChart = ({
  labels,
  dataset,
}: {
  labels: string[];
  dataset: number[];
}) => {
  const data = {
    labels,
    datasets: [
      {
        data: dataset,
        backgroundColor: colors,
        hoverBackgroundColor: colors,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: "left" as const, // Use 'as const' to specify a literal type
      },
    },
    cutoutPercentage: 50, // Adjust this value to control the size of the center hole (0 to 100)
    maintainAspectRatio: false, // Set to false if you want to control the aspect ratio
  };

  return (
    <div className="w-[100%]">
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default DonutChart;
