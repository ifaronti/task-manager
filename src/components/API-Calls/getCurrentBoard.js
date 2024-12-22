import axios from "axios";

export const getCurrentBoard = async(boardId, settings, taskId, token)=>{
    try{
        if(!boardId || !taskId){
            return
        }
        let link = process.env.REACT_APP_API
        let {data} = await axios.get(`${link}/api/tasks?id=${taskId}&bid=${boardId}`, {headers:{authorization:'Bearer '+token}})
        settings(data?.task)
    }
    catch (error){
    }
}