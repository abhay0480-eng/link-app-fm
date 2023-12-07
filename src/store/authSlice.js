/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import { useEffect } from "react";


const items = JSON.parse(localStorage.getItem('cookieFallback'));
const userDatalocal = JSON.parse(localStorage.getItem('userData'));
const initialState ={
    status:items?true:false,
    userData:userDatalocal?userDatalocal: null
}

const authSlice = createSlice({
        name: "auth",
        initialState,
        reducers:{
            login: (state,action) =>{
                state.status = true
                state.userData = action.payload
                localStorage.setItem('userData', JSON.stringify(action.payload));
            },

            logout:(state) => {
                state.status = false
                state.userData = null
                localStorage.removeItem('userData');
                localStorage.removeItem('cookieFallback');
                localStorage.removeItem('getAllLinks');
                localStorage.removeItem('getProfileDetails');
            }
        }
})

export const {login,logout} = authSlice.actions

export default authSlice.reducer;



