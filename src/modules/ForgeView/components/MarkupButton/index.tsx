import React, { ReactNode } from 'react'

type MarkupButton = {
  children: ReactNode
  handleOnClick: () => void
}

export default function MarkupButton({ children, handleOnClick }: MarkupButton) {
  return (
    <button
      className='notMove focus:outline-blue-300 h-9 w-9 flex justify-center items-center p-1 flex-col'
      onClick={handleOnClick}
    >
      {children}
    </button>
  )
}
