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

const AddProfileDetails = () => {
  const isLoading = useSelector((state) => state.loader.status);
  const userData = useSelector((state) => state.auth.userData?.$id);
  const profileDetails = useSelector((state) => state.profile.profileDetails);
  const id = userData?.toString();
  const getAllLinks = useSelector((state) => state.link.getAllLinks);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileData, setFileData] = useState();



console.log(getAllLinks);
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
        dispatch(getProfileDetails(setprofileDetails.documents[0]))

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
       await service.addProfileInfo({...data,userId:id} )
    } catch (error) {
        setError(error.message)
    }finally{
      dispatch(stopLoader())
    }
  }

  // useEffect(() => {

  //   async function fetchData() {
  //     try {
  //       dispatch(startLoader())
  //     const fileD =  await service.uploadFile(selectedFile)
  //       setFileData(fileD.$id)
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }finally{
  //       dispatch(stopLoader())
  //     }
  //   }

  //   fetchData();
  // }, [selectedFile]);


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
      <div className="grid grid-cols-12 gap-x-3 p-10 ">
        <div className="col-span-4">
          <Sidebar getAllLinks={getAllLinks} profileDetails={profileDetails} fileData={fileData}/>
        </div>
        <div className="col-span-8 px-5">
          <h1 className="text-[#333] font-bold text-[32px]">Profile Details</h1>
          <p className="text-[#737373] font-normal text-[16px] mt-5 mb-7">Add your details to create a personal touch to your profile.</p>


          <div className="grid grid-cols-3 bg-[#FAFAFA] p-5">
              <div className="flex flex-col justify-center">
                <p className="text-[16px] font-normal text-[#737373]">
                  Profile picture
                </p>
              </div>
              <div className="bg-[#EFEBFF] flex flex-col h-52 justify-center items-center">
              <Input
                    type="file"
                    classNamelabel="inline-block w-2/5 text-[16px] font-normal text-[#737373]"
                    className="w-full "
                    onChange={handleFileChange}
                    classNameinput="flex justify-between items-center"
                    // {...register("profileImage", {
                    //   required: false
                    // })}
                  />
              </div>
              <div className="flex flex-col justify-center items-end">
                <p className="text-[16px] font-normal text-right text-[#737373]">
                  Image must be below 1024x1024px. Use PNG or JPG format.
                </p>
              </div>
            </div>

            <div className="bg-[#FAFAFA] p-5 mt-5">
            <form onSubmit={handleSubmit(addDetails)}>
                  <div className="flex justify-between items-center">
                  <Input
                    label="First name*"
                    placeholder = "e.g. John"
                    type="text"
                    error={error}
                    classNamelabel="inline-block w-2/5 text-[16px] font-normal text-[#737373]"
                    className="w-full "
                    classNameinput="flex justify-between items-center"
                    errors={errors?.firstName?.message}
                    defaultValue={profileDetails?.firstName}
                    {...register("firstName", {
                      required: true
                    })}
                  />
                  </div>

                  <div className="flex justify-between items-center my-5">
                  <Input
                    label="Last name*"
                    placeholder = "e.g. Appleseed"
                    type="text"
                    error={error}
                    classNamelabel="inline-block w-2/5 text-[16px] font-normal text-[#737373]"
                    className="w-full "
                    defaultValue={profileDetails?.lastName}
                    classNameinput="flex justify-between items-center"
                    errors={errors?.lastName?.message}
                    {...register("lastName", {
                      required: true
                    })}
                  />
                  </div>
                  <div className="flex justify-between items-center">
                  <Input
                    label="Email"
                    placeholder = "e.g. email@example.com"
                    type="text"
                    error={error}
                    classNamelabel="inline-block w-2/5 text-[16px] font-normal text-[#737373]"
                    className="w-full "
                    defaultValue={profileDetails?.email}
                    classNameinput="flex justify-between items-center"
                    errors={errors?.email?.message}
                    {...register("email", {
                      required: false
                    })}
                  />
                  </div>
                  <div className='flex justify-end mt-5'>
                  <Button className="w-40">Save</Button>
                  </div>
                  
                  </form>
                </div>

            
        </div>
      </div>
    </>
  )
}

export default AddProfileDetails