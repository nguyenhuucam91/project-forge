import { ReactNode } from 'react'

type MarkupButton = {
  children: ReactNode
  active?: boolean
  handleOnClick: () => void
}

export default function MarkupButton({ children, handleOnClick, active = false }: MarkupButton) {
  return (
    <button
      className={`notMove focus:outline-blue-300 h-9 w-9 flex justify-center items-center p-1 flex-col ring ring-[#f0f5f7] shadow-lg rounded-md active:shadow-2xl hover:shadow-inner text-primary-300  ${
        active ? 'shadow-inner shadow-primary-100 ring-primary-300' : ''
      }`}
      onClick={handleOnClick}
    >
      {children}
    </button>
  )
}
