import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Route, Routes } from "react-router-dom";
import {
  Home,
  Login,
  Public,
  Personal,
  Album,
  WeekRank,
  Search,
  SearchSong,
  SearchAll,
  Singer,
  SearchPlaylist,
  ZingChart,
} from "./containers/public/";
import path from "./ultis/path";
import * as actisons from "./store/action";
import { useDispatch } from "react-redux";
import { apiGetChartHome } from "./apis";

function App() {
  const dispatch = useDispatch();
  const [weekChart, setWeekChart] = useState(null);
  const [currentWidth, setCurrentWidth] = useState(window.innerWidth);

  useEffect(() => {
    dispatch(actisons.getHome());
    const fetchChartData = async () => {
      const response = await apiGetChartHome();
      if (response.data.err === 0) setWeekChart(response.data.data.weekChart);
    };
    fetchChartData();
  }, []);

  const setWidth = (e) => {
    setCurrentWidth(e.target.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", setWidth);
    return () => {
      window.removeEventListener("resize", setWidth);
    };
  }, []);

  useEffect(() => {
    dispatch(actisons.setCurrentWidth(currentWidth));
  }, [currentWidth]);

  return (
    <div>
      <div className="">
        <Routes>
          <Route path={path.PUBLIC} element={<Public />}>
            <Route path={path.HOME} element={<Home />} />
            <Route path={path.LOGIN} element={<Login />} />
            <Route path={path.MY_MUSIC} element={<Personal />} />
            <Route path={path.ALBUM__TITLE__PID} element={<Album />} />
            <Route path={path.PLAYLIST__TITLE__PID} element={<Album />} />
            <Route
              path={path.WEEKRANK_TITLE_PID}
              element={
                <WeekRank weekChart={weekChart && Object.values(weekChart)} />
              }
            />
            <Route path={path.HOME__SINGER} element={<Singer />} />
            <Route path={path.ZING_CHART} element={<ZingChart />} />
            <Route path={path.SEARCH} element={<Search />}>
              <Route path={path.ALL} element={<SearchAll />} />
              <Route path={path.SONG} element={<SearchSong />} />
              <Route path={path.PLAYLIST_SEARCH} element={<SearchPlaylist />} />
            </Route>

            <Route path={path.STAR} element={<Home />} />
          </Route>
        </Routes>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
    </div>
  );
}

export default App;
