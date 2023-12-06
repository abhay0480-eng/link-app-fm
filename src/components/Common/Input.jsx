/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import { useId } from 'react'

const Input = React.forwardRef(function Input({
    label,
    type="text",
    className="",
    icon,
    error,
    errors,
    classNamelabel,
    classNameinput,
    ...props
},ref){
    const id=useId()
    return (
        <div className={`w-full ${classNameinput}`}>
            {label && <label 
            className={`w-full block text-[12px] font-normal text-[#333] mb-2 ${error && "text-[#FF3939]"} ${classNamelabel}`}
            htmlFor={id}
            >
                {label}
            </label>}
            
            <div className={`relative w-full`}>
            <img src={`/images/${icon}.svg`} alt='' className='absolute top-1/2 left-3 transform -translate-y-1/2'/>
            <input
            type={type}
            className={`p-3 pl-10 w-full border-[1px] border-[#D9D9D9] rounded-lg focus:outline-none focus:border-[#633CFF] focus:ring focus:ring-[#5e37fd40] focus:shadow-indigo-950  ${className} ${error && "border-[#FF3939]"}`}
            ref={ref}
            {...props}
            id={id}
            />
            {errors&&<p className='absolute text-[#FF3939] top-1/2 right-3 transform -translate-y-1/2'>{errors}</p>}
            </div>
            
        </div>
    )
})

export default Input