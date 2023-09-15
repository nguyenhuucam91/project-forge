import React, { useState } from 'react'
import { ReactComponent as IconDotMenu } from '../icons/icon-dot-menu.svg'
import { useNavigate } from 'react-router'
import { format } from 'react-string-format'
import { url } from 'src/config/url'
import PopoverComponent from 'src/components/PopoverComponent'
import { MenuItem } from '@mui/material'
import ProjectType from 'src/types/project.type'
import SettingProject from '../SettingProject'

export default function ProjectComponent({ project }: { project: ProjectType }) {
  const navigate = useNavigate()
  const [anchorElMenu, setAnchorElMenu] = React.useState(null)
  const [showSetting, setShowSetting] = useState(false)

  const handleCloseUserMenu = () => {
    setAnchorElMenu(null)
  }

  const handleOpenUserMenu = (event: any) => {
    setAnchorElMenu(event.currentTarget)
  }
  const handleGoToProject = () => {
    navigate(format(url.web.project.projectStringFormat, project._id))
    console.log('🚀 ~ file: ProjectComponent.tsx:25 ~ handleGoToProject ~ project._id:', project._id)
    setAnchorElMenu(null)
  }

  return (
    <div className='w-full h-[200px] rounded-2xl shadow-lg bg-white p-5 flex flex-col justify-between'>
      <div className='flex gap-3'>
        <div className='w-10 h-10 bg-primary-200 rounded-md'>
          {project?.project_image && (
            <img
              crossOrigin='anonymous'
              src={project?.project_image}
              alt={project?.project_name}
              className='h-full w-full rounded-md object-cover'
            ></img>
          )}
        </div>
        <div className='flex flex-col gap-[2px] items-start justify-center flex-1'>
          <span className='font-medium text-base leading-[18px] text-text_primary '>{project.project_name}</span>
          <span className='font-medium text-sm leading-[18px] text-text_secondary'>
            {project?.update_at?.toString().replace('T', ' ').replace('Z', '').slice(0, 16)}
          </span>
        </div>
        <button onClick={handleOpenUserMenu}>
          <IconDotMenu className='text-primary-800 cursor-pointer'></IconDotMenu>
        </button>
        <PopoverComponent anchorElement={anchorElMenu} handleClose={handleCloseUserMenu}>
          <MenuItem
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
            <span className='hover:bg-primary-50'>Open Project</span>
          </MenuItem>
        </PopoverComponent>
      </div>
      <div className=' flex items-center justify-between'>
        <div className='space-y-[10px]'>
          <span className='font-medium text-sm leading-[18px] text-text_secondary'>Shared Users</span>
          {project?.shared_users && project?.shared_users.length > 5 && (
            <div className='flex gap-2'>
              <div className='w-[36px] h-[36px] bg-primary-50 rounded-xl'>
                <img
                  src={project.shared_users[0].avatar}
                  alt='avatar'
                  className='w-[36px] h-[36px]  rounded-xl object-cover border-[2px] border-primary-600'
                />
              </div>
              <div className='w-[36px] h-[36px] bg-primary-100 rounded-xl -ml-5'>
                <img
                  src={project.shared_users[1].avatar}
                  alt='avatar'
                  className='w-[36px] h-[36px]  rounded-xl object-cover border-[2px] border-primary-600'
                />
              </div>
              <div className='w-[36px] h-[36px] bg-primary-200 rounded-xl -ml-5'>
                <img
                  src={project.shared_users[2].avatar}
                  alt='avatar'
                  className='w-[36px] h-[36px]  rounded-xl object-cover border-[2px] border-primary-600'
                />
              </div>
              <div className='w-[36px] h-[36px] bg-primary-300 rounded-xl -ml-5'>
                <img
                  src={project.shared_users[3].avatar}
                  alt='avatar'
                  className='w-[36px] h-[36px]  rounded-xl object-cover border-[2px] border-primary-600'
                />
              </div>
              <div className='w-[36px] h-[36px] bg-primary-400 rounded-xl -ml-5 justify-center flex items-center'>
                <span className='font-medium text-sm leading-[18px] text-white'>
                  +{project?.shared_users.length - 5}
                </span>
              </div>
            </div>
          )}
          {project?.shared_users !== undefined &&
            project?.shared_users.length <= 5 &&
            project?.shared_users.length !== 0 && (
              <div className='flex gap-2 ml-5'>
                {Array(project?.shared_users.length)
                  .fill(0)
                  .map((_, i) => {
                    console.log(project!.shared_users)
                    return (
                      <div className='w-[36px] h-[36px] bg-primary-900 rounded-xl -ml-5' key={i}>
                        <img
                          src={(project?.shared_users[i] as any)?.avatar}
                          alt='avatar'
                          className='w-[36px] h-[36px] rounded-xl object-cover border-[2px] border-primary-600'
                        />
                      </div>
                    )
                  })}
              </div>
            )}
          {project?.shared_users?.length === 0 && (
            <div className='w-[36px] h-[36px] bg-gray-400 rounded-xl ml-5 justify-center flex items-center'>
              <span className='font-medium text-sm leading-[18px] text-white'>0</span>
            </div>
          )}
        </div>
        <div className='flex-col flex gap-[10px] items-center justify-start'>
          <span className='font-medium text-sm leading-[18px] text-text_secondary'>Mask up</span>
          <div className='bg-primary-600 rounded-xl py-2 px-2'>
            <span className='font-medium text-sm leading-[18px] text-white'>+10</span>
          </div>
        </div>
        <div className='flex-col flex gap-[10px] items-center justify-start'>
          <span className='font-medium text-sm leading-[18px] text-text_secondary'>Issues</span>
          <div className='bg-orange-400 rounded-xl py-2 px-2'>
            <span className='font-medium text-sm leading-[18px] text-white'>+10</span>
          </div>
        </div>
      </div>
      <SettingProject
        project={project}
        open={showSetting}
        handleClose={() => setShowSetting(false)}
        handleOK={() => {}}
      ></SettingProject>
    </div>
  )
}
