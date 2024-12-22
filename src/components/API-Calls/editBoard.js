import axios from "axios";

export const patchBoard = async(body, taskId, bid, token, settings)=>{
    try{
        if(!taskId || taskId ==='undefine'|| taskId === null){
            return
        }
        else{
           let link = process.env.REACT_APP_API
           const {data} = await axios.patch(`${link}/api/tasks/${taskId}/?bid=${bid}`, {...body}, {headers:{authorization:'Bearer '+token}})
           let theData = data.message.filter(board => board.name === body.name)
           settings(data.message, theData)
        }
    }
    catch (err){
    }
}