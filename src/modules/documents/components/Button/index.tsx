import { MouseEventHandler } from 'react'

type ButtonType = {
  content: string
  icon: React.ReactNode
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined
}
export default function ButtonHeader({ onClick, content, icon }: ButtonType) {
  return (
    <>
      <button className='px-2 py-1 hover:bg-slate-100 rounded-md' onClick={onClick}>
        <div className='flex items-center gap-1'>
          <>{icon}</>
          <span>{content}</span>
        </div>
      </button>
    </>
  )
}
