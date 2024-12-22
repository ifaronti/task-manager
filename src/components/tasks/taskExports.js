
export const getTasks = (status, data)=>{
    let todo = []
    let doing = []
    let done = []
    data[0]?.columns.map(item => {
        // eslint-disable-next-line
       return item.tasks.map(task=>{
            if(task.subTasks.some(item => item.isCompleted) && task.subTasks.some(item=> !item.isCompleted)){
            doing.push(task)
            }
            if(!task.subTasks.some(item=> !item.isCompleted)){
                done.push(task)
            }
            if(!task.subTasks.some(item=> item.isCompleted)){
                todo.push(task)
            }
       })
    })
    
    if(status === 'Doing'){
        return doing
    }
    if(status === 'Todo'){
        return todo
    }
    if(status === 'Done'){
        return done
    }
}

export const countComplete = (data)=>{
    let isCount = 0
    let notCount = 0
    data?.map(sub=>{
        return sub.isCompleted ? isCount +=1: notCount +=1
    })
    return `${isCount} of ${isCount+notCount} subtasks`
}