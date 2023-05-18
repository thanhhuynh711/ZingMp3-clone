import React from "react";
import { useSelector } from "react-redux";
import { handleNumber } from "../../ultis/fn";
import { SongItem, List, SectionItem, Artist } from "../../components";

const SearchAll = () => {
  const { searchData } = useSelector((state) => state.music);
  console.log(searchData);

  return (
    <div className="flex flex-col w-full text-white px-[60px] gap-[60px]">
      <div className="flex flex-col">
        <h3 className="text-lg font-bold mb-5">Nổi bật</h3>
        <div className="flex gap-6">
          {searchData?.top && (
            <div className="p-[10px] flex-1 cursor-pointer bg-[rgba(23,15,35,0.8)] rounded-md flex gap-6 items-center">
              <img
                src={searchData.top.thumbnail}
                className={`w-[84px] h-[84px] object-cover ${
                  searchData.top.objectType === "artist" && "rounded-full"
                }`}
                alt="avatar"
              />
              <div className="flex flex-col text-xs">
                <span className="mb-[6px]">
                  {searchData.top.objectType === "artist" ? "Nghệ sĩ" : ""}
                </span>
                <span className="text-sm font-semibold">
                  {searchData.top.title || searchData.top.name}
                </span>
                {searchData.top.objectType === "artist" && (
                  <span>
                    {handleNumber(searchData?.artists[0]?.totalFollow) +
                      " " +
                      "quan tâm"}
                  </span>
                )}
              </div>
            </div>
          )}
          {searchData?.songs
            ?.filter((item, index) =>
              [...Array(2).keys()].some((i) => i === index)
            )
            ?.map((item) => (
              <div key={item.encodeId} className="flex-1 cursor-pointer">
                <SongItem
                  thumbnail={item?.thumbnail}
                  sid={item?.encodeId}
                  title={item?.title}
                  artistsNames={item?.artistsNames}
                  size="w-[84px] h-[84px]"
                  style="bg-[rgba(23,15,35,0.8)]"
                />
              </div>
            ))}
        </div>
      </div>
      <div className="flex flex-col">
        <h3 className="text-lg font-bold mb-5">Bài hát</h3>
        <div className="flex justify-between flex-wrap w-full">
          {searchData &&
            searchData?.songs?.length > 0 &&
            searchData?.songs
              ?.filter((item, index) => index <= 7)
              .map((item, index) => (
                <div
                  key={item.encodeId}
                  className={`flex-auto w-[45%] ${
                    index % 2 !== 0 ? "pl-4" : "pr-4"
                  }`}
                >
                  <List songData={item} isHideAlbum />
                </div>
              ))}
        </div>
      </div>
      <div className="flex flex-col">
        <h3 className="text-lg font-bold mb-5">Playlist/Album</h3>
        <div className="flex items-start justify-between gap-[28px]">
          {searchData?.playlists
            ?.filter((i, index) => index <= 4)
            .map((item) => (
              <SectionItem
                key={item.encodeId}
                link={item.link}
                thumbnail={item.thumbnail}
                title={item.title}
                artistsNames={item.artistsNames}
                sortDescription={item.sortDescription}
                NoSortDescription
              />
            ))}
        </div>
      </div>
      <div className="flex flex-col">
        <h3 className="text-lg font-bold mb-5">Nghệ sĩ</h3>
        <div className="flex items-start justify-between gap-[28px]">
          {searchData?.artists
            ?.filter((i, index) => index <= 4)
            .map((item) => (
              <Artist
                key={item.id}
                title={item.name}
                image={item.thumbnailM}
                follower={item.totalFollow}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default SearchAll;
