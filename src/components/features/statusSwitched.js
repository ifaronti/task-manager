import { createSlice } from "@reduxjs/toolkit";

export const status = createSlice({
    name:'status',
    initialState:{value:{}},
    reducers:{
        changedStatus:(state, action)=>{
            state.value = action.payload
        }
    }
})

export default status.reducer
export const {changedStatus} = status.actions