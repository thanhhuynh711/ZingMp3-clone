import React, { useEffect, useState } from "react";
import { apiGetChartHome } from "../../apis/music";
import { RankList } from "../../components";

const ZingChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchChartData = async () => {
      const response = await apiGetChartHome();
      if (response.data.err === 0) setChartData(response.data.data);
    };
    fetchChartData();
  }, []);

  // console.log(chartData);

  return (
    <div className="text-white px-[60px] mt-4">
      <div className="flex">
        <h3 className="bg-zingchart mb-8">#Zingchart</h3>
      </div>
      <RankList
        data={chartData?.RTChart?.items}
        number={10}
        titleBtn={"Xem top 100"}
      />
      <div>
        <h3 className="font-bold text-[40px] mb-8">Bảng Xếp Hạng Tuần</h3>
        <div className="flex gap-4 mt-3">
          {chartData?.weekChart &&
            Object.entries(chartData?.weekChart)?.map((item, index) => (
              <div
                key={index}
                className="flex-1 bg-[rgba(23,15,35,0.8)] rounded-md px-[10px] pt-[10px] "
              >
                <h3 className="font-bold hover:text-[#b66ddf] cursor-pointer text-[24px]">
                  {item[0] === "vn"
                    ? "Việt Nam"
                    : item[0] === "us"
                    ? "US-UK"
                    : item[0] === "korea"
                    ? "K-Pop"
                    : ""}
                </h3>
                <div className="mt-4 h-fit">
                  <RankList
                    data={item[1]?.items}
                    number={5}
                    isHideAlbum={true}
                    titleBtn={"Xem tất cả"}
                    link={item[1]?.link}
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ZingChart;
