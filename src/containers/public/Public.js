import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import "./public.css";
import {
  SidebarLeft,
  SidebarRight,
  Player,
  Header,
  Loading,
} from "../../components";
import { Scrollbars } from "react-custom-scrollbars-2";
import { useSelector } from "react-redux";

const Public = () => {
  const [isShowRightSidebar, setIsShowRightSidebar] = useState(true);
  const { isLoading } = useSelector((state) => state.app);

  return (
    <div className="w-full relative h-screen flex flex-col  player-public">
      <div className="overlay">
        <div className="w-full h-full flex flex-auto ">
          <div className="w-[240px] h-full flex-none ">
            <SidebarLeft />
          </div>
          <div className="flex-auto relative mb-[90px]">
            {isLoading && (
              <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-main-300 z-20">
                <Loading />
              </div>
            )}
            <div className="h-[70px] px-[60px] flex items-center bg-[rgba(23,15,35,0.8)]">
              <Header />
            </div>
            <Scrollbars
              autoHide
              style={{ width: "100%", height: "calc(100% - 90px)" }}
            >
              <Outlet />
            </Scrollbars>
          </div>
          {isShowRightSidebar && (
            <div className="w-[330px] hidden h-screen i1600:flex flex-none animate-slide-left">
              <SidebarRight />
            </div>
          )}
        </div>
        <div className="fixed bottom-0 z-50 left-0 right-0 h-[90px]">
          <Player setIsShowRightSidebar={setIsShowRightSidebar} />
        </div>
      </div>
    </div>
  );
};

export default Public;
