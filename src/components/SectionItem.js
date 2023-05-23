import React, { memo, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import icons from "../ultis/icons";

const { AiFillHeart, AiOutlineHeart, BsFillPlayFill, BsThreeDots } = icons;

const SectionItem = ({
  link,
  thumbnail,
  title,
  artistsNames,
  sortDescription,
  data,
  NoSortDescription,
  padding,
}) => {
  const navigate = useNavigate();
  const [isHover, setIsHover] = useState(false);
  const imgRef = useRef();
  const handleHover = (e) => {
    setIsHover(true);
    imgRef.current.classList?.add("animate-scale-up-image");
    imgRef.current.classList?.remove("animate-scale-down-image");
  };

  const handleLeave = (e) => {
    setIsHover(false);
    imgRef.current.classList?.add("animate-scale-down-image");
    imgRef.current.classList?.remove("animate-scale-up-image");
  };

  return (
    <div
      onClick={() => {
        navigate(link?.split(".")[0], { state: { playAlbum: false } });
      }}
      className={
        !padding
          ? "flex flex-col flex-1 gap-3 text-sm cursor-pointer"
          : "flex flex-col flex-1 mx-[-16px] p-4 gap-3 text-sm cursor-pointer"
      }
    >
      <div
        onMouseEnter={handleHover}
        onMouseLeave={handleLeave}
        className="relative w-full overflow-hidden rounded-md"
      >
        {isHover && (
          <div className="absolute text-white gap-4 flex justify-center items-center top-0 bottom-0 z-40 left-0 right-0 bg-ovelay-30 rounded-md">
            <span>
              <AiOutlineHeart size={23} />
            </span>
            <span
              onClick={(e) => {
                e.stopPropagation();
                navigate(link?.split(".")[0], { state: { playAlbum: true } });
              }}
              className="hover:text-white/50"
            >
              <BsFillPlayFill size={35} />
            </span>
            <span className="hover:text-white/50">
              <BsThreeDots size={25} />
            </span>
          </div>
        )}
        <img
          ref={imgRef}
          className="w-full h-auto rounded-lg object-cover"
          src={thumbnail}
          alt="thumbnail"
        />
      </div>
      <span className="flex flex-col">
        <span className="font-semibold mb-1">
          {" "}
          {title?.length >= 25 ? `${title?.slice(0, 25)}...` : title}
        </span>
        {data?.sectionId === "h100" ? (
          <span>{artistsNames}</span>
        ) : (
          <span>
            {!NoSortDescription
              ? sortDescription?.length >= 40
                ? `${sortDescription?.slice(0, 40)}...`
                : sortDescription
              : ""}
          </span>
        )}
      </span>
    </div>
  );
};

export default memo(SectionItem);
