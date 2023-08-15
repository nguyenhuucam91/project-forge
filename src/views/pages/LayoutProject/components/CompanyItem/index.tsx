import React from 'react'

export default function CompanyItem() {
  return (
    <div className='w-full py-[20px] px-[20px] flex gap-10 hover:bg-primary-50 rounded-lg'>
      <img
        src='https://images.unsplash.com/photo-1561275526-4d2c9c9c435c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80'
        alt='company logo'
        className='w-[80px] h-[80px] object-cover rounded-lg'
      ></img>
      <div className='flex flex-col items-start justify-center gap-2 flex-1'>
        <span className='text-[18px] font-medium'>Solid BIM</span>
        <div className='flex items-center justify-start gap-[2px]'>
          <span className='text-sm text-gray-400 '>2 Projects</span>
          <span> - </span>
          <button className='text-sm text-primary-800 font-semibold '>Change account</button>
        </div>
      </div>
    </div>
  )
}
