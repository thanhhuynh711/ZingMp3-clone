import icons from "./icons";

const { MdLibraryMusic, FaChartBar, TbChartArcs, MdOutlineFeed } = icons;

export const sidebarMenu = [
  {
    path: "mymusic",
    text: "Cá nhân",
    icons: <MdLibraryMusic size={20} />,
  },
  {
    path: "",
    text: "Khám phá",
    end: true,
    icons: <TbChartArcs size={20} />,
  },
  {
    path: "zing-chart",
    text: "#zingchart",
    icons: <FaChartBar size={20} />,
  },
  {
    path: "follow",
    text: "Theo dõi",
    icons: <MdOutlineFeed size={20} />,
  },
];
