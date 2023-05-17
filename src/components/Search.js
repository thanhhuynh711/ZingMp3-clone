import React from "react";
import icons from "../ultis/icons";

const { BiSearch } = icons;

const Search = () => {
  return (
    <div className="w-full flex items-center bg-[#2f2739] rounded-[20px]">
      <span className="text-[#fff] h-10 px-4 flex items-center justify-center ">
        <BiSearch size={20} />
      </span>
      <input
        placeholder="Tìm kiếm bài hát, nghệ sĩ, lời bài hát ..."
        type="text"
        className="outline-none bg-[#2f2739] pr-4 py-2  h-10 text-[#fff] rounded-r-[20px] w-full placeholder:text-gray-200"
      />
    </div>
  );
};

export default Search;
