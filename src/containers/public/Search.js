import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { NavLink, useSearchParams } from "react-router-dom";
import { searchMenu } from "../../ultis/menu";
import { useSelector } from "react-redux";

const notActiveStyle = "px-4 hover:text-[#b66ddf] cursor-pointer font-semibold";
const activeStyle =
  "px-4 hover:text-[#b66ddf] cursor-pointer h-[52px] flex items-center font-semibold border-b-2 border-[#b66ddf] text-[#b66ddf]";

const Search = () => {
  const { keyword } = useSelector((state) => state.music);
  console.log(keyword);

  return (
    <div className="text-white">
      <div className="flex h-[50px] text-sm border-b border-gray-600 pl-[60px] pd-1 mb-7 items-center">
        <span className="text-[24px] font-semibold pr-6 border-r border-gray-600">
          Kết quả tìm kiếm
        </span>
        <div className="flex items-center">
          {searchMenu.map((item) => (
            <NavLink
              key={item.path}
              to={`${item.path}?q=${keyword.replace(" ", "+")}`}
              className={({ isActive }) =>
                isActive ? activeStyle : notActiveStyle
              }
            >
              {item.text}
            </NavLink>
          ))}
        </div>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Search;
