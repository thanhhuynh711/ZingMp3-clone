import React, { memo } from "react";
import icons from "../ultis/icons";
import moment from "moment/moment";
import { useDispatch } from "react-redux";
import * as actions from "../store/action";

const { BsMusicNoteBeamed } = icons;

const List = ({ songData, isHideAlbum, isHideNode, order, isWorldWide }) => {
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
        {order && (
          <div
            className={`${
              order === 1
                ? "text-shadow-no1"
                : order === 2
                ? "text-shadow-no2 "
                : order === 3
                ? "text-shadow-no3"
                : "text-shadow-rest"
            } text-[rgba(23,15,35,0.8)] text-[32px] flex flex-none w-[5%] justify-center items-center`}
          >
            {order}
          </div>
        )}
        <span>{!isHideAlbum && <BsMusicNoteBeamed size={14} />}</span>
        <img
          src={songData?.thumbnail}
          alt="thumbnail"
          className="w-10 h-10 object-cover rounded-md"
        />
        <span className="flex flex-col w-full">
          <span
            className={
              isWorldWide === true
                ? "text-sm font-semibold"
                : "text-sm font-semibold text-gray-600"
            }
          >
            {songData?.title?.length > 35
              ? `${songData?.title?.slice(0, 35)}...`
              : songData?.title}
            <span
              className={
                isWorldWide === false
                  ? "bg-yellow-500 text-white text-[10px] ml-3 py-[3px] px-1 rounded-l-[2px] rounded-r-[2px]"
                  : "hidden"
              }
            >
              PREMIUM
            </span>
          </span>
          <span
            className={
              isWorldWide === true
                ? "text-[12px] text-gray-400"
                : "text-[12px] text-gray-600"
            }
          >
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
