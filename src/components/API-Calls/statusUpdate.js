import axios from "axios";

export const statusUpdate = async(taskId, body, bid, tid, oldCID, newCID, token, settings)=>{
    try{
        if(!taskId || !body){}
        else{
            let link = process.env.REACT_APP_API
            let {data} = await axios.patch(`${link}/api/tasks/${taskId}/task/status?bid=${bid}&oldCID=${oldCID}&tid=${tid}&newCID=${newCID}`, body, {headers:{authorization:'Bearer '+token}})
            let theData = data.data.filter(board=>board._id === bid);
            settings(theData)
        }
    }
    catch (err){
    }
}