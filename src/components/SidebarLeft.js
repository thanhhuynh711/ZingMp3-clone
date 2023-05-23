import React from "react";
import logo from "../assets/logo-dark.svg";
import { sidebarMenu } from "../ultis/menu";
import { NavLink, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import path from "../ultis/path";

const notActiveStyle =
  "flex items-center gap-2 py-2 px-[25px] text-[#fff] text-[13px] font-semibold";
const activeStyle =
  "flex items-center gap-2 py-2 text-[#b66ddf] px-[25px] text-[13px] font-semibold";

const SidebarLeft = () => {
  const navigate = useNavigate();
  return (
    <div
      className="flex h-full flex-col bg-[rgba(23,15,35,0.8)] mb-[90px]
    "
    >
      <div
        onClick={() => navigate(path.HOME)}
        className="w-full h-[70px] min-[1024px]:py-[15px] min-[1024px]:px-[25px] flex justify-start items-center cursor-pointer"
      >
        <img
          src={logo}
          alt="logo"
          className="w-[120px] h-10 min-[1024px]:block hidden"
        />
        <img
          src="https://zjs.zmdcdn.me/zmp3-desktop/releases/v1.9.33/static/media/icon_zing_mp3_60.f6b51045.svg"
          alt="logo"
          className="w-[45px] h-[45px] m-auto min-[1024px]:hidden "
        />
      </div>
      <div className="flex flex-col mt-5 mb-8">
        {sidebarMenu.map((item) => (
          <NavLink
            to={item.path}
            key={item.path}
            end={item.end}
            className={({ isActive }) =>
              isActive ? activeStyle : notActiveStyle
            }
          >
            {item.icons}
            <span className="min-[1024px]:inline hidden">{item.text}</span>
          </NavLink>
        ))}
      </div>
      <div className="bg-premium flex flex-col gap-4 text-white">
        <span className="text-xs font-semibold">
          Nghe nhạc không quảng cáo cùng kho nhạc PREMIUM
        </span>
        <button className="bg-yellow-500 rounded-l-full text-[14px] font-bold text-black py-1 px-2 rounded-r-full">
          NÂNG CẤP TÀI KHOẢN
        </button>
      </div>
    </div>
  );
};

export default SidebarLeft;
