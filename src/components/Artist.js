import React, { memo, useState } from "react";
import { handleNumber } from "../ultis/fn";
import { AiOutlineUserAdd } from "react-icons/ai";
import { Link } from "react-router-dom";

const Artist = ({ image, title, follower, link }) => {
  const [isHover, setIsHover] = useState(false);
  return (
    <div className="w-1/5 items-center flex flex-col gap-[15px]">
      <Link
        to={link}
        className="relative overflow-hidden rounded-full cursor-pointer"
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <img
          src={image}
          alt="singer"
          className={`w-full object-contain rounded-full ${
            isHover ? "animate-scale-up-image" : "animate-scale-down-image"
          }`}
        />

        {isHover && (
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-ovelay-30 rounded-full"></div>
        )}
      </Link>
      <div className="flex gap-1 flex-col items-center">
        <Link
          to={link}
          className="text-sm font-medium hover:underline hover:text-[#b66ddf]"
        >
          {title}
        </Link>
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
