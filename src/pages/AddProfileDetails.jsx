/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input, Sidebar } from '../components';
import service from '../appwrite/config';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { startLoader, stopLoader } from '../store/loader';
import { getProfileDetails } from '../store/profileSlice';
import { getImage } from '../store/imageSlice.js';

const AddProfileDetails = () => {
  const isLoading = useSelector((state) => state.loader.status);
  const piclocal = JSON.parse(localStorage.getItem('profileImageLocal'));
  const userData = useSelector((state) => state.auth.userData?.$id);
  const profileDetails = useSelector((state) => state.profile.profileDetails);
  const pic = useSelector((state) => state.image.profileImage);
  const id = userData?.toString();
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [selectedFile, setSelectedFile] = useState(null);

  const [imageKey, setImageKey] = useState();
  const [profilePreview, setProfilePreview] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const [error,setError] =useState("")


  useEffect(() => {

    async function fetchData() {
      try {
        dispatch(startLoader())
        const setprofileDetails = await service.getProfileDetails(id);
        if(setprofileDetails.documents.length>0){
          dispatch(getProfileDetails(setprofileDetails.documents[0]))
          const pic = await service.getImageFile(setprofileDetails?.documents[0]?.profileImage)
          if(pic){
            dispatch(getImage(pic?.href))
          }
            
        }

      } catch (error) {
        console.error("Error fetching data:", error);
      }finally{
        dispatch(stopLoader())
      }
    }

    fetchData();
  }, []);

  const addDetails = async(data ) => {
    setError("")
    try {
      dispatch(startLoader())
      if(Object.values(profileDetails).length === 0){
      const profileRes =   await service.addProfileInfo({...data,userId:id,profileImage:imageKey} )
      if(profileRes.profileImage){
        const pic = await service.getImageFile(profileRes.profileImage)
        if(pic){
          dispatch(getImage(pic?.href))
        }
          
      }
      }else{
        const profileRes = await service.updateProfileInfo({...data,profileImage:imageKey},profileDetails.$id,)
        if(profileRes.profileImage){
          const pic = await service.getImageFile(profileRes.profileImage)
          if(pic){
            dispatch(getImage(pic?.href))
          }
            
        }


      }
      
    } catch (error) {
        setError(error.message)
    }finally{
      dispatch(stopLoader())
    }
  }

  useEffect(() => {

    async function fetchData() {
      try {
        dispatch(startLoader())
      const fileD =  await service.uploadFile(selectedFile)
        setImageKey(fileD.$id)
        const pic = await service.getImageFile(fileD.$id)
        if(pic.href){
          setProfilePreview(pic.href)
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }finally{
        dispatch(stopLoader())
      }
    }

    fetchData();
  }, [selectedFile]);


  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };


  return (
    <>
     <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className="lg:grid grid-cols-12 gap-x-3 lg:p-10 ">
        <div className="col-span-4">
          <Sidebar  />
        </div>
        <div className="col-span-8 px-5">
          <h1 className="text-[#333] font-bold  text-[24px] lg:text-[32px]">Profile Details</h1>
          <p className="text-[#737373] font-normal text-[16px] mt-5 mb-7">Add your details to create a personal touch to your profile.</p>


          <div className="lg:grid grid-cols-3 bg-[#FAFAFA] p-5">
              <div className="flex flex-col justify-center">
                <p className="text-[16px] font-normal text-[#737373]">
                  Profile picture
                </p>
              </div>
              <div className="bg-[#EFEBFF] flex flex-col h-52 justify-center items-center relative ">
                  <div className="z-[100]">
                    <input
                    type="file"
                    id="fileInput"
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                    />
                    <label
                      htmlFor="fileInput"
                      className="w-1/2  text-white  !rounded-xl cursor-pointer z-[100]"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="40"
                        height="40"
                        // fill="none"
                        className="mx-auto"
                        viewBox="0 0 40 40"
                        style={{ fill:piclocal ? "#FFFFFF" : "#633CFF" }}
                        >
                        {/* ... your path here ... */}
                        {/* <img src="/images/icon-upload-image.svg" alt=""  className="!fill-white"/> */}
                        <path d="M33.75 6.25H6.25a2.5 2.5 0 0 0-2.5 2.5v22.5a2.5 2.5 0 0 0 2.5 2.5h27.5a2.5 2.5 0 0 0 2.5-2.5V8.75a2.5 2.5 0 0 0-2.5-2.5Zm0 2.5v16.055l-4.073-4.072a2.5 2.5 0 0 0-3.536 0l-3.125 3.125-6.875-6.875a2.5 2.5 0 0 0-3.535 0L6.25 23.339V8.75h27.5ZM6.25 26.875l8.125-8.125 12.5 12.5H6.25v-4.375Zm27.5 4.375h-3.34l-5.624-5.625L27.91 22.5l5.839 5.84v2.91ZM22.5 15.625a1.875 1.875 0 1 1 3.75 0 1.875 1.875 0 0 1-3.75 0Z" />
                      </svg>
                      <p className={`${piclocal ? "text-[#FFFFFF]" : "text-[#633CFF]"}`}>Change Image</p>
                    </label>
                </div>
                {piclocal&&<div  className="absolute top-0 w-full h-full rounded-2xl bg-black opacity-60 z-20 "></div>}
                  {profilePreview&&<img src={profilePreview} alt="" className="absolute top-0 w-full h-full rounded-2xl object-cover " />}
              </div>
              <div className="flex flex-col justify-center items-end">
                <p className="text-[16px] font-normal text-right text-[#737373]">
                  Image must be below 1024x1024px. Use PNG or JPG format.
                </p>
              </div>
            </div>

            <div className="bg-[#FAFAFA] p-5 mt-5">
            <form onSubmit={handleSubmit(addDetails)}>
                  <div className="lg:flex justify-between items-center">
                  <Input
                    label="First name*"
                    placeholder = "e.g. John"
                    type="text"
                    error={error}
                    classNamelabel="inline-block w-2/5 text-[16px] font-normal text-[#737373]"
                    className="w-full "
                    classNameinput="lg:flex justify-between items-center"
                    errors={errors?.firstName?.message}
                    defaultValue={profileDetails?.firstName}
                    {...register("firstName", {
                      required: true
                    })}
                  />
                  </div>

                  <div className="lg:flex justify-between items-center my-5">
                  <Input
                    label="Last name*"
                    placeholder = "e.g. Appleseed"
                    type="text"
                    error={error}
                    classNamelabel="inline-block w-2/5 text-[16px] font-normal text-[#737373]"
                    className="w-full "
                    defaultValue={profileDetails?.lastName}
                    classNameinput="lg:flex justify-between items-center"
                    errors={errors?.lastName?.message}
                    {...register("lastName", {
                      required: true
                    })}
                  />
                  </div>
                  <div className="lg:flex justify-between items-center">
                  <Input
                    label="Email"
                    placeholder = "e.g. email@example.com"
                    type="text"
                    error={error}
                    classNamelabel="inline-block w-2/5 text-[16px] font-normal text-[#737373]"
                    className="w-full "
                    defaultValue={profileDetails?.email}
                    classNameinput="lg:flex justify-between items-center"
                    errors={errors?.email?.message}
                    {...register("email", {
                      required: false
                    })}
                  />
                  </div>
                  <div className='flex justify-end mt-5'>
                  <Button className="!w-40">{Object.values(profileDetails).length === 0?"Save":"Update"}</Button>
                  </div>
                  </form>
                </div>
        </div>
      </div>
    </>
  )
}

export default AddProfileDetails