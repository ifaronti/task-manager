import { cross } from "../SVGs"

export const viewInput = (data, handleChange, index)=>{
    return (
        <form key={index+1} className={`w-full group/check px-3 relative ${data.isCompleted? 'py-3':'py-4 hover:bg-[#635FC7]/25'} rounded-lg items-center flex gap-[16px] bg-viewInput`}>
            <input id={index} defaultChecked={data.isCompleted? true:false} name={data.title}
                type="checkbox"  onChange={handleChange} className="peer/checker border-[1px] bg-checkbox checked:accent-[#635FC7]"
            />
            <label htmlFor={index} className="peer-checked/checker:line-through w-full cursor-pointer peer-checked/checker:opacity-50 group-hover/check:text-texts text-texts">
                {data.title}
            </label>
        </form>
    )
}

export const descriptionArea = (value, handleChange)=>{
    return(
        <textarea 
            name="description"
            id="scrollbar"
            value={value} 
            onChange={handleChange}
            className={`w-full px-4 cursor-pointer outline-none py-1 resize-none rounded-lg min-h-[112px] hover:border-[#635fc7] border-[1px] border-[#828fa3]/25`}
        >
        </textarea>
    )
}

export const theSubtasks = (data, handleSubChange, pullSubCols)=>{
   return( 
            <div role="presentation" className="w-full flex flex-col gap-2">
                <p className="text-[#828fa3] text-xs">Subtasks</p>
                {data?.map((sub, index)=>{
                
                return  <div role="presentation" key={index} className="flex gap-4 items-center">
                            <form className="relative items-center flex w-full h-fit">
                                <input 
                                    autoFocus 
                                    id={sub.title.replace(' ', '')}
                                    type="text" value={(sub.title)} 
                                    name={`abc${index+23}`} pattern="(.|\s)*\S(.|\s)*" 
                                    onChange={(e)=>handleSubChange(e, (sub._id||sub.id))}
                                    className={`w-full peer/task px-4 outline-none cursor-pointer py-2 resize-none rounded-lg h-10 invalid:border-[red] hover:border-[#635fc7] border-[1px] border-[#828fa3]/25`}
                                />
                                <label htmlFor={sub.title.replace(' ', '')} className="hidden absolute flex-shrink-0 right-3 peer-invalid/task:block peer-invalid/task:text-[red]">Can't be empty</label>
                            </form>
                            <button aria-label="delete subtask" onClick={()=>pullSubCols(sub._id||sub.id)}>{cross}</button>
                            
                        </div>
                })}
            </div>
        )
}

export const taskTitle = (task, handleChange)=>{
   return   <div role="presentation" className="w-full">
                <p className="mb-2 text-[#828fa3] text-xs">Title</p>
                <form className="relative items-center flex w-full h-fit" >
                    <input 
                        autoFocus 
                        id={task.title.replace(' ', '')}
                        value={task.title} pattern="(.|\s)*\S(.|\s)*"  
                        onChange={handleChange} name="title"
                        className={`w-full px-4 peer/task outline-none cursor-pointer py-2 resize-none rounded-lg h-10 invalid:border-[red] hover:border-[#635fc7] border-[1px] border-[#828fa3]/25`}
                    />
                    <label htmlFor={task.title.replace(' ', '')} className="hidden absolute flex-shrink-0 right-3 peer-invalid/task:block peer-invalid/task:text-[red] ">Can't be empty</label>
                </form>
            </div>
}

export const taskDescription = (task, handleChange)=>{
    return(
        <div role="presentation" className="w-full">
            <p className="mb-2 text-[#828fa3] text-xs">Description</p>
            {descriptionArea(task.description, handleChange)}
        </div>
    )
}

export const BoardName = (data, handleChange)=>{
    return   <div role="presentation" className="w-full">
                 <p className="mb-2 text-[#828fa3] text-xs">Board Name</p>
                 <form className="flex relative w-full h-fit items-center">
                    <input value={data.name} id={data.name} pattern="(.|\s)*\S(.|\s)*"  onChange={handleChange} name="name"
                            className={`w-full flex-shrink-0 peer/col px-4 outline-none cursor-pointer py-2 resize-none rounded-lg h-10 invalid:border-[red] hover:border-[#635fc7] border-[1px] border-[#828fa3]/25`}
                    
                    />
                    <label className="hidden absolute flex-shrink-0 right-3 peer-invalid/col:block peer-invalid/col:text-[red] " htmlFor={data.name}>Can't be empty</label>
                 </form>
             </div>
}

export const theColumns = (data, handleSubChange, pullSubCols)=>{
    return( 
             <div className="w-full flex flex-col gap-2">
                 <p className="text-[#828fa3] text-xs">Columns</p>
                 {data?.map((sub, index)=>{
                 
                 return  <div role="presentation" key={index} className="flex relative gap-4 items-center">
                             <form className="relative items-center flex w-full h-fit" >
                                <input 
                                    autoFocus
                                    id={data.name}
                                    type="text" value={(sub.name)} 
                                    name={`abc${index+23}`} pattern="(.|\s)*\S(.|\s)*" 
                                    onChange={(e)=>handleSubChange(e, (sub._id||sub.id))}
                                    className={`w-full peer/col flex-shrink-0 px-4 outline-none cursor-pointer py-2 resize-none rounded-lg h-10 invalid:border-[red] hover:border-[#635fc7] border-[1px] border-[#828fa3]/25`}
                                />
                                <label htmlFor={data.name} className="hidden absolute flex-shrink-0 right-3 peer-invalid/col:block peer-invalid/col:text-[red] ">Can't be empty</label>
                             </form>
                             <button aria-label="delete column" className="relative" onClick={()=>pullSubCols(sub._id||sub.id)}>{cross}</button>
                         </div>
                 })}
             </div>
         )
 }