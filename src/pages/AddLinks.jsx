/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Button, Header, Input, Select } from '../components'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import service from '../appwrite/config';
import authService from '../appwrite/auth';
import { login, logout } from '../store/authSlice';
import Platform from '../components/dashboard/platform';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const AddLinks = () => {
  const userData = useSelector((state) => state.auth.userData?.$id);
  const isLoading = useSelector((state) => state.loader.status);
  const id = userData?.toString()

  const[getAllLinks,setGetAllLinks] = useState()
  const[count,setCount] = useState(1)
  

  const [linkAdd, setLinkAdd] = useState({
      Platform:"GitHub",
      LinksUrl:"GitHub",
      userID:id
  })
  

  useEffect(() => {
    async function fetchData() {

      try {
        const AllLinks = await service.getLink(id);
        setGetAllLinks(AllLinks.documents)
        // You can do more with the fetched data here

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  
    fetchData();
  }, [count]);

  const addlinks = async() => {
    const dbPost = await service.addLinks({ ...linkAdd });
    setCount(pre=>pre+1)
  }


  return (
    <>
    <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
     <Header/>
     <Button onClick={()=>addlinks()}>Add link</Button>
     {getAllLinks?.map((item,index)=>(<div key={item.$id}><Platform id={item.$id} item={item}/></div>))}
    </>
     
  )
}

export default AddLinks