import { createSlice } from "@reduxjs/toolkit";

export const themeSlice = createSlice({
    name:'theme',
    initialState:{value:'light'},
    reducers:{
        changeTheme:(state, action)=>{
            state.value = action.payload
        }
    }
})

export default themeSlice.reducer
export const {changeTheme} = themeSlice.actions