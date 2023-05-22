import React, { memo, useEffect, useState } from "react";
import { List } from "./";
import { useNavigate } from "react-router-dom";
import path from "../ultis/path";

const RankList = ({ data, number, isHideAlbum, titleBtn, link, noneBtn }) => {
  const [isShowFull, setIsShowFull] = useState(false);
  const [songs, setSongs] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isShowFull) {
      setSongs(data?.filter((i, index) => index < number));
    } else {
      setSongs(data);
    }
  }, [isShowFull, data]);

  return (
    <div className="w-full ">
      {songs?.map((item, index) => (
        <List
          songData={item}
          key={item.encodeId}
          isHideAlbum
          order={index + 1}
        />
      ))}
      <div className="flex justify-center items-center w-full">
        {!noneBtn && (
          <button
            type="button"
            className="px-4 py-2 border my-4 m-auto hover:text-[#b66ddf] hover:border-[#b66ddf] border-gray-300 rounded-l-full rounded-r-full "
            onClick={() =>
              link
                ? navigate(link.split(".")[0])
                : setIsShowFull((prev) => !prev)
            }
          >
            {isShowFull ? "Ẩn bớt" : titleBtn}
          </button>
        )}
      </div>
    </div>
  );
};

export default memo(RankList);
