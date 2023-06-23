"use client";
import React, { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";
import data from "g1-e-commerce.json";

Chart.register(...registerables);

export default function TeamActivity() {
  const chartRef = useRef(null);

  let totalContributions = 0;
  data.contributors.forEach((contributor) => {
    totalContributions += contributor.contributions;
  });

  function calculatePercentage(user) {
    return Math.round((100 * user.contributions) / totalContributions);
  }

  useEffect(() => {
    const chartData = {
      labels: data.contributors.map((user) => user.login),
      datasets: [
        {
          label: "Contributions",
          data: data.contributors.map((user) => calculatePercentage(user)),
          backgroundColor: ["#E2E949", "#36BCBA", "#36BCBA"],
        },
      ],
    };

    const chartOptions = {
      indexAxis: "y",
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          callbacks: {
            label: (context) => {
              const dataset = context.dataset;
              const value = dataset.data[context.dataIndex];
              return `${value}%`;
            },
          },
        },
      },
      scales: {
        x: {
          ticks: {
            callback: (value) => `${value}%`,
            precision: 0,
            stepSize: 25,
            max: 100,
          },
        },
      },
    };

    const chart = new Chart(chartRef.current, {
      type: "bar",
      data: chartData,
      options: chartOptions,
    });

    return () => {
      chart.destroy();
    };
  }, []);

  return (
    <div className="grid grid-cols-1 gap-4 max-w-m bg-[#1A1E1F] p-9 rounded-2xl ">
      <div className="flex flex-column justify-between">
        <h2 className="text-[#F9F9F9] font-bold">Team Activity</h2>
      </div>

      <canvas ref={chartRef}></canvas>

      {/* code without chart: */}
      {/* {data.contributors.map((user) => (
        <div key={user.login} className="flex items-center space-x-4">
          <img
            src={user.avatar_url}
            alt={user.login}
            className="w-10 h-10 rounded-full"
          />
          <div className="text-white">
            {user.login}: {calculatePercentage(user)}%
          </div>
        </div>
      ))} */}
    </div>
  );
}
