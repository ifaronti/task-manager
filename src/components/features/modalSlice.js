import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
    name:"modal",
    initialState:{value:false},
    reducers:{
        showModal:(state, action)=>{
            state.value = action.payload
        }
    }
})

export default modalSlice.reducer
export const {showModal} = modalSlice.actions