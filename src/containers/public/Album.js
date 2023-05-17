import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import * as apis from "../../apis";
import moment from "moment/moment";
import { Lists, AudioLoading } from "../../components";
import { Scrollbars } from "react-custom-scrollbars-2";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/action";
import icons from "../../ultis/icons";

const { AiOutlinePlayCircle } = icons;

const Album = () => {
  const location = useLocation();
  const { pid } = useParams();
  const { isPlaying } = useSelector((state) => state.music);
  const [playlistData, setPlaylistData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.setCurAlbumId(pid));
    const fetchDetailPlaylist = async () => {
      dispatch(actions.loading(true));
      const response = await apis.apiGetDetailPlaylist(pid);
      dispatch(actions.loading(false));
      if (response?.data.err === 0) {
        setPlaylistData(response.data?.data);
        dispatch(actions.setPlaylist(response?.data?.data?.song?.items));
      }
    };
    fetchDetailPlaylist();
  }, [pid]);

  useEffect(() => {
    if (location.state?.playAlbum) {
      const randomSong =
        Math.round(Math.random() * playlistData?.song?.items?.length) - 1;
      dispatch(
        actions.setCurSongId(playlistData?.song?.items[randomSong]?.encodeId)
      );
      dispatch(actions.play(true));
    }
  }, [pid, playlistData]);

  return (
    <div className="text-white flex relative gap-8 w-full px-[60px] animate-scale-up-center">
      <div className="flex-none w-1/4 items-center flex flex-col gap-1">
        <div className="w-full relative overflow-hidden hover:rounded-full">
          <img
            src={playlistData?.thumbnailM}
            alt="thumbnai"
            className={`w-full object-contain ${
              isPlaying ? "rounded-full animate-rotate-center" : "rounded-md"
            } shadow-md mb-2`}
          />
          <div className="absolute top-0 left-0 bottom-0 right-0 hover:bg-ovelay-30 text-white flex items-center justify-center">
            {isPlaying ? <AudioLoading /> : <AiOutlinePlayCircle size={40} />}
          </div>
        </div>
        <div className="flex flex-col items-center text-[14px]">
          <h3 className="text-[20px] font-bold">{playlistData?.title}</h3>
          <span className=" flex gap-2 items-center text-gray-400">
            <span>Cập nhật:</span>
            <span>
              {moment
                .unix(playlistData?.contentLastUpdate)
                .format("DD/MM/YYYY")}
            </span>
          </span>
          <span className=" flex gap-2 items-center text-center text-gray-400">
            {playlistData?.artistsNames}
          </span>
          <span className=" flex gap-2 items-center text-gray-400">{`${Math.round(
            playlistData?.like / 1000
          )}K Người yêu thích`}</span>
        </div>
      </div>
      <div className="flex-auto">
        <span>
          <span className="text-gray-400">Lời tựa </span>
          <span>{playlistData?.sortDescription}</span>
        </span>
        <Lists
          song={playlistData?.song?.items}
          totalDuration={playlistData?.song?.totalDuration}
        />
      </div>
    </div>
  );
};

export default Album;
