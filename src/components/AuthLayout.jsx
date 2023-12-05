/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'


export default function AuthLayout ({children,authentication = true}) {

    const navigate = useNavigate()
    const [loader, setLoader]  = useState("")
    const authStatus = useSelector(state => state.auth.status)
        console.log("authStatus",authStatus);
    useEffect(()=> {
        if(authentication && authStatus !== authentication){
            navigate('/')
        }else if(!authentication && authStatus !== authentication){
            navigate('/add-links')
        }

        setLoader(false)

    },[authStatus, navigate, authentication])

  return loader? <h1>loading...</h1> :<>{children}</>

}