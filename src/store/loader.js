/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import { useEffect } from "react";


// const items = JSON.parse(localStorage.getItem('cookieFallback'));
// const userDatalocal = JSON.parse(localStorage.getItem('userData'));
const initialState ={
    status:false
}



const loaderSlice = createSlice({
        name: "loader",
        initialState,
        reducers:{
            startLoader: (state) =>{
                state.status = true
            },
            stopLoader: (state) =>{
                state.status = false
            },
        }
})

export const {startLoader,stopLoader} = loaderSlice.actions

export default loaderSlice.reducer;



