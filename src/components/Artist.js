import React, { memo } from "react";
import { handleNumber } from "../ultis/fn";
import { AiOutlineUserAdd } from "react-icons/ai";

const Artist = ({ image, title, follower }) => {
  return (
    <div className="w-1/5 items-center flex flex-col gap-[15px]">
      <img
        src={image}
        alt="singer"
        className="w-[70%] object-contain rounded-full"
      />
      <div className="flex gap-1 flex-col items-center">
        <span className="text-sm font-medium">{title}</span>
        <span className="text-xs opacity-70">{`${handleNumber(
          follower
        )} quan tâm`}</span>
        <button
          type="button"
          className="bg-[#b66ddf] hover:opacity-80 px-4 py-1 text-sm rounded-l-full rounded-r-full flex justify-center items-center gap-1"
        >
          <span>
            <AiOutlineUserAdd />
          </span>
          <span className="text-xs ">QUAN TÂM</span>
        </button>
      </div>
    </div>
  );
};

export default memo(Artist);
