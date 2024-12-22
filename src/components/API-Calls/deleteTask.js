import axios from "axios";

export const taskDelete = async(body, taskId, token, settings)=>{
    try{
        if(!taskId || taskId ===undefined || taskId === null){
            return
        }
        else{
            let link = process.env.REACT_APP_API
            let {data} =  await axios.delete(`${link}/api/tasks/${taskId}/task?bid=${body.bid}&tid=${body.tid}&cid=${body.cid}`, {headers:{authorization:'Bearer '+token}})  
            let theData = data.data.filter(board=>board._id === body.bid);
            settings(theData)
        }
    }
    catch (err){
    }
}