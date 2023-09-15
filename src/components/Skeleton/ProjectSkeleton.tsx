import { Skeleton } from '@mui/material'

export default function ProjectSkeleton() {
  return (
    <div>
      <div className='w-full h-[200px] rounded-2xl shadow-lg bg-white p-5 flex flex-col justify-between'>
        <div className='flex gap-3'>
          <Skeleton variant='rectangular' width={40} height={40} className='rounded-md' />
          <div className='flex flex-col gap-[2px] items-start justify-center flex-1'>
            <Skeleton variant='text' sx={{ fontSize: '1.5rem' }} width={100} />
            <Skeleton variant='text' sx={{ fontSize: '1rem' }} width={200} />
          </div>
        </div>
        <div className=' flex items-center justify-between'>
          <div className='space-y-[10px]'>
            <Skeleton variant='text' sx={{ fontSize: '1.5rem' }} width={100} />
            <div className='flex gap-1'>
              <Skeleton variant='rectangular' width={36} height={36} className='rounded-xl' />
              <Skeleton variant='rectangular' width={36} height={36} className='rounded-xl ' />
              <Skeleton variant='rectangular' width={36} height={36} className='rounded-xl ' />
            </div>
          </div>
          <div className='flex-col flex gap-[10px] items-center justify-start'>
            <Skeleton variant='text' sx={{ fontSize: '1.5rem' }} width={50} />
            <Skeleton variant='rectangular' width={40} height={40} className='rounded-xl' />
          </div>
          <div className='flex-col flex gap-[10px] items-center justify-start'>
            <Skeleton variant='text' sx={{ fontSize: '1.5rem' }} width={50} />
            <Skeleton variant='rectangular' width={40} height={40} className='rounded-xl' />
          </div>
        </div>
      </div>
    </div>
  )
}
