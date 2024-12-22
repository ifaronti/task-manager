import axios from "axios";

export const registerUser = async(body)=>{
    try{
        const link = process.env.REACT_APP_API
         await axios.post(`${link}/api/register`, body)
    }
    catch (err){
    }
}