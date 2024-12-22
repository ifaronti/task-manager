import axios from "axios";

export const add2Task = async(body, taskId, bid, cid, token, settings)=>{
    try{
        if(!taskId || taskId ==='undefine' || taskId === null || !bid || !cid){
            return
        }
        else{
            let link = process.env.REACT_APP_API
            let {data} = await axios.put(`${link}/api/tasks/${taskId}/task?bid=${bid}&cid=${cid}`, {...body}, {headers:{authorization:'Bearer '+token}})  
            let theData = data.data.filter(board=>board._id === bid);
            settings(theData)
        }
    }
    catch (err){

    }
}