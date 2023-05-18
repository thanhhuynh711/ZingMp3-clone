import React, { memo } from "react";
import icons from "../ultis/icons";
import moment from "moment/moment";
import { useDispatch } from "react-redux";
import * as actions from "../store/action";

const { BsMusicNoteBeamed } = icons;

const List = ({ songData, isHideAlbum }) => {
  const dispatch = useDispatch();
  return (
    <div
      onClick={() => {
        dispatch(actions.setCurSongId(songData?.encodeId));
        dispatch(actions.play(true));
        dispatch(actions.playAlbum(true));
        dispatch(
          actions.setRecent({
            thumbnail: songData?.thumbnail,
            title: songData?.title,
            artistsNames: songData?.artistsNames,
            sid: songData?.encodeId,
          })
        );
      }}
      className="flex justify-between items-center py-[10px] w-full border-t border-gray-800 hover:bg-[rgba(34,26,45,0.8)] rounded-md px-2 cursor-pointer"
    >
      <div
        className={
          !isHideAlbum
            ? "flex items-center gap-2 w-[45%]"
            : "flex items-center gap-2 w-[80%]"
        }
      >
        <span>{!isHideAlbum && <BsMusicNoteBeamed size={14} />}</span>
        <img
          src={songData?.thumbnail}
          alt="thumbnail"
          className="w-10 h-10 object-cover rounded-md"
        />
        <span className="flex flex-col w-full">
          <span className="text-sm font-semibold">
            {songData?.title?.length > 35
              ? `${songData?.title?.slice(0, 35)}...`
              : songData?.title}
          </span>
          <span className="text-[12px] text-gray-400">
            {songData?.artistsNames}
          </span>
        </span>
      </div>
      {!isHideAlbum && (
        <div className="w-[40%] flex justify-start items-cente text-sm text-gray-400">
          {songData?.album?.title?.length > 50
            ? `${songData?.album?.title?.slice(0, 50)}...`
            : songData?.album?.title}
        </div>
      )}
      <div className="w-[15%] flex justify-end">
        {moment.utc(songData?.duration * 1000).format("mm:ss")}
      </div>
    </div>
  );
};

export default memo(List);
