"use client";

import { Chart, registerables } from "chart.js";
import PropTypes from "prop-types";
import React, { useEffect, useRef } from "react";

Chart.register(...registerables);

TeamActivity.propTypes = {
  assignees: PropTypes.array.isRequired,
  pr: PropTypes.object.isRequired,
};

export default function TeamActivity({ assignees, pr }) {
  const chartRef = useRef(null);

  let totalContributions = 0;
  pr.forEach((prs) => {
    totalContributions += prs.total_count;
  });

  function calculatePercentage(individualPrNumber) {
    return Math.round((100 * individualPrNumber.total_count) / totalContributions);
  }

  useEffect(() => {
    const chartData = {
      labels: assignees.map((user) => user.login),
      datasets: [
        {
          label: "Contributions",
          data: pr.map((user) => calculatePercentage(user)),
          backgroundColor: ["#E2E949", "#36BCBA", "#f55706"],
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
      <div className="flex justify-between flex-column">
        <h2 className="text-[#F9F9F9] font-bold">Team Activity</h2>
      </div>
      <canvas ref={chartRef}></canvas>
    </div>
  );
}
