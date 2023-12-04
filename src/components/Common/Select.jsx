/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import { useId } from 'react'

const Input = React.forwardRef(function Input({
    options,
    label,
    type="text",
    className="",
    ...props
},ref){
    const id=useId()
    return (
        <div className='w-full'>
            {label && <label 
            className=''
            htmlFor={id}
            >
                {label}
            </label>}
            
            <select
            className={`${className}`}
            ref={ref}
            {...props}
            id={id}
            >
                {options?.map((item)=> {
                    <options key={item} value={item}>
                        {item}
                    </options>
                } )}
            </select>
        </div>
    )
})

export default Input