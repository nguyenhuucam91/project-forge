import React from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import PopoverComponent from 'src/components/PopoverComponent'
import { Icon, PopoverProps } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import { ReactComponent as IconHome } from './icons/icon-home.svg'
import { ReactComponent as IconDocument } from './icons/icon-document.svg'
import { matchPath, useLocation, useParams } from 'react-router'
import { routers } from 'src/config/routers'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { useNavigate } from 'react-router-dom'
import { format } from 'react-string-format'

export default function ProjectHeader() {
  const [anchorMenu, setAnchorMenu] = React.useState<PopoverProps['anchorEl'] | undefined | null>()
  const { pathname } = useLocation()
  const { id } = useParams()
  const navigate = useNavigate()
  const isProjectPath = matchPath(routers.web.project.project, pathname)

  const handleNavigateHome = () => {
    console.log(format(routers.web.project.projectStringFormat, id as string))
    console.log('🚀 ~ file: index.tsx:23 ~ handleNavigateHome ~ id:', id)

    navigate(format(routers.web.project.projectStringFormat, id as string))
  }

  const handleNavigateDocument = () => {
    navigate(format(routers.web.documents.documentStringFormat, id as string))
  }
  return (
    <div>
      {/* Header */}
      <div className='flex bg-blueColor h-12 items-center pl-6 gap-4'>
        <MenuIcon onClick={(e) => setAnchorMenu(e.currentTarget)} className='text-white cursor-pointer'></MenuIcon>
        <PopoverComponent
          anchorElement={anchorMenu}
          handleClose={() => {
            setAnchorMenu(null)
          }}
        >
          <div className='flex flex-wrap gap-2 p-[10px]'>
            <div
              className={`flex flex-col gap-3 hover:border hover:border-blueColor rounded-lg border border-transparent p-5 items-center justify-around w-[150px] cursor-pointer relative select-none ${
                isProjectPath ? `border-blueColor` : ''
              }`}
              onClick={handleNavigateHome}
            >
              {isProjectPath ? (
                <CheckCircleIcon className='text-blueColor absolute -top-2 -right-2 bg-white'></CheckCircleIcon>
              ) : null}
              <IconHome className='w-8 h-8 '></IconHome>
              <span className='font-medium'>Project Home</span>
            </div>
            <div
              className={`flex flex-col gap-3 hover:border hover:border-blueColor rounded-lg border border-transparent p-5 items-center justify-around w-[150px] cursor-pointer relative select-none ${
                !isProjectPath ? `border-blueColor` : ''
              }`}
              onClick={handleNavigateDocument}
            >
              {!isProjectPath ? (
                <CheckCircleIcon className='text-blueColor absolute -top-2 -right-2 bg-white'></CheckCircleIcon>
              ) : null}
              <IconDocument className='w-8 h-8' />
              <span className='font-medium'>Documents</span>
            </div>
          </div>
        </PopoverComponent>
        <h2 className='text-xl text-white font-medium '>{isProjectPath ? `Project Home` : `Documents Manager`}</h2>
      </div>
      <div className='flex p-[20px] bg-white items-center justify-between'>
        <div className='flex items-center gap-3'>
          <img
            src='https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
            alt='company logo'
            className='w-[80px] h-[80px] rounded-md'
          ></img>
          <div className='flex flex-col justify-around h-full'>
            {/* company name */}
            <span className='text-base font-normal text-gray-400'>Solid BIM</span>
            {/* project name */}
            <span className='text-2xl font-medium text-gray-600'>001-VinHome</span>
            {/* project time */}
            <span className='text-sm font-normal text-gray-400 mt-2'>
              Project Dates: {`2023-01`} - {`2024-01`}
            </span>
          </div>
        </div>
        {/* company img */}
        <img
          src='https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
          alt='company logo'
          className='w-[80px] h-[80px] rounded-md'
        ></img>
      </div>
    </div>
  )
}