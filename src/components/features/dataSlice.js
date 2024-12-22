import { createSlice } from "@reduxjs/toolkit";

export const dataSlice = createSlice({
    name:'Data',
    initialState:{value:[]},
    reducers:{
        changeData:(state, action)=>{
            state.value = action.payload
        }
    }
})

export default dataSlice.reducer
export const {changeData} = dataSlice.actions