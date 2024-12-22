import { createSlice } from "@reduxjs/toolkit";

export const boardsInfo = createSlice({
    name:'info',
    initialState:{value:[]},
    reducers:{
        changeBoardsInfo:(state, action)=>{
            state.value = action.payload
        }
    }
})

export default boardsInfo.reducer
export const {changeBoardsInfo} = boardsInfo.actions