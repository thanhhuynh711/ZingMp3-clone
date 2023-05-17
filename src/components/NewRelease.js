import React, { memo, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { SongItem } from "./";

const NewRelease = () => {
  const { newRelease } = useSelector((state) => state.app);
  const [isActive, setIsActive] = useState(0);
  const [song, setSong] = useState([]);

  useEffect(() => {
    isActive
      ? setSong(newRelease?.items?.others)
      : setSong(newRelease?.items?.vPop);
  }, [isActive, newRelease]);

  return (
    <div className="text-white mt-12 px-[60px] flex flex-col gap-5 ">
      <div className=" flex items-center justify-between">
        <h3 className="text-[20px] font-bold">{newRelease?.title}</h3>
        <span className="text-xs">TẤT CẢ</span>
      </div>
      <div className="flex items-center gap-3 text-xs">
        <button
          type="button"
          onClick={() => setIsActive(0)}
          className={`py-1 px-4 rounded-l-full rounded-r-full  border border-gray-600 bg-transparent ${
            isActive === 0 && "bg-main-300 text-[#b66ddf] font-bold"
          }`}
        >
          VIỆT NAM
        </button>
        <button
          type="button"
          onClick={() => setIsActive(1)}
          className={`py-1 px-4 rounded-l-full rounded-r-full  border border-gray-600 bg-transparent ${
            isActive === 1 && "bg-main-300 text-[#b66ddf] font-bold"
          }`}
        >
          QUỐC TẾ
        </button>
      </div>
      <div className="flex flex-wrap w-full">
        {song &&
          song.length > 0 &&
          song
            .filter((item, index) => index <= 11)
            .map((item) => (
              <div key={item.encodeId} className="w-[45%] min-[1024px]:w-[33%]">
                <SongItem
                  key={item.encodeId}
                  thumbnail={item.thumbnail}
                  title={
                    item.title?.length >= 40
                      ? `${item.title?.slice(0, 40)}...`
                      : item.title
                  }
                  artistsNames={item.artistsNames}
                  releaseDate={item.releaseDate}
                  sid={item.encodeId}
                />
              </div>
            ))}
      </div>
    </div>
  );
};

export default memo(NewRelease);
