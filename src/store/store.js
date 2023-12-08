import { configureStore } from '@reduxjs/toolkit'
import authSlice from './authSlice'
import loaderSlice from './loader'
import linkSlice from './linkSlice'
import profileSlice from './profileSlice'
import imageSlice from './imageSlice'

 const store = configureStore({  
    reducer: {
        auth: authSlice,
        loader: loaderSlice,
        link: linkSlice,
        profile: profileSlice,
        image: imageSlice
    }
 })

 export default store

