import axios from "axios";

export const boardDelete = async(taskId, bid, settings, token)=>{
    try{
        if(!taskId || taskId ===undefined|| taskId === null){
            return
        }
        else{
            let link = process.env.REACT_APP_API
            const {data} = await axios.delete(`${link}/api/tasks/${taskId}/board?bid=${bid}`, {headers:{authorization:'Bearer '+token}})
            settings(data?.message)
        }
    }
    catch (err){

    }
}