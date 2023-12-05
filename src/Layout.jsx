/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from './components'
import { useSelector } from 'react-redux'

const Layout = () => {

  const authStatus = useSelector(state => state.auth.status)

  return (
    <>
   {authStatus && <Header/>}
    <Outlet/> 
    </>
  )
}

export default Layout