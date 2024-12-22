import { changeFrame } from "../features/currentModal";
import { showModal } from "../features/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import { doneOval, todoOval, doingOval } from "../SVGs";

export default function NewColumn(){
    const dispatch = useDispatch()
    let theme = useSelector(state=>state.theme.value)

    const addNewColum = ()=>{
        dispatch(showModal(true))
        dispatch(changeFrame('editBoard'))
    }
    
    return(
        <div role="presentation" className="pt-12">
            <div role="presentation" className={`w-[280px] flex-shrink-0 ${theme==='dark'? 'bg-[#2b2c37]/25':'bg-[#e9effa]/50'} relative group/add flex items-center justify-center h-screen rounded-lg`}>
                <button aria-label="new-column" onClick={addNewColum} className="text-[#828FA3] text-2xl group-hover/add:text-[#635FC7]">+ New Column</button>
                <div role="presentation" className="absolute left-3 flex flex-col gap-2 top-3">
                    <span className="text-sm text-[#828fa3] items-center gap-1 flex">{todoOval} no subtasks completed</span>
                    <span className="text-sm text-[#828fa3] items-center gap-1 flex">{doingOval} some subtasks completed</span>
                    <span className="text-sm text-[#828fa3] items-center gap-1 flex">{doneOval} all subtasks completed</span>
                </div>
            </div>
        </div>
    )
}