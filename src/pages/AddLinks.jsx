/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Button, Header, Input, Select, Sidebar } from "../components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import service from "../appwrite/config";
import authService from "../appwrite/auth";
import { login, logout } from "../store/authSlice";
import Platform from "../components/dashboard/platform";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const AddLinks = () => {
  const userData = useSelector((state) => state.auth.userData?.$id);
  const isLoading = useSelector((state) => state.loader.status);
  const id = userData?.toString();

  const [getAllLinks, setGetAllLinks] = useState();
  const [count, setCount] = useState(1);

  const [linkAdd, setLinkAdd] = useState({
    Platform: "GitHub",
    LinksUrl: "GitHub",
    userID: id,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const AllLinks = await service.getLink(id);
        setGetAllLinks(AllLinks.documents);
        // You can do more with the fetched data here
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [count]);

  const addlinks = async () => {
    const dbPost = await service.addLinks({ ...linkAdd });
    setCount((pre) => pre + 1);
  };

  const remove = async(userId ) => {
    console.log("userId",userId);
    const dbPost = await service.deleteLinks({documentId:userId});
    setCount((pre) => pre + 1);
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
      <div className="grid grid-cols-12 gap-x-3">
        <div className="col-span-4">
          <Sidebar getAllLinks={getAllLinks}/>
        </div>
        <div className="col-span-8 px-5">
          <h1 className="text-[#333] font-bold text-[32px]">Customize your links</h1>
          <p className="text-[#737373] font-normal text-[16px] mt-5 mb-7">Add/edit/remove links below and then share all your profiles with the world!</p>
          <Button onClick={() => addlinks()} className={`!bg-[#fff] border-[1px] border-[#633CFF] rounded-lg !text-[#633CFF] !text-[16px] !w-full flex justify-center items-center shadow-none`}>+ Add new link</Button>
          {getAllLinks?.map((item, index) => (
            <div key={item.$id}>
              <Platform id={item.$id} item={item}  />
              <Button onClick={()=>remove(item.$id)}>remove</Button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AddLinks;
