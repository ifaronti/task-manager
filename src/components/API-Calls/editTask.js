import axios from "axios";

export const taskEdit = async(body, taskId, bid, cid, tid, token, settings)=>{
    try{
        if(!taskId || taskId ==='undefine' || taskId === null || !bid || !cid){
            
        }
        else{
            let link = process.env.REACT_APP_API
            let {data} = await axios.patch(`${link}/api/tasks/${taskId}/task?bid=${bid}&cid=${cid}&tid=${tid}`, {...body}, {headers:{authorization:'Bearer '+token}})  
            let theData = data.data.filter(board=>board._id === bid);
            settings(theData)
        }
    }
    catch (err){

    }
}