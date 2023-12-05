/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin, logout } from '../../store/authSlice'
import { Button,ImageIcon,Logo,Input } from '../index'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { useForm } from "react-hook-form"
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';


const Login = () => {
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const [open, setOpen] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);

    const dispatch = useDispatch()
    const navigate = useNavigate()
  
    // useEffect(() => {
    //   authService.getCurrentUser()
    //   .then((userData) => {
    //     if (userData) {
    //       dispatch(login({userData}))
    //     } else {
    //       dispatch(logout())
    //     }
    //   })
    //   .finally(() => setOpen(false))
     
    // }, [])

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm()
      const [error,setError] =useState("")

      const login = async(data ) => {
        setError("")
        try {
          setOpen(true)
          const session = await authService.login(data)
          if(session){
            setOpenSnack(true)
            const userData = await authService.getCurrentUser()
            if(userData){
                dispatch(authLogin(userData))
                
                setTimeout(() => {
                  navigate('/add-links')
                }, 1000);
            }
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
          Login successfully
        </Alert>
      </Snackbar>
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
          label="Email address"
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
          <div className='my-7'>
          <Input
          label="Password"
          placeholder = "Enter your password"
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
          {errors?.password?.message && <p className='text-[#FF3939] text-center text-[12px]'>Ensure that password is 8 to 64 characters long and contains a mix of upper and lower case characters, one numeric and one special character</p>}
          </div>
         
          <Button>Login</Button>
        </form>
        <p className='text-[16px] text-[#737373] text-center mt-7'>Don’t have an account?<Link className='cursor-pointer text-[#633CFF]' to='/signup'> Create account</Link> </p>
        {error && <p className='text-[#FF3939] text-center'>{error}</p>}
        
      </div>
    </div>
   </div>
  )
}

export default Login

//Ensure that password is 8 to 64 characters long and contains a mix of upper and lower case characters, one numeric and one special character