import { useState } from "react";
import CRUDMenu from "../../tasks/statusGroups/menu";
import { ellipsis } from "../../SVGs";
import { useSelector } from "react-redux";

export default function ViewHeader(){
    let reduxTask = useSelector(state=>state.current.value)
    const [showMiniMenu, setShowMiniMenu] = useState(false)

    return(
        <header className='flex items-center'>
            <h3 className='mr-auto w-[80.625%] relative text-texts flex content-between items-center'>
                {reduxTask?.title}
            </h3>
            <button aria-label="toggle menu" className='flex flex-col gap-[21px]' 
                    onClick={()=>setShowMiniMenu(prev=>!prev)}
            >
                    {ellipsis}
            </button>
            {
                showMiniMenu 
                && 
                <div role="presentation" className="absolute sm:right-1 top-16 xl:-right-10">
                    <CRUDMenu closeMenu={()=>setShowMiniMenu(false)}/>
                </div>
            }
        </header>
    )
}