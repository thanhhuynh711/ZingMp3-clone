import React, { useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import { RankList } from "../../components";

const notActivedStyle =
  "font-bold mr-10 hover:text-[#b66ddf] py-[10px] cursor-pointer text-[24px]";
const activedStyle =
  "font-bold mr-10 border-b-4 border-[#b66ddf] py-[10px] text-[#b66ddf] cursor-pointer text-[24px]";

const WeekRank = ({ weekChart }) => {
  const { pid } = useParams();
  useEffect(() => {
    // console.log(pid);
  }, [pid]);

  return (
    <div>
      <div className="w-full h-[60px]"></div>
      <div className="text-white px-[60px] flex flex-col gap-2">
        <h3 className="font-bold text-[40px] mb-8">Bảng Xếp Hạng Tuần</h3>
        <div className="flex mb-6">
          {weekChart?.map((item) => (
            <NavLink
              key={item.chartId}
              className={({ isActive }) =>
                isActive ? activedStyle : notActivedStyle
              }
              to={item.link.split(".")[0]}
            >
              {item.country === "vn"
                ? "VIỆT NAM"
                : item.country === "us"
                ? "US-UK"
                : item.country === "korea"
                ? "K-POP"
                : ""}
            </NavLink>
          ))}
        </div>
        <RankList
          data={weekChart?.find((item) => item?.link?.includes(pid))?.items}
          number={100}
          noneBtn
        />
      </div>
    </div>
  );
};

export default WeekRank;
