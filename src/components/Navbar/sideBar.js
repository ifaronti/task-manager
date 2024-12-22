import BoardsNav from "./BoardsNav";
import { closeBar, showSide, chevyDown } from "../SVGs";
import { useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import { changeTheme } from "../features/themeSlice";
import { QueryMedia } from "./searchExport";
import { useMediaQuery } from "@mui/material";

export default function SideBar() {
  const [showBar, setShowBar] = useState(true);
  const dispatch = useDispatch();
  const theTheme = useSelector((state) => state.theme.value);
  const matchesSM = useMediaQuery("(max-width:768px)");
  const matchesMD = useMediaQuery("(max-width:1119px)");
  const matchesXL = useMediaQuery("(min-width:1120px)");
  const media = QueryMedia(matchesSM, matchesMD, matchesXL);

  useEffect(() => {
    if (media === "mobile") {
      setShowBar(false);
    }
  }, [media]);

  const mobileCloseBar = () => {
    return media === "mobile" ? setShowBar(false) : "";
  };

  const handleChange = (e) => {
    let { checked } = e.target;
    if (checked) {
      document.documentElement.setAttribute("data-theme", "dark");
      dispatch(changeTheme("dark"));
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      dispatch(changeTheme("light"));
    }
  };
  const barSvg = showBar ? (
    closeBar
  ) : (
    <span className="w-fit -mx-4">{showSide}</span>
  );

  return (
    <div
      role="presentation"
      className={`relative flex-shrink-0 xl:top-24 md:top-20 ${
        showBar ? "md:w-[300px] sm:w-0" : "w-[unset]"
      }`}
    >
      {showBar && (
        <div
          role="presentation"
          className={`sm:min-h-[322px] sm:rounded-lg md:rounded-none md:h-screen fixed flex-shrink-0 sm:w-[264px] sm:left-10 md:top-[unset] md:left-[unset] sm:top-20 sm:z-[5] md:z-[unset] md:w-[261px] xl:w-[300px] md:block bg-nav sm:border-r-[0px] md:border-r-[1px] md:border-r-[solid] ${theTheme === "dark" ? "md:border-r-[#3e3e3e] md:border-r-[1px] ": "md:border-r-[1px]  md:border-r-[#e1e1e1]"
       }
    `}
        >
          <BoardsNav handleChange={handleChange} closeBar={mobileCloseBar} />
        </div>
      )}
      <button
        aria-label="toggle-sidebar"
        className={`fixed transition-all duration-300 gap-3 ease-linear z-[6] flex sm:w-2 text-[#828fA3] md:hover:rounded-r-3xl sm:h-2 md:h-[48px] md:hover:text-[#635fc7] ${!showBar ? "md:bg-[#635FC7] md:hover:w-[56px] md:hover:bg-[#A8A4FF] text-[.9375rem] md:w-[56px] md:h-[48px] rounded-r-3xl" : "md:bg-none md:w-[276px] md:hover:bg-buttons"} pl-[32px] items-center md:left-[unset] sm:left-[10rem] md:top-[unset] sm:top-[1.9rem] md:bottom-6`}
        onClick={() => setShowBar((prev) => !prev)}
      >
        <span className="md:inline-flex sm:hidden">{barSvg}</span>

        {showBar && <span className="md:inline-flex sm:hidden items-center">Hide Sidebar</span>}

        <span className={`md:hidden relative sm:block`}>
          {chevyDown}
        </span>
      </button>
      {showBar && (
        <div className="w-full z-[1] top-[65px] h-full fixed md:hidden bg-[black] opacity-45"></div>
      )}
    </div>
  );
}
