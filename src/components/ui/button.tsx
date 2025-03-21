import React, { ButtonHTMLAttributes } from 'react'

type ButtonProps={
} & ButtonHTMLAttributes<HTMLButtonElement>


function Button({children, className, ...props}:ButtonProps) {
  return (
    <button className={`w-full bg-[#44348a] text-white py-3 rounded-lg hover:bg-[#5847a8] transition ${className}`} {...props}>{children}</button>
  )

}

export default Button


