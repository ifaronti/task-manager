import { boardSVG } from "../SVGs"
import ThemeSwitcher from "./themeSwitcher"
import { useDispatch, useSelector } from "react-redux"
import { changeBoard } from "../features/boardSlice"
import CreateBoard from "./createBoard"

export default function BoardsNav({handleChange, closeBar}){
    const board = useSelector(state=>state.board.value)
    const boardsInfo = useSelector(state=>state.boardsInfo.value)
    const dispatch = useDispatch()

    const numberOfBoards = <p className='mb-[19px] mt-[15px] text-xs text-[#828fa3] pl-[32px]'>ALL BOARDS ({boardsInfo?.length})</p>

    const changeboard = (id, boardName)=>{
        dispatch(changeBoard({_id:id, name:boardName}))
        closeBar()
    }

    const boardBtn = (id, boardName, index)=>{
        return <button aria-label={boardName} onClick={()=>changeboard(id, boardName)} key={index} 
                    className={`flex text-[.9375rem] gap-[16px] ${board?._id===id?"text-[white] bg-[#635fc7] hover:bg-[#635fc7] rounded-r-3xl":'hover:bg-buttons hover:text-[#635FC7] '} hover:rounded-r-3xl h-[48px] w-[90%] pl-[32px] text-[#828fa3] items-center`}>{boardSVG} {boardName}</button>
    }

    const mainBoards = boardsInfo?.map((item, index)=>boardBtn(item._id, item.name, index+1))

    return (
        <div role='presentation' className='flex relative w-full px-0 flex-col'>
            {numberOfBoards}
            {mainBoards}
            <CreateBoard closeBar={closeBar}/>
            <ThemeSwitcher handleChange={handleChange}/>
        </div>
    )
}