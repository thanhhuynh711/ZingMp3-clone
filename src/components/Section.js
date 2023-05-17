import React, { memo, useState } from "react";
import { SectionItem } from "./";

const Section = ({ data }) => {
  return (
    <>
      <div className="text-white mt-12 px-[60px] flex flex-col gap-5">
        <div className=" flex items-center justify-between">
          <h3 className="text-[20px] font-bold">{data?.title}</h3>
          <span className="text-xs">TẤT CẢ</span>
        </div>
        <div className="flex items-start justify-between gap-[28px]">
          {data &&
            data?.items?.length > 0 &&
            data?.items
              .filter((item, index) => index <= 4)
              ?.map((item) => (
                <SectionItem
                  key={item.encodeId}
                  data={data}
                  link={item.link}
                  thumbnail={item.thumbnail}
                  title={item.title}
                  artistsNames={item.artistsNames}
                  sortDescription={item.sortDescription}
                />
              ))}
        </div>
      </div>
    </>
  );
};

export default memo(Section);
