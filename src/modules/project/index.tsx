import React from 'react'
import ProjectHeader from './components/ProjectHeader'
import ProjectContainer from './components/ProjectContainer'
import { ReactComponent as IconEmpty } from './components/icons/icon-empty.svg'
import WeatherCard from './components/WeatherCard'

export default function Project() {
  return (
    <div className=' w-full h-full flex flex-col bg-gray-200'>
      <ProjectHeader></ProjectHeader>
      <div className=' h-full w-full grid xl:grid-cols-2 grid-cols-1 xl:grid-rows-2 gap-4 flex-1 p-5 overflow-y-auto'>
        <div className='grid grid-cols-2 gap-4'>
          <ProjectContainer title='Project Address'>
            <div className='h-full w-full flex flex-col gap-3 items-center justify-center '>
              <IconEmpty className='w-20 h-20 fill-blueColor'></IconEmpty>
              <h3 className='font-medium'>No Information</h3>
            </div>
          </ProjectContainer>
          <ProjectContainer title='Weather'>
            <WeatherCard></WeatherCard>
          </ProjectContainer>
        </div>
        <ProjectContainer title='Project Design Issues'>
          <div className='h-full w-full flex flex-col gap-3 items-center justify-center '>
            <IconEmpty className='w-20 h-20 fill-blueColor'></IconEmpty>
            <h3 className='font-medium'>No Issues</h3>
          </div>
        </ProjectContainer>
        <ProjectContainer title='Project Issues'>
          <div className='h-full w-full flex flex-col gap-3 items-center justify-center '>
            <IconEmpty className='w-20 h-20 fill-blueColor'></IconEmpty>
            <h3 className='font-medium'>No Issues</h3>
          </div>
        </ProjectContainer>
        <ProjectContainer title='Design Packages'>
          <div className='h-full w-full flex flex-col gap-3 items-center justify-center '>
            <IconEmpty className='w-20 h-20 fill-blueColor'></IconEmpty>
            <h3 className='font-medium'>No Packages</h3>
          </div>
        </ProjectContainer>
      </div>
    </div>
  )
}
