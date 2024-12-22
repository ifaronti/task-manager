import { createSlice } from "@reduxjs/toolkit";

export const boardSlice = createSlice({
    name:"board",
    initialState:{value:{}},
    reducers:{
        changeBoard:(state, action)=>{
            state.value = action.payload
        }
    }
})

export default boardSlice.reducer
export const {changeBoard} = boardSlice.actions