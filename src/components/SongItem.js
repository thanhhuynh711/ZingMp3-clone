import React from "react";
import { memo } from "react";
import moment from "moment";
import "moment/locale/vi";
import { useDispatch } from "react-redux";
import * as actions from "../store/action";

const SongItem = ({
  thumbnail,
  title,
  artistsNames,
  sid,
  releaseDate,
  style,
  sm,
}) => {
  const dispatch = useDispatch();

  return (
    <div
      onClick={() => {
        dispatch(actions.setCurSongId(sid));
        dispatch(actions.play(true));
        dispatch(actions.setRecent({ thumbnail, title, artistsNames, sid }));
      }}
      className={`w-full flex-auto flex gap-[10px] p-[10px] ${
        style || "hover:bg-main-100/40"
      } rounded-md`}
    >
      <img
        src={thumbnail}
        className={` object-cover rounded-md ${
          sm ? "w-[40px] h-[40px]" : "w-[60px] h-[60px]"
        }`}
        alt="thumbnail"
      />
      <div className="flex flex-col">
        <span className="text-sm font-semibold">
          {title?.length > 30 ? `${title.slice(0, 30)}...` : title}
        </span>
        <span className={` text-gray-500 ${sm ? "text-xs" : "text-sm"}`}>
          {artistsNames?.length > 30
            ? `${artistsNames.slice(0, 30)}...`
            : artistsNames}
        </span>
        {releaseDate && (
          <span className="text-sm text-gray-600">
            {moment(releaseDate * 1000).fromNow()}
          </span>
        )}
      </div>
    </div>
  );
};

export default memo(SongItem);
