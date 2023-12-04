/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../../store/authSlice'
import { Button,ImageIcon,Logo,Input } from '../index'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { useForm } from "react-hook-form"

const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
      } = useForm()
      const [error,setError] =useState("")

      const login = async(data ) => {
        setError("")
        try {
          const session =   await authService.login(data)
          if(session){
            const userData = await authService.getCurrentUser()
            if(userData){
                dispatch(authLogin(userData))
                navigate('/add-links')
            }
          }
        } catch (error) {
            setError(error.message)
        }
      }
    
  return (
    <div className='flex flex-col h-screen justify-center bg-[#FAFAFA]'>
    <div>
      <div className=''>
        <img src='/images/logo-devlinks-large.svg' alt='' className='mx-auto'/>
      </div>
      <div className='bg-[#FFFFFF] w-1/3 mx-auto p-12 mt-8'>
        <h1 className='text-[32px] font-bold text-[#333]'>Login</h1>
        <p className='text-[16px] font-normal mt-3 mb-14 text-[#737373]'>Add your details below to get back into the app</p>
        <form onSubmit={handleSubmit(login)}>
          <div>
          <Input
          label="Email"
          placeholder = "enter Email"
          type="email"
          {...register("email", {
            required: true,
            validate:{
                matchPatern : (value) => /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g.test(value) || "Email address must be a valid Address"
            }
          })}
          />
          </div>
          <div className='my-7'>
          <Input
          label="Password"
          placeholder = "enter Password"
          type="password"
          {...register("password", {
            required: true,
            validate:{
                matchPatern : (value) => /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})/g.test(value) || "Ensure that password is 8 to 64 characters long and contains a mix of upper and lower case characters, one numeric and one special character"
            }
          })}
          />
          </div>
         
          <Button>Login</Button>
        </form>
        <p className='text-[16px] text-[#737373] text-center mt-7'>Don’t have an account?<Link className='cursor-pointer text-[#633CFF]' to='/signup'> Create account</Link> </p>
        {error && <p>{error}</p>}
      </div>
    </div>
   </div>
  )
}

export default Login