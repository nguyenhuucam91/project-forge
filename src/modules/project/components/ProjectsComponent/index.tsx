import React from 'react'
import { ReactComponent as IconDotMenu } from '../icons/icon-dot-menu.svg'
import { matchPath, useLocation, useNavigate } from 'react-router'
import { format } from 'react-string-format'
import { routers } from 'src/config/routers'
import PopoverComponent from 'src/components/PopoverComponent'
import { MenuItem } from '@mui/material'

export default function ProjectsComponent() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  // const handleNavigateProject = () => {
  //   navigate(format(routers.web.project.projectDetail, '1'))
  // }
  const isProjectsArchivedPath = routers.web.project.projectsArchived === pathname
  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }
  const [anchorElUser, setAnchorElUser] = React.useState(null)

  const handleOpenUserMenu = (event: any) => {
    setAnchorElUser(event.currentTarget)
  }
  const handleGoToProject = () => {
    if (isProjectsArchivedPath) {
      //Active project
    } else {
      //open project
      navigate(format(routers.web.project.projectDetail, '1'))
    }

    setAnchorElUser(null)
  }

  const handleArchivedProject = async () => {
    if (isProjectsArchivedPath) {
      //Delete Project
    } else {
      //Archive project
    }
    setAnchorElUser(null)
  }
  return (
    <div className='w-full h-[200px] rounded-2xl shadow-lg bg-white p-7 flex flex-col justify-between'>
      <div className='flex gap-3'>
        <div className='w-10 h-10 bg-primary-200 rounded-md'></div>
        <div className='flex flex-col gap-[2px] items-start justify-center flex-1'>
          <span className='font-medium text-base leading-[18px] text-text_primary '>Projects 1</span>
          <span className='font-medium text-sm leading-[18px] text-text_secondary'>Sep 25, 2022, 13:25 PM</span>
        </div>
        <button onClick={handleOpenUserMenu}>
          <IconDotMenu className='text-primary-800 cursor-pointer'></IconDotMenu>
        </button>
        <PopoverComponent anchorElement={anchorElUser} handleClose={handleCloseUserMenu}>
          {/* {settings.map((setting) => (
          <MenuItem
            key={setting}
            onClick={handleCloseUserMenu}
            sx={{
              ':hover': {
                color: '#206bc4',
                backgroundColor: '#E6F7FF',
                fontWeight: '500'
              }
            }}
            className='hover:bg-primary-50'
          >
            <span className='hover:bg-primary-50'>{setting}</span>
          </MenuItem>
        ))} */}

          <MenuItem
            key={'Profile'}
            onClick={handleGoToProject}
            sx={{
              ':hover': {
                color: '#206bc4',
                backgroundColor: '#E6F7FF',
                fontWeight: '500'
              }
            }}
            className='hover:bg-primary-50'
          >
            <span className='hover:bg-primary-50'>{!isProjectsArchivedPath ? 'Open Project' : 'Active project'}</span>
          </MenuItem>
          <MenuItem
            key={'Logout'}
            onClick={handleArchivedProject}
            sx={{
              ':hover': {
                color: '#206bc4',
                backgroundColor: '#E6F7FF',
                fontWeight: '500'
              }
            }}
            className='hover:bg-primary-50'
          >
            <span className='hover:bg-primary-50'>
              {!isProjectsArchivedPath ? 'Archived Project' : 'Delete project'}
            </span>
          </MenuItem>
        </PopoverComponent>
      </div>
      <div className=' flex items-center justify-between'>
        <div className='space-y-[10px]'>
          <span className='font-medium text-sm leading-[18px] text-text_secondary'>Shared Users</span>
          <div className='flex gap-2'>
            <div className='w-[36px] h-[36px] bg-primary-50 rounded-xl'></div>
            <div className='w-[36px] h-[36px] bg-primary-100 rounded-xl -ml-5'></div>
            <div className='w-[36px] h-[36px] bg-primary-200 rounded-xl -ml-5'></div>
            <div className='w-[36px] h-[36px] bg-primary-300 rounded-xl -ml-5'></div>
            <div className='w-[36px] h-[36px] bg-primary-400 rounded-xl -ml-5 justify-center flex items-center'>
              <span className='font-medium text-sm leading-[18px] text-white'>+80</span>
            </div>
          </div>
        </div>
        <div className='space-y-[10px]'>
          <span className='font-medium text-sm leading-[18px] text-text_secondary'>Mask Up</span>
          <div className='bg-primary-600 rounded-xl py-2 px-4'>
            <span className='font-medium text-sm leading-[18px] text-white'>+10</span>
          </div>
        </div>
        <div className='space-y-[10px]'>
          <span className='font-medium text-sm leading-[18px] text-text_secondary'>Issues</span>
          <div className='bg-orange-400 rounded-xl py-2 px-4'>
            <span className='font-medium text-sm leading-[18px] text-white'>+10</span>
          </div>
        </div>
      </div>
    </div>
  )
}
