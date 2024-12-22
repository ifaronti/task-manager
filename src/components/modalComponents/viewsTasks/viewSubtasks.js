import { viewInput } from "../modalExports"
import { countComplete } from "../../tasks/taskExports"
import { useSelector } from "react-redux"

export default function ViewSub({handleSubChange}){
    let reduxTask = useSelector(state=>state.current.value)
   
   return reduxTask.subTasks?.length > 0 && <section>
        <h4 className='mb-[16px] text-texts'>subtasks
                ({countComplete(reduxTask?.subTasks).replace(/subtasks/, '')})
        </h4>
        <article className='flex flex-col gap-[8px]'>
            { reduxTask.subTasks?.map((sub, index)=>{
                return viewInput(sub, (e)=>handleSubChange(e, sub.id || sub._id), index)
            })
            }
        </article>
    </section>
}