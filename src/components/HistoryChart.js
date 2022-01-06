import React, { useRef, useEffect, useState } from "react";
import { Chart } from "chart.js";

const HistoryChart = ({ data }) => {
  const chartRef = useRef();
  const { day, week, year, detail, months } = data;
  const [timeFormat, setTimeFormat] = useState("24h");

  const determineTimeFormat = () => {
    switch (timeFormat) {
      case "24h":
        return day;
      case "7d":
        return week;
      case "1m":
        return months;
      case "1y":
        return year;
      default:
        return day;
    }
  };

  const historyOptions = {
    lineHeightAnnotation: {
      always: true,
      hover: false,
      lineWeight: 1.5,
    },

    animation: {
      duration: 2000,
    },
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      xAxes: [
        {
          type: "time",
          distribution: "linear",
        },
      ],
    },
  };

  useEffect(() => {
    if (chartRef && chartRef.current && detail) {
      const chartInstance = new Chart(chartRef.current, {
        type: "line",
        data: {
          datasets: [
            {
              label: `${detail.name} price`,
              data: determineTimeFormat(),
              backgroundColor: "lightblue",
              borderColor: "black",
              pointRadius: 0,
            },
          ],
        },
        options: {
          ...historyOptions,
        },
      });
    }
  });

  const renderPrice = () => {
    if (detail) {
      return (
        <>
          <p className="my-0">${detail.current_price.toFixed(2)}</p>
          <p
            className={
              detail.price_change_24h < 0
                ? "text-danger my-0"
                : "text-success my-0"
            }
          >
            {detail.price_change_percentage_24h.toFixed(2)}%
          </p>
        </>
      );
    }
  };
  return (
    <div className="bg-white border mt-2 rounded p-3 w-[1100px] ml-36">
      <div>{renderPrice()}</div>
      <div>
        <canvas ref={chartRef} id="myChart" width={250} height={250}></canvas>
      </div>

      <div className="chart-button mt-1 relative left-2">
        <button onClick={() => setTimeFormat("24h")} className="chart-btn">
          24h
        </button>
        <button onClick={() => setTimeFormat("7d")} className="chart-btn">
          7d
        </button>
        <button onClick={() => setTimeFormat("1m")} className="chart-btn">
          1m
        </button>
        <button onClick={() => setTimeFormat("1y")} className="chart-btn">
          1y
        </button>
      </div>
    </div>
  );
};

export default HistoryChart;
