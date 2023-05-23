import React from "react";
import icons from "../ultis/icons";
import Search from "./Search";

const { HiOutlineArrowRight, HiOutlineArrowLeft } = icons;

const Header = () => {
  return (
    <div className="flex justify-between w-full">
      <div className="flex items-center gap-6 w-full">
        <div className="flex gap-6">
          <span>
            <HiOutlineArrowLeft size={20} color="#fff" />
          </span>
          <span>
            <HiOutlineArrowRight size={20} color="#fff" />
          </span>
        </div>
        <div className="w-1/2">
          <Search />
        </div>
      </div>
      {/* <div className="text-white">Đăng nhập</div> */}
    </div>
  );
};

export default Header;
