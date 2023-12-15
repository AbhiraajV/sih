"use client";
import React from "react";
import { Pie } from "react-chartjs-2";

const UserTypeDistributionChart = () => {
  const data = {
    labels: ["NEEPCO Employee", "Vendor", "Admin", "SuperAdmin", "Unknown"],
    datasets: [
      {
        data: [20, 30, 15, 10, 5],
        backgroundColor: ["red", "blue", "green", "orange", "gray"],
      },
    ],
  };

  return (
    <div>
      <Pie data={data} />
    </div>
  );
};

export default UserTypeDistributionChart;
