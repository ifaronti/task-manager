import { useEffect } from "react";
import { lightTheme, darkTheme } from "../SVGs";
import { useSelector } from "react-redux";

export default function ThemeSwitcher({ handleChange }) {
  const theme = useSelector((state) => state.theme.value);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const themeSwitcher = (
    <form className="md:fixed sm:relative md:bottom-[88px] gap-[23px] sm:pl-[57px] xl:pl-[60px] flex items-center content-center xl:w-[251px] sm:w-[235px] h-12 bg-tasks rounded-lg">
      {lightTheme}
      <div role="presentation" className="relative">
        <input
          type="checkbox"
          defaultChecked={theme === "dark" ? true : false}
          className="invisible absolute peer/checker"
          id="theme"
          onChange={handleChange}
          name="theme"
        />
        <label
          htmlFor="theme"
          className="w-[40px] cursor-pointer relative flex h-[20px] hover:bg-[#A8A4FF] after:transition-all after:duration-300 after:ease-linear after:top-[3px] after:absolute after:left-[1.5px] peer-checked/checker:after:left-6 after:w-[14px] after:h-[14px] after:rounded-full after:bg-[white] after:content-[''] bg-[#635FC7] rounded-3xl"
        ></label>
      </div>
      {darkTheme}
    </form>
  );

  return (
    <div
      role="presentation"
      className="w-full md:pb-[unset] sm:pb-[1.5rem] sm:pl-[13px] xl:pl-[23px]"
    >
      {themeSwitcher}
    </div>
  );
}
