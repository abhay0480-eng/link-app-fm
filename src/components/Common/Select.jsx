/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import { useId } from 'react'

const Select = React.forwardRef(function Select({
    options,
    label,
    type="text",
    className="",
    icon,
    ...props
},ref){
    const id=useId()

    return (
        <div className='w-full my-3'>
            {label && <label 
            className='text-[12px] font-normal text-[#333] mb-1 block'
            htmlFor={id}
            >
                {label}
            </label>}
            
           

            <div className='relative'>
            <img src={`/images/${icon}.svg`} alt='' className='absolute top-1/2 left-3 transform -translate-y-1/2'/>
            <select
            className={`w-full block border-[#D9D9D9] border-[1px] pl-8 pr-3 py-4 ${className}`}
            ref={ref}
            {...props}
            id={id}
            >
                {options.map((item)=> (
                    <option key={item} value={item} className='relative'>
                       <img src={`/images/${item}.svg`} alt='' className='absolute top-1/2 left-3 transform -translate-y-1/2'/> {item}
                    </option>
                ))}
            </select>
            </div>
            
        </div>
    )
})

export default Select