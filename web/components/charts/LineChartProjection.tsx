"use client";
import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Chart } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export function GrowthProjectionChart({}: {}) {
  const [dataset, setDataset] = useState<Array<number>>([]);
  const [mailsSend, setMailsSent] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newValues = Array.from(
        { length: 3 },
        () => Math.floor(Math.random() * (50 - 0 + 1)) + 0
      );
      setDataset((prevDataset) => [...prevDataset.slice(-17), ...newValues]); // Keep only the last 17 values
    }, 2500);

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  useEffect(() => {
    setMailsSent(() => {
      let sum = 0;
      dataset.forEach((data) => (sum += data));
      return sum;
    });
  }, [dataset]); // Watch for changes in dataset and update mailsSent

  const options = {
    responsive: true,
    scales: {
      x: {
        display: false, // Hide x-axis labels
      },
    },
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: `${mailsSend} mails sent in the past ${20 * 2.5} seconds`,
        align: "start" as const, // Left-aligned
        fontSize: 24, // Adjust the font size as needed
      },
    },
  };

  const data = {
    labels: Array.from({ length: dataset.length }, (_, i) => i + 1),
    datasets: [
      {
        label: "Projected Growth",
        data: dataset,
        borderColor: "rgb(99, 109, 255)",
        backgroundColor: "rgba(99, 107, 255, 0.5)",
      },
    ],
  };

  return <Line options={options} data={data} />;
}
