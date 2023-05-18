import React from "react";
import { Outlet } from "react-router-dom";

const Search = () => {
  return (
    <div className="text-white">
      <div className="flex h-[50px] text-sm border-b border-gray-600 pl-[60px] pd-1 mb-7 items-center">
        <span className="text-[24px] font-semibold pr-6 border-r border-gray-600">
          Kết quả tìm kiếm
        </span>
        <div className="flex items-center">
          <span className="px-4 hover:text-[#b66ddf] cursor-pointer font-semibold">
            TẤT CẢ
          </span>
          <span className="px-4 hover:text-[#b66ddf] cursor-pointer font-semibold">
            BÀI HÁT
          </span>
          <span className="px-4 hover:text-[#b66ddf] cursor-pointer font-semibold">
            PLAYLIST/ALBUM
          </span>
        </div>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Search;
