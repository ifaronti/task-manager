import { createSlice } from "@reduxjs/toolkit";

export const currentModal = createSlice({
    name:'current',
    initialState:{value:''},
    reducers:{
        changeFrame:(state, action)=>{
            state.value = action.payload
        }
    }
})

export default currentModal.reducer
export const {changeFrame} = currentModal.actions