import React, { useEffect } from "react";
import { Slider, Section, NewRelease, ChartSection } from "../../components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Home = () => {
  const { friday, popular, chill, top100, albumHot, weekchart } = useSelector(
    (state) => state.app
  );

  return (
    <div className="overflow-y-auto w-full">
      <Slider />
      <NewRelease />
      {/* <ChartSection /> */}
      <div className="flex items-center px-[43px] w-full mt-12">
        {weekchart?.map((item) => (
          <Link
            to={item?.link?.split(".")[0]}
            key={item.link}
            className="flex-1 mx-4 overflow-hidden rounded-md"
          >
            <img
              src={item.cover}
              alt="cover"
              className="w-full hover:animate-scale-up-image animate-scale-down-image object-cover rounded-md"
            />
          </Link>
        ))}
      </div>
      <Section data={chill} />
      <Section data={friday} />
      <Section data={popular} />
      <Section data={top100} />
      <Section data={albumHot} />
    </div>
  );
};

export default Home;
