import React from 'react'
import ProjectsComponent from '../../components/ProjectsComponent'

export default function ProjectArchived() {
  return (
    <div className=' w-full h-full flex flex-col bg-gray-100'>
      {/* <ProjectHeader></ProjectHeader> */}
      <div className=' h-full w-full grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 flex-1 p-5 overflow-y-auto'>
        {Array(30)
          .fill(0)
          .map((_, index) => (
            <>
              <ProjectsComponent key={index}></ProjectsComponent>
            </>
          ))}
      </div>
    </div>
  )
}
