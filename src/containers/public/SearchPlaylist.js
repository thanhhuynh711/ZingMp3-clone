import React, { useEffect, useState } from "react";
import { apiGetArtist } from "../../apis";
import { useSelector } from "react-redux";
import { SectionItem } from "../../components";

const SearchPlaylist = () => {
  const [playlist, setPlaylist] = useState([]);
  const { searchData } = useSelector((state) => state.music);
  useEffect(() => {
    const fetch = async () => {
      const res = await apiGetArtist(searchData?.top?.alias);
      if (res.data.err === 0) {
        setPlaylist(res?.data?.data?.sections[1]);
      }
    };
    fetch();
  }, []);
  return (
    <div className="w-full flex flex-col gap-8 px-[60px]">
      <h3>Playlist/Album</h3>
      <div className="flex flex-wrap items-start gap-10">
        {playlist &&
          playlist?.items?.length > 0 &&
          playlist?.items?.map((item) => (
            <SectionItem
              key={item.encodeId}
              link={item.link}
              thumbnail={item.thumbnail}
              title={item.title}
              artistsNames={item.artistsNames}
              sortDescription={item.sortDescription}
              padding
            />
          ))}
      </div>
    </div>
  );
};

export default SearchPlaylist;
