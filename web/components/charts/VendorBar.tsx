"use client";
import React from "react";
import { Bar } from "react-chartjs-2";

type Props = {};

function VendorBar({}: Props) {
  return (
    <Bar
      className=""
      options={{
        indexAxis: "x" as const,
        elements: {
          bar: {
            borderWidth: 2,
          },
        },
        responsive: true,
        plugins: {
          legend: {
            position: "bottom" as const,
          },
          title: {
            display: true,
            text: "MSEs in Vendors Distribution",
          },
        },
        scales: {
          x: {
            grid: {
              drawOnChartArea: false,
            },
          },
          y: {
            beginAtZero: true,
          },
        },
      }}
      data={{
        labels: ["", "", "", ""],
        datasets: [
          {
            label: "MSEs",
            data: [80], // Positive value
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
            barPercentage: 7.8, // Adjust this value to change the width of each bar
            categoryPercentage: 0.6, // Adjust this value to add space between bars
          },
          {
            label: "Startups",
            data: [0, 40], // Positive value
            borderColor: "rgb(53, 162, 235)",
            backgroundColor: "rgba(53, 162, 235, 0.5)",
            barPercentage: 7.8,
            categoryPercentage: 0.6,
          },
          {
            label: "Others",
            data: [0, 0, 110], // Positive value
            borderColor: "rgb(53, 162, 235)",
            backgroundColor: "rgba(53, 162, 235, 0.5)",
            barPercentage: 7.8,
            categoryPercentage: 0.6,
          },
          {
            label: "Total",
            data: [0, 0, 0, 230],
            borderColor: "rgba(19, 106, 48, 0.5)",
            backgroundColor: "rgb(53, 235, 141)",
            barPercentage: 7.8,
            categoryPercentage: 0.6,
          },
        ],
      }}
    />
  );
}

export default VendorBar;
