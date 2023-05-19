import React, { useState, useEffect } from "react";
import icons from "../ultis/icons";
import * as actions from "../store/action";
import { useDispatch } from "react-redux";
import { useNavigate, createSearchParams } from "react-router-dom";
import path from "../ultis/path";
import { AiOutlineClose } from "react-icons/ai";

const { BiSearch } = icons;

const Search = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState("");

  const handleSearch = async (e) => {
    if (e.keyCode === 13) {
      dispatch(actions.search(keyword));
      navigate({
        pathname: `/${path.SEARCH}/${path.ALL}`,
        search: createSearchParams({
          q: keyword,
        }).toString(),
      });
    }
  };

  return (
    <div className="w-full relative flex items-center bg-[#2f2739] rounded-[20px]">
      {keyword && (
        <span
          onClick={() => setKeyword("")}
          className="absolute right-[16px] text-white cursor-pointer"
        >
          <AiOutlineClose />
        </span>
      )}
      <span className="text-[#fff] h-10 px-4 flex items-center justify-center ">
        <BiSearch size={20} />
      </span>
      <input
        placeholder="Tìm kiếm bài hát, nghệ sĩ, lời bài hát ..."
        type="text"
        className="outline-none bg-[#2f2739] pr-4 py-2  h-10 text-[#fff] rounded-r-[20px] w-full placeholder:text-gray-200"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyUp={handleSearch}
      />
    </div>
  );
};

export default Search;
