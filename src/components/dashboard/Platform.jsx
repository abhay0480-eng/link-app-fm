/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import service from '../../appwrite/config'
import { Button, Input, Select } from '../index'

const Platform = ({id,item}) => {
    console.log("item",item);
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
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
      const userData = useSelector((state) => state.auth.userData);
  
  
      const addlinks = async(data ) => {
        const dbPost = await service.updateLinks({ ...data,documentId:id });
      }
  return (
    <form onSubmit={handleSubmit(addlinks)}>
    <div>
    <Select
    label="Choose a platform"
    type="text"
    options={options}
    defaultValue={item.Platform}
    {...register("Platform")}
    
    />
    </div>


    <div className='my-7'>
    <Input
    label="LinksUrl"
    placeholder = "LinksUrl"
    type="text"
    defaultValue={item.LinksUrl}
    {...register("LinksUrl")}
   
    />
    </div>
   
    <Button>Save</Button>
  </form>
  )
}

export default Platform