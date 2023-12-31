/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Button, Header, Input, Select, Sidebar } from "../components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import service from "../appwrite/config";
import authService from "../appwrite/auth";
import { login, logout } from "../store/authSlice";
import Platform from "../components/dashboard/Platform";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { startLoader, stopLoader } from "../store/loader";
import { allLinks } from "../store/linkSlice";

const AddLinks = () => {
  const dispatch = useDispatch()
  const userData = useSelector((state) => state.auth.userData?.$id);
  const isLoading = useSelector((state) => state.loader.status);
  const getAllLinks = useSelector((state) => state.link.getAllLinks);

  const id = userData?.toString();
  const [count, setCount] = useState(1);

  const [linkAdd, setLinkAdd] = useState({
    Platform: "GitHub",
    LinksUrl: "https://www.github.com/benwright",
    userID: id,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        dispatch(startLoader())
        const AllLinks = await service.getLink(id);
        dispatch(allLinks(AllLinks.documents))
      } catch (error) {
        console.error("Error fetching data:", error);
      }finally{
        dispatch(stopLoader())
      }
    }

    fetchData();
  }, [count]);

  const addlinks = async () => {

    try {
      dispatch(startLoader())
      await service.addLinks({ ...linkAdd });
      setCount((pre) => pre + 1);
    } catch (error) {
      console.log(error);
    }finally{
      dispatch(stopLoader())
    }

   
  };

  const remove = async(userId ) => {
    try {
      dispatch(startLoader())
      await service.deleteLinks({documentId:userId});
      setCount((pre) => pre + 1);
    } catch (error) {
      console.log(error);
    }finally{
      dispatch(stopLoader())
    }
  }

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {/* <Header /> */}
      <div className="lg:grid lg:grid-cols-12 gap-x-3">
        <div className="col-span-4">
          <Sidebar/>
        </div>
        <div className="lg:col-span-8 px-5">
          <h1 className="text-[#333] font-bold lg:text-[32px] text-[24px]">Customize your links</h1>
          <p className="text-[#737373] font-normal text-[16px] mt-5 mb-7">Add/edit/remove links below and then share all your profiles with the world!</p>
          <Button onClick={() => getAllLinks.length < 5 && addlinks()} className={`!bg-[#fff] border-[1px] border-[#633CFF] rounded-lg !text-[#633CFF] !text-[16px] !w-full flex justify-center items-center`}>+ Add new link</Button>


          {getAllLinks.length < 1 ? (
                  <div className=" mx-auto bg-[#FAFAFA] w-full lg:p-10 p-5 mt-5">
                    <img
                      src="/images/illustration-empty.svg"
                      alt=""
                      className="mx-auto hidden"
                    />
                    <img
                      src="/images/illustration-empty.svg"
                      alt=""
                      className="mx-auto "
                    />
                    <h2 className="lg:text-[32px] text-[24px]  font-bold text-[#333] text-center mt-6 mb-8">
                      Let’s get you started
                    </h2>
                    <p className="text-[16px] font-normal text-[#737373] text-center lg:w-1/2 mx-auto">
                      Use the “Add new link” button to get started. Once you
                      have more than one link, you can reorder and edit them.
                      We’re here to help you share your profiles with everyone!
                    </p>
                  </div>
                ) : (
                  <div className="h-96 overflow-y-auto px-5 mt-5">
                  {getAllLinks?.map((item, index) => (
                    <div key={item.$id} className="mt-5">
                       <div className='flex justify-between items-center'>
                        <div className='text-[16px] font-bold text-[#737373]'>{`Link #${index+1}`}</div>
                        <div  onClick={()=>remove(item.$id)} className='text-[16px] font-normal text-[#737373] cursor-pointer'>Remove</div>
                      </div>
                      <Platform id={item.$id} item={item}  setCount={setCount} />
                    </div>
                  ))}
                  </div>
                )}
          
          
        </div>
      </div>
    </>
  );
};

export default AddLinks;
