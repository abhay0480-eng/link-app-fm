/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import { useEffect } from "react";

const getProfileDetail = JSON.parse(localStorage.getItem('getProfileDetails'));

const initialState ={
    profileDetails:getProfileDetail?getProfileDetail:{},
}

const profileSlice = createSlice({
        name: "profile",
        initialState,
        reducers:{
            getProfileDetails: (state,action) =>{
                state.profileDetails = action.payload
                localStorage.setItem('getProfileDetails', JSON.stringify(action.payload));
            },
        }
})

export const {getProfileDetails} = profileSlice.actions

export default profileSlice.reducer;



