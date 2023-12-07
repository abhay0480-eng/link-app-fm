/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Header } from './components'
import { useSelector } from 'react-redux'

const Layout = () => {

  const authStatus = useSelector(state => state.auth.status)
  const location = useLocation();

  console.log(location.pathname);
  const status = location.pathname!=="/preview"
  return (
    <>
   {(authStatus&& status) && <Header/>}
    <Outlet/> 
    </>
  )
}

export default Layout