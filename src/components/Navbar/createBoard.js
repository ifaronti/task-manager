import { boardSVG } from "../SVGs";
import {useDispatch} from "react-redux";
import { showModal } from "../features/modalSlice";
import { changeFrame } from "../features/currentModal";

export default function CreateBoard({closeBar}){
    const dispatch = useDispatch()

    const createBoardClick = ()=>{
        dispatch(showModal(true))
        dispatch(changeFrame('addBoard'))
        closeBar()
    }

    const createBoard = 
                <button aria-label="create-board" onClick={createBoardClick} className='flex w-[90%] text-[.9375rem] hover:text-[#635fc7] hover:rounded-r-3xl hover:bg-buttons h-[48px] gap-[16px] pl-[32px] text-[#635fc7] active:text-[white] active:bg-[#635fc7] active:rounded-r-3xl items-center'>
                    {boardSVG}
                    <span className="text-[.9375rem]">  +Create New Board</span>
                </button>

    return(
        <>
        {createBoard}
        </>
    )
}