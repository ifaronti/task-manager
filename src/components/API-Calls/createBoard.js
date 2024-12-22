import axios from "axios";

export const putBoard = async(body, taskId, settings, settings2, token)=>{
    let link = process.env.REACT_APP_API
    try{
        if(!taskId || taskId ===undefined || taskId === null){
            const {data} = await axios.put(`${link}/api/tasks`, {...body}, {headers:{authorization:'Bearer '+token}})
            settings2(data.data)
            localStorage.setItem('taskId', data?.data._id)
        }
        else{
            const {data} = await axios.patch(`${link}/api/tasks/${taskId}/board`, body, {headers:{authorization:'Bearer '+token}})
            settings(data?.theInfos)
        }
    }
    catch (err) {
        
    }
}