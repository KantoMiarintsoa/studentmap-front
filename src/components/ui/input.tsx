import React, { HTMLAttributes, InputHTMLAttributes } from 'react'

type InputProps={

}& InputHTMLAttributes<HTMLInputElement>

function Input({children,className,...props}:InputProps) {
  return (
    <input className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#453881] text-black" {...props} >{children}</input>

  )
}

export default Input

