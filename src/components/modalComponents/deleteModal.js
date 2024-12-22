import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { changeFrame } from "../features/currentModal"
import { showModal } from "../features/modalSlice"
import { boardDelete } from "../API-Calls/deleteBoard"
import { taskDelete } from "../API-Calls/deleteTask"
import { changeBoard } from "../features/boardSlice"
import { changeBoardsInfo } from "../features/boardsInfo"
import { changeData } from "../features/dataSlice"
import {changeCurrent} from '../features/currentTask'

export default function DeleteThings(){
    const [taskId, setTaskId] = useState('')
    const [token, setToken] = useState('')
    let frame = useSelector(state=>state.frame.value)
    let board = useSelector(state=>state.board.value)
    let reduxTask = useSelector(state=>state.current.value)
    let CID = useSelector(state=>state.columnId.value)

    const dispatch = useDispatch()

    const settings = (data)=>{
        if(!data.boards[0]){
            dispatch(changeData([]))
            dispatch(changeBoard({name:'', _id:''}))
        }
        dispatch(changeBoardsInfo(data.boards))
        dispatch(changeBoard({name:data.boards[0].name, _id:data.boards[0]._id}))
    }

    const taskDelSettings = (data)=>{
        dispatch(changeData(data))
    }

    useEffect(()=>{
        setTaskId(localStorage.getItem('taskId'))
        setToken(localStorage.getItem('token'))
    },[])

    const modalDelete = async()=>{
        if(!taskId){
            return
        }
        if(frame === 'deleteBoard'){
            await boardDelete(taskId, board._id, settings, token)
        }
        else{
            if(frame === 'deleteTask'){
                await taskDelete({bid:board._id, cid:CID, tid:reduxTask._id}, taskId, token, taskDelSettings)
                dispatch(changeCurrent({}))
            }
        }
        dispatch(showModal(false))
        dispatch(changeFrame(''))
    }

    const cancelDel = ()=>{
            dispatch(showModal(false))
            dispatch(changeFrame(''))
    }

    const delboardText = `Are you sure you want to delete the '${board.name}' board? This action will remove all columns and tasks and cannot be reversed.`
    const boardHead = 'Delete this board?'
    const delTaskText = `Are you sure you want to delete the '${reduxTask.title}' task and its subtasks? This action cannot be reversed.`
    const taskHead = 'Delete this task'

    let body = frame === 'deleteBoard'? delboardText:delTaskText
    let head = frame === 'deleteBoard'? boardHead:taskHead

    let delFrame = <section className="md:px-8 flex relative rounded-lg flex-col gap-6 sm:px-6 sm:py-6 bg-nav md:py-8 md:w-[480px] sm:h-[284px] md:h-[229px] sm:w-[343px]">
                <h2 className="text-[red] text-lg">{head}</h2>
                <p className="text-[.8125rem] text-[#828FA3] leading-[1.4375rem]">{body}</p>
                <div role="presentation" className="flex sm:flex-col gap-4 md:flex-row">
                    <button aria-label="delete" onClick={modalDelete} className="bg-[red] hover:bg-[#FF9898] md:w-[200px] text-[white] rounded-3xl sm:w-[295px] h-10">Delete</button>
                    <button aria-label="cancel" onClick={cancelDel} className="bg-[#635fc7]/10 hover:bg-buttons md:w-[200px] text-[#635fc7] rounded-3xl sm:w-[295px] h-10">Cancel</button>
                </div>
            </section>

    return <div role="presentation" className="fixed z-[1500] h-full justify-center w-full items-center flex top-[0] left-0">
        {delFrame}
    </div>
}