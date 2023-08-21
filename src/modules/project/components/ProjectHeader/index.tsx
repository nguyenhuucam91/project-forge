import React from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import PopoverComponent from 'src/components/PopoverComponent'
import { Icon, PopoverProps } from '@mui/material'
import { ReactComponent as IconHome } from './icons/icon-home.svg'
import { ReactComponent as IconDocument } from './icons/icon-document.svg'
import { ReactComponent as IconAdmin } from './icons/icon-admin.svg'
import { matchPath, useLocation, useParams } from 'react-router'
import { routers } from 'src/config/routers'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { useNavigate } from 'react-router-dom'
import { format } from 'react-string-format'
import Button from '@mui/material/Button'
import ProjectDetail from '../../pages/ProjectDetail/ProjectDetail'

export default function ProjectHeader() {
  const [anchorMenu, setAnchorMenu] = React.useState<PopoverProps['anchorEl'] | undefined | null>()
  const { id } = useParams()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  console.log('🚀 ~ file: index.tsx:21 ~ ProjectHeader ~ pathname:', pathname)

  const isProjectsPath = matchPath(routers.web.project.projects, pathname)
  const isDocumentPath = matchPath(routers.web.documents.document, pathname)
  const isAdminPath = matchPath(routers.web.project.projectsAdmin, pathname)
  const isProjectsDetailPath = matchPath(routers.web.project.projectDetail, pathname)
  const isProjectsArchivedPath = routers.web.project.projectsArchived === pathname

  const headerTitle = () => {
    if (isProjectsPath) {
      return 'Project Home'
    }
    if (isDocumentPath) {
      return 'Documents Manager'
    }
    if (isAdminPath) {
      return 'Project Admin'
    }
    if (isProjectsArchivedPath) {
      return 'Project Archived'
    }
    return 'Project Detail'
  }

  const handleNavigateHome = () => {
    navigate(routers.web.project.projects)
  }

  const handleNavigateDocument = () => {
    navigate(format(routers.web.documents.documentStringFormat, id as string))
  }

  const handleNavigateAdmin = () => {
    navigate(routers.web.project.projectsAdmin)
  }

  const handleMoveToArchived = () => {
    navigate(routers.web.project.projectsArchived)
  }
  return (
    <div>
      {/* Header */}
      <div className='flex bg-primary-800 h-12 items-center pl-6 gap-4'>
        <MenuIcon onClick={(e) => setAnchorMenu(e.currentTarget)} className='text-white cursor-pointer'></MenuIcon>
        <PopoverComponent
          anchorElement={anchorMenu}
          handleClose={() => {
            setAnchorMenu(null)
          }}
        >
          <div className='flex flex-wrap gap-2 p-[10px]'>
            <div
              className={`flex flex-col gap-3 hover:border hover:border-primary-800 rounded-lg border border-transparent p-5 items-center justify-around w-[150px] cursor-pointer relative select-none ${
                isProjectsPath ? `border-primary-800` : ''
              }`}
              onClick={handleNavigateHome}
            >
              {isProjectsPath ? (
                <CheckCircleIcon className='text-primary-800 absolute -top-2 -right-2 bg-white'></CheckCircleIcon>
              ) : null}
              <IconHome className='w-8 h-8 '></IconHome>
              <span className='font-medium'>Project Home</span>
            </div>

            {isProjectsDetailPath && (
              <div
                className={`flex flex-col gap-3 hover:border hover:border-primary-800 rounded-lg border border-transparent p-5 items-center justify-around w-[150px] cursor-pointer relative select-none ${
                  isDocumentPath ? `border-primary-800` : ''
                }`}
                onClick={handleNavigateDocument}
              >
                {isDocumentPath ? (
                  <CheckCircleIcon className='text-primary-800 absolute -top-2 -right-2 bg-white'></CheckCircleIcon>
                ) : null}
                <IconDocument className='w-8 h-8' />
                <span className='font-medium'>Documents</span>
              </div>
            )}

            <div
              className={`flex flex-col gap-3 hover:border hover:border-primary-800 rounded-lg border border-transparent p-5 items-center justify-around w-[150px] cursor-pointer relative select-none ${
                isAdminPath ? `border-primary-800` : ''
              }`}
              onClick={handleNavigateAdmin}
            >
              {isAdminPath ? (
                <CheckCircleIcon className='text-primary-800 absolute -top-2 -right-2 bg-white'></CheckCircleIcon>
              ) : null}
              <IconAdmin className='w-8 h-8' />
              <span className='font-medium'>Project Admin</span>
            </div>
          </div>
        </PopoverComponent>

        <h2 className='text-xl text-white font-medium '>{headerTitle()}</h2>
      </div>

      {/* project admin */}
      {isAdminPath && (
        <div className='w-full py-5 px-5 border-b shadow-sm flex flex-col gap-2'>
          <div className='flex flex-col gap-1'>
            <span className='text-xl font-medium text-text_primary'>Project Directory</span>
            <span className='text-base font-normal text-text_secondary'>
              The project directory lists all projects in your account.
            </span>
          </div>
          <div>
            <Button variant='contained'>Add Project</Button>
          </div>
          <div className=' mt-1'>
            <span className='text-sm border-r-2 border-r-primary-900 pr-2 '>20 Current Project</span>
            <button onClick={handleMoveToArchived} className='text-primary-800 text-sm pl-2 font-medium'>
              View Archived
            </button>
          </div>
        </div>
      )}

      {/* project detail */}
      {!isProjectsPath && !isAdminPath && isAdminPath && (
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
      )}
    </div>
  )
}
