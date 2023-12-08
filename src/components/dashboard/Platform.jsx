/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import {  useDispatch, useSelector } from 'react-redux'
import service from '../../appwrite/config'
import { Button, Input, Select } from '../index'
import { startLoader, stopLoader } from '../../store/loader'

const Platform = ({id,item,setCount}) => {
  const dispatch = useDispatch()
    const {
        register,
        handleSubmit,
      } = useForm()
      const [error,setError] =useState("")
      const Platform = {
        GitHub : "GitHub",
        FrontendMentor : "Frontend Mentor",
        Twitter : "Twitter",
        LinkedIn : "LinkedIn",
        YouTube : "YouTube",
        Facebook : "Facebook",
        Twitch : "Twitch",
        Devto : "Dev.to",
        Codewars : "Codewars",
        Codepen : "Codepen",
        freeCodeCamp : "freeCodeCamp",
        GitLab : "GitLab",
        Hashnode : "Hashnode",
        StackOverflow : "Stack Overflow",
      }
  
      const options = Object.keys(Platform)
      const addlinks = async(data ) => {
        try {
          dispatch(startLoader())
          await service.updateLinks({ ...data,documentId:id });
          setCount(pre=>pre+1)
        } catch (error) {
          console.log("error");
        }finally{
          dispatch(stopLoader())
        }

       
      }
  return (
    <form onSubmit={handleSubmit(addlinks)}>
    <div>
    <Select
    label="Platform"
    type="text"
    options={options}
    className="rounded-lg"
    icon={item.Platform}
    defaultValue={item.Platform}
    {...register("Platform")}
    />
    </div>


    <div className='my-7'>
    <Input
    label="LinksUrl"
    placeholder = "LinksUrl"
    type="text"
    icon="icon-link"
    defaultValue={item.LinksUrl}
    {...register("LinksUrl")}
    />
    </div>

   <div className='flex justify-end'>
    <Button className="!w-40 ">Save</Button>
   </div>
  </form>
  )
}

export default Platform