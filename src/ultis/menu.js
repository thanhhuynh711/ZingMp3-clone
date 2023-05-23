import icons from "./icons";

const { MdLibraryMusic, FaChartBar, TbChartArcs, MdOutlineFeed } = icons;

export const sidebarMenu = [
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
];

export const searchMenu = [
  {
    path: "tat-ca",
    text: "TẤT CẢ",
  },
  {
    path: "bai-hat",
    text: "BÀI HÁT",
  },
  {
    path: "playlist",
    text: "PLAYLIST/ALBUM",
  },
  // {
  //   path: "follow",
  //   text: "Theo dõi",
  //   icons: <MdOutlineFeed size={20} />,
  // },
];
