import axios from "axios"

export const getAboard = async(settings, taskId, token)=>{
    try{
        if(!taskId || taskId === null || taskId === 'undefined'){
            return
        }
        else{
            let link = process.env.REACT_APP_API
            let {data} = await axios.get(`${link}/api/tasks/${taskId}/boards/name`, {headers:{authorization:'Bearer '+token}})
            await settings(data?.tasks)
        }
    }
    catch (error){
        //nathing a fi apen hia unless gbongbonclat network ah feeail
    }
}