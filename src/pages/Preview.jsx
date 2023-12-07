/* eslint-disable no-unused-vars */
import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { Button } from '../components';

const Preview = () => {
  const navigate = useNavigate()
  const profileDetails = useSelector((state) => state.profile.profileDetails);
  const getAllLinks = useSelector((state) => state.link.getAllLinks);

  return (
    <div className=' relative h-screen bg-[#FAFAFA]'>
    <div className='bg-[#633CFF]  h-96 rounded-br-3xl rounded-bl-3xl pt-6 px-6'>
        <div className='flex justify-between  py-4 px-6  bg-white rounded-xl' >
            <button onClick={()=>navigate("/add-links")} className='py-3 px-7 border-[1px] border-[#633CFF] text-[#633CFF] rounded-lg' >Back to Editor</button>
            <button className='py-3 px-7 border-[1px] bg-[#633CFF] border-[#633CFF] text-[#FFFFFF] rounded-lg' >Share Link</button>
        </div>

    </div>
    <div className='bg-white pt-5 px-14 w-96 shadow-2xl rounded-3xl  absolute top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
        <div className='mb-14 text-center'>
        <div className=" mx-auto rounded-full bg-white w-24 h-24   ">
            <img src={`/images/profile.jpeg`} alt="profile" className="object-cover  w-full h-full rounded-full" />
        </div>
        <div className="  w-[235px] bg-white text-center mx-auto">
          <p className="text-[18px] font-semibold text-[#333]">{`${profileDetails?.firstName?profileDetails?.firstName:"Ben"}`} {`${profileDetails?.lastName?profileDetails?.lastName:"Wright"}`}</p>
          <p className="text-[14px] font-normal text-[#737373]">{`${profileDetails?.email?profileDetails?.email:"ben@example.com"}`}</p>
        </div>
        <div className=" w-full mx-auto mt-7 ">
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
</div>
  )
}

export default Preview