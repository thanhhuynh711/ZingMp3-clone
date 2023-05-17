import React, { useState, useEffect } from "react";
import icons from "../ultis/icons";
import { useSelector } from "react-redux";
import { SongItem } from "./";
import { apiGetDetailPlaylist } from "../apis";
import { Scrollbars } from "react-custom-scrollbars-2";

const { RiDeleteBin6Line } = icons;

const SidebarRight = () => {
  const [isRecent, setIsRecent] = useState(false);
  const [playlist, setPlaylist] = useState();
  const { curSongData, curAlbumId, isPlaying, recentSongs, curSongId } =
    useSelector((state) => state.music);
  const fetchDetailPlaylist = async () => {
    const response = await apiGetDetailPlaylist(curAlbumId);
    if (response.data?.err === 0) setPlaylist(response.data.data?.song?.items);
  };

  useEffect(() => {
    curAlbumId && fetchDetailPlaylist();
  }, []);

  useEffect(() => {
    if (curAlbumId && isPlaying) fetchDetailPlaylist();
  }, [curAlbumId, isPlaying]);

  useEffect(() => {
    isPlaying && setIsRecent(false);
  }, [isPlaying, curSongId]);

  return (
    <div className="flex h-full w-full flex-col bg-[rgba(23,15,35,0.8)] mb-[90px] text-xs text-white">
      <div className="h-[70px] flex-none py-[14px] gap-8 px-2 flex items-center justify-between">
        <div className="flex flex-auto justify-around bg-main-200 rounded-l-full rounded-r-full py-[6px] px-[6px] cursor-pointer">
          <span
            onClick={() => setIsRecent((prev) => !prev)}
            className={`py-[6px] ${
              !isRecent && "bg-main-300"
            } flex-1 flex justify-center items-center rounded-l-full rounded-r-full`}
          >
            Danh sách phát
          </span>
          <span
            onClick={() => setIsRecent((prev) => !prev)}
            className={`py-[6px] ${
              isRecent && "bg-main-300"
            } flex-1 flex justify-center items-center rounded-l-full rounded-r-full`}
          >
            Nghe gần đây
          </span>
        </div>
        <span className="p-2 rounded-full hover:bg-gray-500/40 cursor-pointer">
          <RiDeleteBin6Line />
        </span>
      </div>
      {isRecent ? (
        <div className="w-full flex-auto flex flex-col px-2">
          <Scrollbars
            style={{
              width: "100%",
              height: "calc(100% - 90px)",
              marginBottom: "90px",
            }}
          >
            {recentSongs && (
              <div className="flex flex-col">
                {recentSongs?.map((item) => (
                  <SongItem
                    key={item?.sid}
                    thumbnail={item?.thumbnail}
                    title={item?.title}
                    artistsNames={item?.artistsNames}
                    sid={item?.sid}
                    sm
                  />
                ))}
              </div>
            )}
          </Scrollbars>
        </div>
      ) : (
        <div className="w-full flex-auto flex flex-col px-2">
          <SongItem
            thumbnail={curSongData?.thumbnail}
            title={curSongData?.title}
            artistsNames={curSongData?.artistsNames}
            sid={curSongData?.encodeId}
            sm
            style="bg-main-400"
          />
          <div className="flex flex-col gap-1 pt-[15px] px-2 pb-[5px]">
            <span className="text-sm font-bold">Tiếp theo</span>
            <span className=" text-xs flex gap-1">
              <span className="text-gray-500">Từ playlist</span>
              <span className="text-[#b66ddf] font-semibold">
                {curSongData?.album?.title?.length > 30
                  ? `${curSongData?.album?.title?.slice(0, 30)}...`
                  : curSongData?.album?.title}
              </span>
            </span>
          </div>
          {playlist && (
            <Scrollbars
              style={{
                width: "100%",
                height: "calc(100% - 90px)",
                marginBottom: "90px",
              }}
            >
              <div className="flex flex-col">
                {playlist?.map((item) => (
                  <SongItem
                    key={item?.encodeId}
                    thumbnail={item?.thumbnail}
                    title={item?.title}
                    artistsNames={item?.artistsNames}
                    sid={item?.encodeId}
                    sm
                  />
                ))}
              </div>
            </Scrollbars>
          )}
        </div>
      )}
    </div>
  );
};

export default SidebarRight;
