import React from 'react'

type ProjectContainerType = {
  title: string
  children: React.ReactNode
}
export default function ProjectContainer({ title, children }: ProjectContainerType) {
  return (
    <div className='h-full w-full rounded-lg p-4 flex flex-col items-start bg-white min-h-[300px]'>
      <h2 className='text-gray-600 font-medium text-base '>{title}</h2>
      {children}
    </div>
  )
}
