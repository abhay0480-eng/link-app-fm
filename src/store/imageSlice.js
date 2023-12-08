/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import { useEffect } from "react";

// const getAllLink = JSON.parse(localStorage.getItem('getAllLinks'));


const initialState ={
    profileImage : ""
}



const imageSlice = createSlice({
        name: "image",
        initialState,
        reducers:{
            getImage: (state,action) =>{
                state.profileImage = action.payload
                localStorage.setItem('profileImageLocal', JSON.stringify(action.payload));
            },
        }
})

export const {getImage} = imageSlice.actions

export default imageSlice.reducer;



