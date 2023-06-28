import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartSimple, faChartPie } from "@fortawesome/free-solid-svg-icons";

export default function TeamActivityPie({ pr }) {
  const [chartOptions, setChartOptions] = useState(null);
  const [chartType, setChartType] = useState("pie");
  const [prsDoneCount, setPrsDoneCount] = useState(0);

  const prUsers = pr.map((user) => user.items[0].user.login);

  const totalContributions = pr.reduce(
    (total, prs) => total + (prs?.total_count || 0),
    0
  );

  useEffect(() => {
    const chartData = prUsers.map((user) => ({
      name: user,
      value: calculatePercentage(
        pr.find((prs) => prs.items[0].user.login === user)?.total_count || 0,
        totalContributions
      ),
    }));

    const options = {
      tooltip: {
        trigger: "item",
        formatter: "{b}: {d}%",
      },
      legend: {
        orient: "vertical",
        right: "1",
        top: "1",
        textStyle: {
          fontSize: 12,
          color: "#606467",
        },
        data: prUsers,
      },
      series: [
        {
          name: "Contributions",
          type: chartType, // Use the current chart type
          radius: ["40%", "70%"],
          label: {
            show: true,
            position: "inside",
            formatter: "{c}%",
          },
          labelLine: {
            show: true,
            length: 10,
            length2: 10,
          },
          data: chartData,
          itemStyle: {
            color: (params) =>
              [
                "rgba(255, 240, 67, 0.8)",
                "rgba(234, 88, 12, 0.8)",
                "rgba(14, 116, 144, 0.8)",
                "rgba(124, 58, 237, 0.8)",
                "rgba(161, 98, 7, 0.8)",
              ][params.dataIndex % 5],
          },
        },
      ],
      xAxis: {
        type: "category",
        axisLabel: {
          formatter: (value) => value.substring(0, 6),
        },
        data: prUsers.map((user) => user),
        show: chartType === "bar",
        axisLine: {
          lineStyle: {
            color: "#606467", // Set the color of the axis line to red
          },
        },
        splitLine: {
          show: false, // Hide the grid lines
        },
      },
      yAxis: {
        type: "value",
        max: 100,
        show: chartType === "bar",
        axisLine: {
          lineStyle: {
            color: "#606467",
          },
        },
        splitLine: {
          lineStyle: {
            color: "#606467",
            opacity: 0.1,
          },
        },
      },
    };

    setChartOptions(options);
  }, [pr, chartType]);

  useEffect(() => {
    // Update the count of PRs done dynamically
    const interval = setInterval(() => {
      if (prsDoneCount < totalContributions) {
        setPrsDoneCount((prevCount) => prevCount + 1);
      }
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, [prsDoneCount, totalContributions]);

  const calculatePercentage = (individualPrNumber, totalContributions) => {
    return Math.round((100 * individualPrNumber) / totalContributions);
  };

  const handleChartTypeChange = (event) => {
    event.preventDefault();
    setChartType((prevChartType) => (prevChartType === "bar" ? "pie" : "bar"));
  };

  return (
    <div className="flex flex-cols-1 gap-4 max-w-m bg-[#1A1E1F] p-0 rounded-2xl">
      <div className="flex items-start gap-4">
        <div className="flex flex-col justify-between h-96 w-96 bg-[#1A1E1F] rounded-2xl p-9 relative">
          <div className="flex justify-between items-center">
            <h1 className="font-bold text-s text-white">Team Activity</h1>

            <a
              href="#"
              className="text-gray-500 text-lg "
              onClick={handleChartTypeChange}
            >
              {chartType === "pie" ? (
                <FontAwesomeIcon
                  icon={faChartSimple}
                  className="w-5 mr-3 text-[#606467]"
                />
              ) : (
                <FontAwesomeIcon
                  icon={faChartPie} // Replace faPieIcon with the desired pie chart icon
                  className="w-5 mr-3 text-[#606467]"
                />
              )}
            </a>
          </div>
          <div className="flex justify-left gap-1 items-center absolute top-24">
            <div className="text-[#F9F9F9] font-bold text-2xl">
              {prsDoneCount}
            </div>
            <p className="text-[#606467] text-xs ml-[10px] items-end">
              Prs Done
            </p>
          </div>
          <div className="absolute -bottom-8">
            {chartOptions && (
              <ReactECharts
                option={chartOptions}
                notMerge={true}
                style={{ width: "300px", height: "320px" }} // Prevent merging with previous options
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
