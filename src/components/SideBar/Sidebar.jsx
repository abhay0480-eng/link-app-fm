/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, {  useEffect, useState } from 'react'
import { Button } from '..'
import service from '../../appwrite/config';
import { useDispatch, useSelector } from 'react-redux';
import { startLoader, stopLoader } from '../../store/loader'; 

const Sidebar = () => {
  const userData = useSelector((state) => state.auth.userData?.$id);


  const id = userData?.toString();
 
  const dispatch = useDispatch()

  useEffect(() => {

    async function fetchData() {
      try {
        dispatch(startLoader())
        const setprofileDetails = await service.getProfileDetails(id);
        if(setprofileDetails.documents.length>0){
          dispatch(getProfileDetails(setprofileDetails.documents[0]))

        }

      } catch (error) {
        console.error("Error fetching data:", error);
      }finally{
        dispatch(stopLoader())
      }
    }

    fetchData();
  }, []);

  
  const profileDetails = useSelector((state) => state.profile.profileDetails);
  const getAllLinks = useSelector((state) => state.link.getAllLinks);
  const pic = useSelector((state) => state.image.profileImage);
  
const piclocal = JSON.parse(localStorage.getItem('profileImageLocal'));


  return (
    <div className="flex flex-col  justify-center items-center bg-white">
                <div className="relative">
                    <img
                        src="/images/illustration-phone-mockup.svg"
                        alt=""
                        className=""
                    />
                     <div className=" absolute  top-[11%] mx-auto rounded-full bg-white w-24 h-24  left-1/2 transform -translate-x-1/2 ">
                        <img src={`${piclocal?piclocal:pic}`} alt="profile" className="object-cover  w-full h-full rounded-full" />
                      </div>
                    <div className="absolute  w-[235px] bg-white text-center top-[28%]   left-1/2 transform -translate-x-1/2">
                     
                        <p className="text-[18px] font-semibold text-[#333]">{`${profileDetails?.firstName?profileDetails?.firstName:"Ben"}`} {`${profileDetails?.lastName?profileDetails?.lastName:"Wright"}`}</p>
                        <p className="text-[14px] font-normal text-[#737373]">{`${profileDetails?.email?profileDetails?.email:"ben@example.com"}`}</p>
                    </div>
                    <div className="absolute w-[235px] top-[44%] left-1/2 transform -translate-x-1/2  ">
                        {
                        getAllLinks?.map((item, index) =>{
                           return  <Button key={index} className={`mb-2 px-3 
                           ${item?.Platform === "GitHub" && "!bg-[#1A1A1A]"} 
                           ${item?.Platform==="Frontend Mentor" && "!bg-[#FFF] !text-black"} 
                           ${item?.Platform==="Twitter" && "!bg-[#43B7E9]"} 
                           ${item?.Platform==="LinkedIn" && "!bg-[#2D68FF]"} 
                           ${item?.Platform==="YouTube" && "!bg-[#EE3939]"} 
                           ${item?.Platform==="Facebook" && "!bg-[#2442AC]"}  
                           ${item?.Platform==="Twitch" && "!bg-[#EE3FC8]"}  
                           ${item?.Platform==="Dev.to" && "!bg-[#333]"}  
                           ${item?.Platform==="Codewars" && "!bg-[#8A1A50]"}  
                           ${item?.Platform==="freeCodeCamp" && "!bg-[#302267]"}  
                           ${item?.Platform==="GitLab" && "!bg-[#EB4925]"}  
                           ${item?.Platform==="Codepen" && "!bg-[#0333]"}  
                           ${item?.Platform==="Hashnode" && "!bg-[#0330D1]"}  
                           ${item?.Platform==="Stack Overflow" && "!bg-[#EC7100]"}  
                           flex items-center `}><img src={`/images/${item?.Platform}.svg `} alt="" style={{stroke: '#fff',filter: 'brightness(0) invert(1)'}} className="w-5 h-5 mx-3 "/>{item?.Platform}<img src={`/images/icon-arrow-right.svg `} alt="" style={{stroke: '#fff',filter: 'brightness(0) invert(1)'}} className="w-5 h-5 ml-auto"/></Button>
                        })}
                    </div>
              </div>
          </div>
  )
}

export default Sidebar