import { useSelector } from "react-redux"
import { lightLogo, darkLogo, mobileLogo } from "../SVGs";
import NavButtons from "./navButtons";

export default function NavBar(){
    const board = useSelector(state=>state.board.value)
    let theTheme = useSelector(state => state.theme.value)

    const theLogo = theTheme === 'dark'? darkLogo:lightLogo
    const navRight  = 
        <div role='presentation' className={`w-full md:h-[80px] xl:h-[97px] sm:h-16 flex items-center sm:px-[16px] md:px-8 content-between bg-nav`}>
            <div role="presentation" className={`bg-nav md:w-[229px] h-full sm:border-r-[0px] md:border-r-[1px] md:border-r-[solid] flex items-center xl:w-[268px] sm:w-fit border-r-[1px] ${theTheme === 'dark' ? 'md:border-r-[#3e3e3e] md:border-r-[1px] ':'md:border-r-[1px]  md:border-r-[#e1e1e1]'}`}>
                <span className="sm:hidden md:block">{theLogo}</span>
                <span className="sm:block md:hidden">{mobileLogo}</span>
            </div>
            <h1 className='text-texts sm:text-lg md:text-xl font-bold xl:text-2xl sm:pl-[12px] md:pl-[24px] mr-auto'>{board?.name?.length > 14? board?.name?.slice(0, 10)+'...': board?.name}</h1>
          
            <NavButtons/>
        </div>

    return(
        <div role='presentation' className="fixed z-[5] xl:w-[1440px] sm:w-full top-0 bg-nav sm:h-16 md:h-20 xl:h-[97px]">
            {navRight}
        </div>
    )
}