import React, { ReactNode } from 'react'

type MarkupButton = {
  children: ReactNode
  handleOnClick: () => void
}

export default function MarkupButton({ children, handleOnClick }: MarkupButton) {
  return (
    <button
      className='notMove focus:outline-blue-300 h-9 w-9 flex justify-center items-center p-1 flex-col ring ring-[#f0f5f7] shadow-lg rounded-md active:shadow-2xl hover:shadow-inner text-primaryColor '
      onClick={handleOnClick}
    >
      {children}
    </button>
  )
}
