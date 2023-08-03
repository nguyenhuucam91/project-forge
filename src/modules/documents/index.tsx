import React from 'react'
import ProjectHeader from '../project/components/ProjectHeader'
import DocumentNavbar from './components/DocumentNavbar'
import DocumentTable from './components/DocumentTable'

export default function Documents() {
  return (
    <div className=' w-full h-full flex flex-col bg-gray-200'>
      <ProjectHeader></ProjectHeader>
      <div className=' h-full w-full grid xl:grid-cols-4 grid-cols-1 gap-3 flex-1 p-3'>
        <DocumentNavbar></DocumentNavbar>
        <DocumentTable></DocumentTable>
      </div>
    </div>
  )
}