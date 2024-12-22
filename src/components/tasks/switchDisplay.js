import { useDispatch } from "react-redux";
import { changeDisplay } from "../features/displaySlice";

export default function SwitchDisplay(){
    const dispatch = useDispatch()
    
    return(
        <div role="presentation" className="absolute flex h-4 gap-3 right-2 md:top-[5.5rem] sm:top-[5.5rem] xl:top-[6rem]">
            
            <h2 className="text-[#635FC7]">Show By:</h2>

            <button aria-label="Column-view" className="hover:text-[#67E2AE] text-[#49C4E5]" onClick={()=>dispatch(changeDisplay('status'))}>Column</button>
            |
            <button aria-label="progress-view" className="hover:text-[#67E2AE] text-[#49C4E5]" onClick={() => dispatch(changeDisplay('progress'))}>Progress</button>
        </div>
    )
}