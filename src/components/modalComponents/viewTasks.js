import ClickOutside from './clickOutside'
import { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ViewSub from './viewsTasks/viewSubtasks'
import ViewHeader from './viewsTasks/viewHeader'
import Status from './statusSelect.js/statusSelect'
import { checkboxChange } from '../API-Calls/checkboxChanges'
import { changeCID } from '../features/columnId'
import { showModal } from '../features/modalSlice'
import { changeFrame } from '../features/currentModal'
import { changeCurrent } from '../features/currentTask'
import { changedStatus } from '../features/statusSwitched'
import { changeData } from '../features/dataSlice'

export default function ViewTask(){
    const [taskId, setTaskId] = useState('')
    const reduxTask = useSelector(state=>state.current.value)
    const reduxData = useSelector(state=>state.data.value)
    const [token, setToken] = useState('')
    const CID = useSelector(state=>state.columnId.value)
    const board = useSelector(state=>state.board.value)
    const theRef = useRef()
    const dispatch = useDispatch()
    ClickOutside(theRef, closeModal)
    const description = <p className='w-full text-texts'>{reduxTask?.description}</p>

    function closeModal(){
        dispatch(showModal(false))
        dispatch(changeFrame(''))
        dispatch(changedStatus({changed:false, name:''}))
        return
    }

    useEffect(()=>{
        setTaskId(localStorage.getItem('taskId'))
        reduxData[0]?.columns.map(col=>{
            return col.tasks?.map(task=>{
                return task._id === reduxTask._id? dispatch(changeCID(col._id)):''
            })
          })
          setToken(localStorage.getItem('token'))
          // eslint-disable-next-line
    }, [])

    const settings = (data)=>{
        dispatch(changeData(data))
    }

    const handleSubChange = async(e, id)=>{
        let {checked} = e.target
        let newSub= reduxTask.subTasks.map(sub=>{
            return sub.id === id || sub._id === id? {...sub, isCompleted:checked?true:false}:sub
        })
        await checkboxChange(taskId,{tid:reduxTask._id, cid:CID, bid:board._id, sid:id, value:checked},token, settings)
        dispatch(changeCurrent({...reduxTask, subTasks:newSub}))
    }
  
    return(
        <section ref={theRef} className='sm:w-[343px] absolute top-[18%]  z-[600] rounded-lg flex flex-col gap-[24px] bg-nav px-[32px] py-[32px] md:w-[480px]'>
            <ViewHeader/>
            {reduxTask?.description && description}
            <ViewSub handleSubChange={handleSubChange}/>
            <Status taskId={taskId}/>
        </section>
    )
} 