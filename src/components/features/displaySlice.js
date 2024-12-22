import { createSlice } from "@reduxjs/toolkit";

export const display = createSlice({
    name:'display',
    initialState:{value:'status'},
    reducers:{
        changeDisplay:(state, action)=>{
            state.value = action.payload
        }
    }
})

export default display.reducer
export const {changeDisplay} = display.actions