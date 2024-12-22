import axios from "axios";

export const checkboxChange = async(taskId, body, token, settings)=>{
    try{
        if(!taskId || !body){
        
        }
        else{
            let link = process.env.REACT_APP_API
            let {data} = await axios.patch(`${link}/api/tasks/${taskId}/task/subtask`, body, {headers:{authorization:'Bearer '+token}})
            let theData = data.data.filter(board=>board._id === body.bid);
            settings(theData)
        }
    }
    catch (err){
        console.log(err);
    }
}