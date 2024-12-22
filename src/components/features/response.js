import { createSlice } from "@reduxjs/toolkit";

export const APIres = createSlice({
    name:'response',
    initialState:{value:''},
    reducers:{
        changeResponse:(state, action)=>{
            state.value = action.payload
        }
    }
})

export default APIres.reducer
export const {changeResponse} = APIres.actions