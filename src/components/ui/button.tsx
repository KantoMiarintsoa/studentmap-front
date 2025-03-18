import React, { ButtonHTMLAttributes } from 'react'

type ButtonProps={
} & ButtonHTMLAttributes<HTMLButtonElement>


function Button({children, className, ...props}:ButtonProps) {
  return (
    <button className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition" {...props}>{children}</button>
  )

}

export default Button