import { configureStore } from '@reduxjs/toolkit'
import authSlice from './authSlice'
import loaderSlice from './loader'

 const store = configureStore({  
    reducer: {
        auth: authSlice,
        loader: loaderSlice
    }
 })

 export default store

