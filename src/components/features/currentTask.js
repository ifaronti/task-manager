import { createSlice } from "@reduxjs/toolkit";

export const currentTask = createSlice({
    name:'currentTask',
    initialState:{value:{}},
    reducers:{
        changeCurrent:(state, action)=>{
            state.value = action.payload
        }
    }
})

export default currentTask.reducer
export const {changeCurrent} = currentTask.actions