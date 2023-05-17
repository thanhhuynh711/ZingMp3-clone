import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as apis from "../apis";
import icons from "../ultis/icons";
import * as actions from "../store/action";
import moment from "moment";
import { toast } from "react-toastify";
import { LoadingSong } from "./";

const {
  AiFillHeart,
  AiOutlineHeart,
  HiOutlineDotsHorizontal,
  BsRepeat,
  BsRepeat1,
  BiSkipNext,
  RiSkipBackMiniFill,
  IoShuffleOutline,
  BsFillPlayFill,
  BsFillPauseFill,
  RiPlayListFill,
  BsFillVolumeUpFill,
  BsFillVolumeMuteFill,
  BsFillVolumeDownFill,
} = icons;

var intervalId;

const Player = ({ setIsShowRightSidebar }) => {
  const { curSongId, isPlaying, songs } = useSelector((state) => state.music);
  const [songInfo, setSongInfo] = useState(null);
  const [audio, setAudio] = useState(new Audio());
  const [curSeconds, setCurSeconds] = useState(0);
  const [isShuffe, setIsShuffe] = useState(false);
  const [repeatMode, setRepeatMode] = useState(0);
  const [isLoadedSource, setIsLoadedSource] = useState(true);
  const [volume, setVolume] = useState(100);
  const dispatch = useDispatch();
  const thumbRef = useRef();
  const trackRef = useRef();

  useEffect(() => {
    const fetchDetalSong = async () => {
      setIsLoadedSource(false);
      const [res1, res2] = await Promise.all([
        apis.apiGetDetaiSong(curSongId),
        apis.apiGetSong(curSongId),
      ]);
      setIsLoadedSource(true);
      if (res1.data.err === 0) {
        setSongInfo(res1.data.data);
        dispatch(actions.setCurSongData(res1.data.data));
      }
      if (res2.data.err === 0) {
        audio.pause();
        setAudio(new Audio(res2.data.data["128"]));
      } else {
        audio.pause();
        setAudio(new Audio());
        dispatch(actions.play(false));
        toast.warning(res2.data.msg);
        setCurSeconds(0);
        thumbRef.current.style.cssText = `right: 100%`;
      }
    };
    fetchDetalSong();
  }, [curSongId]);

  useEffect(() => {
    intervalId && clearInterval(intervalId);
    audio.pause();
    audio.load();
    if (isPlaying && thumbRef.current) {
      audio.play();
      intervalId = setInterval(() => {
        let percent =
          Math.round((audio.currentTime * 10000) / songInfo.duration) / 100;
        thumbRef.current.style.cssText = `right: ${100 - percent}%`;
        setCurSeconds(Math.round(audio.currentTime));
      }, 200);
    }
  }, [audio]);

  useEffect(() => {
    const handleEnded = () => {
      if (isShuffe) {
        handleShuffle();
      } else if (repeatMode) {
        repeatMode === 1 ? handleRepeatOne() : handleNextSong();
      } else {
        audio.pause();
        dispatch(actions.play(false));
      }
    };
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("ended", handleEnded);
    };
  }, [audio, isShuffe, repeatMode]);

  useEffect(() => {
    audio.volume = volume / 100;
  }, [volume]);

  const handleTogglePlayMusic = () => {
    if (isPlaying) {
      audio.pause();
      dispatch(actions.play(false));
    } else {
      audio.play();
      dispatch(actions.play(true));
    }
  };

  const handleClickProgressbar = (e) => {
    const trackRect = trackRef.current.getBoundingClientRect();
    const percent =
      Math.round(((e.clientX - trackRect.left) * 10000) / trackRect.width) /
      100;
    thumbRef.current.style.cssText = `right: ${100 - percent}%`;
    audio.currentTime = (percent * songInfo.duration) / 100;
    setCurSeconds(Math.round((percent * songInfo.duration) / 100));
  };

  const handleNextSong = () => {
    if (songs) {
      let currentSongIndex;
      songs?.forEach((item, index) => {
        if (item.encodeId === curSongId) currentSongIndex = index;
      });
      dispatch(actions.setCurSongId(songs[currentSongIndex + 1].encodeId));
      dispatch(actions.play(true));
    }
  };

  const handlePrevSong = () => {
    if (songs) {
      let currentSongIndex;
      songs?.forEach((item, index) => {
        if (item.encodeId === curSongId) currentSongIndex = index;
      });
      dispatch(actions.setCurSongId(songs[currentSongIndex - 1].encodeId));
      dispatch(actions.play(true));
    }
  };

  const handleShuffle = () => {
    const randomIndex = Math.round(Math.random() * songs?.length) - 1;
    dispatch(actions.setCurSongId(songs[randomIndex].encodeId));
    dispatch(actions.play(true));
  };

  const handleRepeatOne = () => {
    audio.play();
  };

  return (
    <div className="bg-main-400 h-full px-5 text-white flex ">
      <div className="flex-auto w-[30%] flex items-center">
        <img
          src={songInfo?.thumbnail}
          alt="thumbnail"
          className="w-16 h-16 object-cover rounded-md"
        />
        <div className="flex flex-col ml-3">
          <span className="font-semibold ">{songInfo?.title}</span>
          <span className="text-sm text-gray-400">
            {songInfo?.artistsNames}
          </span>
        </div>
        <div className="flex gap-1 pl-6">
          <span>
            <AiOutlineHeart size={16} />
          </span>
          <span>
            <HiOutlineDotsHorizontal size={16} />
          </span>
        </div>
      </div>
      <div className="flex-auto w-[40%] flex flex-col items-center gap-2 justify-center py-2">
        <div className="flex gap-8 items-center justify-center">
          <span
            onClick={() => setIsShuffe((prev) => !prev)}
            className={`${
              isShuffe ? "text-purple-300 cursor-pointer" : "text-white"
            } hover:text-gray-400`}
            title="Bật phát ngẫu nhiên"
          >
            <IoShuffleOutline size={22} />
          </span>
          <span
            onClick={handlePrevSong}
            className={`${
              !songs ? "text-gray-400" : "hover:text-gray-400 cursor-pointer"
            }`}
          >
            <RiSkipBackMiniFill size={22} />
          </span>
          <span
            onClick={handleTogglePlayMusic}
            className="cursor-pointer hover:text-gray-400"
          >
            {!isLoadedSource ? (
              <LoadingSong />
            ) : isPlaying ? (
              <BsFillPauseFill size={30} />
            ) : (
              <BsFillPlayFill size={30} />
            )}
          </span>
          <span
            onClick={handleNextSong}
            className={` ${
              !songs ? "text-gray-400" : "cursor-pointer hover:text-gray-400"
            }`}
          >
            <BiSkipNext size={24} />
          </span>
          <span
            className={`${
              repeatMode && "text-purple-300 cursor-pointer"
            } hover:text-gray-400`}
            title="Bật phát lại tất cả"
            onClick={() => setRepeatMode((prev) => (prev === 2 ? 0 : prev + 1))}
          >
            {repeatMode === 1 ? (
              <BsRepeat1 size={22} />
            ) : (
              <BsRepeat size={22} />
            )}
          </span>
        </div>
        <div className="w-full flex items-center justify-center gap-3 text-sm">
          <span className="">
            {moment.utc(curSeconds * 1000).format("mm:ss")}
          </span>
          <div
            ref={trackRef}
            onClick={handleClickProgressbar}
            className="w-3/4 hover:h-[8px] cursor-pointer rounded-l-full rounded-r-full relative h-[3px] bg-gray-500"
          >
            <div
              ref={thumbRef}
              className="absolute rounded-l-full rounded-r-full top-0 bottom-0 left-0 bg-white"
            ></div>
          </div>
          <span>{moment.utc(songInfo?.duration * 1000).format("mm:ss")}</span>
        </div>
      </div>
      <div className="flex-auto w-[30%] flex-auto flex items-center justify-end gap-4">
        <div className="flex gap-2 items-center">
          <span onClick={() => setVolume((prev) => (+prev === 0 ? 70 : 0))}>
            {+volume >= 50 ? (
              <BsFillVolumeUpFill size={20} />
            ) : +volume == 0 ? (
              <BsFillVolumeMuteFill size={20} />
            ) : (
              <BsFillVolumeDownFill size={20} />
            )}
          </span>
          <input
            type="range"
            step={1}
            min={0}
            max={100}
            value={volume}
            onChange={(e) => setVolume(e.target.value)}
          />
        </div>
        <span
          onClick={() => setIsShowRightSidebar((prev) => !prev)}
          className="p-1 rounded-md bg-main-100 hover:bg-main-300 cursor-pointer"
        >
          <RiPlayListFill size={20} />
        </span>
      </div>
    </div>
  );
};

export default Player;
