import React, { memo } from "react";
import { List } from "./";
import icons from "../ultis/icons";
import moment from "moment/moment";
import { useSelector } from "react-redux";

const { BsDot } = icons;

const Lists = (song) => {
  const { songs } = useSelector((state) => state.music);
  return (
    <div className="w-full flex flex-col mt-4">
      <div className=" flex justify-between items-center text-gray-400 mb-3 font-semibold text-[14px] px-2">
        <span>BÀI HÁT</span>
        <span>ALBUM</span>
        <span>THỜI GIAN</span>
      </div>
      <div className="flex flex-col">
        {songs?.map((item) => (
          <List key={item.encodeId} songData={item} />
        ))}
      </div>
      <span className="flex py-2 items-center border-t border-gray-800">
        <span>{`${songs?.length} bài hát`}</span>
        <BsDot size={20} />
        <span>{moment.utc(song?.totalDuration * 1000).format("HH:mm:ss")}</span>
      </span>
    </div>
  );
};

export default memo(Lists);
