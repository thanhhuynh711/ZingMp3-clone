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
        className="w-full h-[70px] py-[15px] px-[25px] flex justify-start items-center cursor-pointer"
      >
        <img src={logo} alt="logo" className="w-[120px] h-10" />
      </div>
      <div className="flex flex-col">
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
            <span>{item.text}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default SidebarLeft;
