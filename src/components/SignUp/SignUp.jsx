/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../../store/authSlice'
import { Button,ImageIcon,Logo,Input } from '../index'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { useForm } from "react-hook-form"
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const SignUp = () => {
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const [open, setOpen] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm()
      const [error,setError] =useState("")

      const create = async(data ) => {
        setError("")
        try {
          setOpen(true)
          const userData = await authService.createAccount(data)
          if(userData){
            setOpenSnack(true)

            setTimeout(() => {
              navigate('/');
            }, 1000);
            
          }
          
        } catch (error) {
            setError(error.message)
        }finally{
          setOpen(false)
        }
      }

      const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };
    
  return (
    <div className='flex flex-col h-screen justify-center bg-[#FAFAFA]'>
       <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Account created Successfully
        </Alert>
      </Snackbar>

    <div>
      <div className=''>
        <img src='/images/logo-devlinks-large.svg' alt='' className='mx-auto'/>
      </div>
      <div className='bg-[#FFFFFF] lg:w-1/3 mx-auto p-5 lg:p-12 mt-8'>
        <h1 className='text-[24px] lg:text-[32px] font-bold text-[#333]'>Create account</h1>
        <p className='text-[16px] font-normal mt-3 mb-14 text-[#737373]'>Let’s get you started sharing your links!</p>
        <form onSubmit={handleSubmit(create)}>
          <div>
          <Input
          label="Email"
          placeholder = "e.g. alex@email.com"
          type="email"
          error={error}
          errors={errors?.email?.message}
          icon = "icon-email"
          {...register("email", {
            required: true,
            validate:{
                matchPatern : (value) => /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g.test(value) || "Email address must be a valid Address"
            }
          })}
          />
          </div>
          <div className='mt-7 '>
          <Input
          label="Password"
          placeholder = "At least 8 characters"
          type="password"
          error={error}
          errors={errors?.password?.message}
          icon = "icon-password"
          {...register("password", {
            required: true,
            validate:{
                matchPatern : (value) => /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})/g.test(value) || "Please check again"
            }
          })}
          />
          </div>

          <p className="text-[12px] font-normal text-[#737373] text-left my-3">Password must contain at least 8 characters</p>
         
          <Button>Create new account</Button>
        </form>
        <p className='text-[16px] text-[#737373] text-center mt-7'>Already have an account? <Link className='cursor-pointer text-[#633CFF]' to='/'> Login</Link> </p>
        {error && <p className='text-[#FF3939] text-center'>{error}</p>}
      </div>
    </div>
   </div>
  )
}

export default SignUp