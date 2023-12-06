/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import { useEffect } from "react";

const getAllLink = JSON.parse(localStorage.getItem('getAllLinks'));

const initialState ={
    getAllLinks:getAllLink?getAllLink:[],
}



const linkSlice = createSlice({
        name: "link",
        initialState,
        reducers:{
            allLinks: (state,action) =>{
                state.getAllLinks = action.payload
                localStorage.setItem('getAllLinks', JSON.stringify(action.payload));
            },
        }
})

export const {allLinks} = linkSlice.actions

export default linkSlice.reducer;



