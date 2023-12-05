/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import { useId } from 'react'

const Select = React.forwardRef(function Select({
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
                {options.map((item)=> (
                    <option key={item} value={item}>
                        {item}
                    </option>
                ))}
            </select>

            
        </div>
    )
})

export default Select