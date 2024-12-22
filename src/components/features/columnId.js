import { createSlice } from "@reduxjs/toolkit";

export const columnId = createSlice({
    name:'columnId',
    initialState:{value:''},
    reducers:{
        changeCID:(state, action)=>{
            state.value = action.payload
        }
    }
})

export default columnId.reducer
export const {changeCID} = columnId.actions