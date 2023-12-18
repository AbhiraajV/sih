"use client";
import React, { useState } from "react";
import { Chart, PolarArea } from "react-chartjs-2";
import { Chart as ChartJs, RadialLinearScale } from "chart.js";
ChartJs.register(RadialLinearScale);

interface ChartData {
  labels: string[]; // Labels for each data point
  data: number[]; // Data values for each point
  backgroundColor: string[]; // Background color for each arc
}

const PolarAreaComp: React.FC = () => {
  const [chartData, setChartData] = useState<ChartData>({
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    data: [300, 350, 380, 150, 180, 200, 220, 320, 250, 280, 400, 420],
    backgroundColor: [
      "#FF6384",
      "#36A2EB",
      "#FFCE56",
      "#33FF9E",
      "#8E5EA2",
      "#FFD700",
      "#32CD32",
      "#FF4500",
      "#8A2BE2",
      "#00CED1",
      "#FF6347",
      "#20B2AA",
    ],
  });

  const handleUpdateChartData = (newData: ChartData) => {
    setChartData(newData);
  };

  const options = {
    responsive: true, // Adjust chart size to container
    title: {
      display: true,
      text: "Polar Area Chart Example",
    },
    scales: {
      x: {
        display: false, // Hide x-axis labels
      },
    },
    plugins: {
      legend: {
        position: "left" as const,
      },
    },
  };

  return (
    <Chart
      height={"150px"}
      width={"150px"}
      type="polarArea"
      data={{
        labels: chartData.labels,
        datasets: [
          {
            data: chartData.data,
            backgroundColor: chartData.backgroundColor,
          },
        ],
      }}
      options={options}
    />
  );
};

export default PolarAreaComp;
