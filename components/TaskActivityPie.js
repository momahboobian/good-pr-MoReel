import React, { useEffect, useState, useRef } from "react";
import ReactECharts from "echarts-for-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartSimple, faChartPie } from "@fortawesome/free-solid-svg-icons";

export default function TeamActivityPie({ pr }) {
  const [chartOptions, setChartOptions] = useState(null);
  const [chartType, setChartType] = useState("pie");
  const [prsDoneCount, setPrsDoneCount] = useState(0);
  const chartContainerRef = useRef(null);

  const prUsers = pr
    .filter((user) => user.items && user.items.length > 0) // Filter out undefined or empty items
    .map((user) => user.items[0].user.login);

  const totalContributions = pr.reduce(
    (total, prs) => total + (prs.total_count || 0),
    0
  );

  useEffect(() => {
    const chartData = prUsers.map((user) => {
      const prItem = pr.find(
        (prs) =>
          prs.items && prs.items.length > 0 && prs.items[0].user?.login === user
      );
      const total_count = prItem?.total_count || 0;
      return {
        name: filterAndTruncateName(user, 6),
        value: calculatePercentage(total_count, totalContributions),
      };
    });

    const options = {
      tooltip: {
        trigger: "item",
        formatter: "{b}: {d}%",
        backgroundColor: "#6064677F",
        textStyle: {
          color: "#fff",
        },
      },
      legend: {
        orient: "vertical",
        x: "right",
        right: "1",
        textStyle: {
          fontSize: 12,
          color: "#606467",
        },
        padding: [10, 20, 10, 10],
        data: chartData.map((dataItem) => dataItem.name),
      },
      series: [
        {
          name: "Contributions",
          type: chartType, // Use the current chart type
          radius: ["35%", "70%"],
          avoidLabelOverlap: false,
          label: {
            show: true,
            position: "inside",
            formatter: "{c}%",
            color: "#000",
            fontSize: 15,
          },
          labelLine: {
            show: false,
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
            color: "#606467",
          },
        },
        splitLine: {
          show: false,
        },
      },
      yAxis: {
        type: "value",
        max: 100,
        show: chartType === "bar",
        axisLabel: {
          // margin: -300,
          // position: "right",
        },
        axisLine: {
          lineStyle: {
            color: "#606467",
          },
        },
        splitLine: {
          // show: false,
          lineStyle: {
            color: "#676360",
            opacity: 0.04,
          },
          width: "100%", // Set the default width for the chart
          height: "400px", // Set the default height for the chart
        },
      },
    };

    setChartOptions(options);
  }, [pr, chartType]);

  const filterAndTruncateName = (name, maxLength) => {
    const filteredName = name.replace(/[^A-Za-z0-9]/g, ""); // Remove non-alphanumeric characters
    return filteredName.substring(0, maxLength);
  };

  useEffect(() => {
    // Update the count of PRs done dynamically
    const interval = setInterval(() => {
      if (prsDoneCount < totalContributions) {
        setPrsDoneCount((prevCount) => prevCount + 1);
      }
    }, 30);

    return () => {
      clearInterval(interval);
    };
  }, [prsDoneCount, totalContributions]);

  // const calculatePercentage = (individualPrNumber, totalContributions) => {
  //   if (totalContributions === 0) {
  //     return 0;
  //   }
  //   return Math.round((100 * individualPrNumber) / totalContributions);
  // };

  useEffect(() => {
    // ...rest of the code...

    const handleResize = () => {
      if (
        chartContainerRef.current &&
        chartContainerRef.current.echartsElement
      ) {
        const echartsInstance =
          chartContainerRef.current.echartsElement.getEchartsInstance();
        if (echartsInstance) {
          echartsInstance.resize();
        }
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const calculatePercentage = (individualPrNumber, totalContributions) => {
    if (totalContributions === 0) {
      return 0;
    }

    const percentage = (100 * individualPrNumber) / totalContributions;
    const roundedPercentage = Math.round(percentage); // Round the percentage value

    const adjustment = 100 - roundedPercentage * totalContributions;

    if (individualPrNumber === totalContributions) {
      return 100; // Return 100 if it's the last item to avoid rounding errors
    } else if (individualPrNumber % 2 === 0) {
      return roundedPercentage + Math.sign(adjustment); // Add adjustment with rounding up/down
    } else {
      return roundedPercentage;
    }
  };

  const handleChartTypeChange = (event) => {
    event.preventDefault();
    setChartType((prevChartType) => (prevChartType === "bar" ? "pie" : "bar"));

    const newChartType = chartType === "bar" ? "pie" : "bar";
    setChartType(newChartType);

    setTimeout(() => {
      setChartType(newChartType);
    }, 300);
  };

  return (
    <div className="bg-[#1A1E1F] rounded-2xl w-full min-w-max">
      <div className="flex flex-col justify-between max-w-xs mx-auto md:max-w-md lg:max-w-lg p-6 space-y-10 h-80 relative">
        <div className="flex space-x-10 items-center">
          <h1 className="font-bold text-s text-white">Team Activity</h1>
          <div className="flex justify-center items-center absolute inset-0 -left-6 -top-64">
            <a
              href="#"
              className="text-gray-500 text-lg z-10"
              onClick={handleChartTypeChange}
            >
              {chartType === "pie" ? (
                <FontAwesomeIcon
                  icon={faChartSimple}
                  className="w-5 mr-3 text-[#606467] transition duration-300 hover:scale-110 hover:text-teal-500"
                />
              ) : (
                <FontAwesomeIcon
                  icon={faChartPie} // Replace faPieIcon with the desired pie chart icon
                  className="w-5 mr-3 text-[#606467] transition duration-300 hover:scale-110 hover:text-teal-500"
                />
              )}
            </a>
          </div>
        </div>
        <div
          className="flex justify-center items-center h-80 w-full min-w-[300px] relative"
          style={{
            transition: "height 1s ease-in",
            height: chartType === "bar" ? "320px" : "360px",
          }}
        >
          {chartType === "pie" ? (
            <div className="flex justify-center items-center absolute inset-0 -mt-3">
              <div className="text-[#F9F9F9] font-bold text-2xl">
                {prsDoneCount}
              </div>
              <p className="text-[#606467] text-xs ml-[10px]">Prs Done</p>
            </div>
          ) : (
            ""
          )}
          <div
            className="absolute -top-20 w-full h-full "
            ref={chartContainerRef}
          >
            {chartOptions && (
              <ReactECharts
                option={chartOptions}
                container="chart-container"
                className="h-full"
                style={{ height: "350px" }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
