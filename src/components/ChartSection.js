import React, { useState, useEffect, memo } from "react";
import bgChart from "../assets/img/download2.jpg";
import { Chart } from "chart.js/auto";
import { useSelector } from "react-redux";
import { Line } from "react-chartjs-2";

const ChartSection = () => {
  const [data, setData] = useState(null);
  const { chart, rank } = useSelector((state) => state.app);
  const options = {
    responsive: true,
    pointRadius: 0,
    aspectRatio: 5,
    scales: {
      y: {
        ticks: { display: false },
        grid: { borderDash: [4, 4], color: "rgba(255,255,255,0.5)" },
      },
      x: {
        ticks: { color: "white" },
        grid: { color: "transparent" },
      },
    },
    plugins: {
      legend: false,
    },
  };

  useEffect(() => {
    const labels = chart?.times
      ?.filter((item) => +item.hour % 2 === 0)
      ?.map((item) => item.hour);
    const dataSets = [];
    if (chart?.items) {
      for (let i = 0; i < 3; i++) {
        dataSets.push({
          data: chart?.items[Object.keys(chart?.items)[i]]
            ?.filter((item) => +item.hour % 2 === 0)
            ?.map((item) => item.counter),
          // borderColor: i === 0 ? "blue" : i === 1 ? "yellow" : "red",
          // tension: 0.2,
          // borderWidth: 2,
        });
      }
      // setData({ labels, dataSets });
    }
  }, [chart]);

  return (
    <div className="px-[60px] mt-12 relative">
      <img
        src={bgChart}
        alt="bg-chart"
        className="w-full object-fill rounded-md"
      />
      <div className="absolute rounded-md top-0 left-[60px] right-[60px] bottom-0 z-10 bg-gradient-to-t from-[rgba(0,0,0,0.7)] to-[rgba(51,51,51,0.7)]"></div>
      <div className="absolute rounded-md top-0 left-[60px] right-[60px] bottom-0 z-20">
        <h3 className="text-2xl text-white font-bold">#ZingChart</h3>
        <div className="flex gap-4 h-full">
          <div className="flex-4">rank</div>
          <div className="flex-6 h-full">{data && <Line data={data} />}</div>
        </div>
      </div>
    </div>
  );
};

export default memo(ChartSection);
