import { createSlice } from "@reduxjs/toolkit";


const items = JSON.parse(localStorage.getItem('cookieFallback'));
console.log(items);

const initialState ={
    status:items.a_session_65678d16e27081909244?true:false,
    userData: null
}


const authSlice = createSlice({
        name: "auth",
        initialState,
        reducers:{
            login: (state,action) =>{
                state.status = true
                state.userData = action.payload
            },

            logout:(state) => {
                state.status = false
                state.userData = null
            }
        }
})

export const {login,logout} = authSlice.actions

export default authSlice.reducer;