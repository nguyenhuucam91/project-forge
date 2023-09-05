import React, { useState } from 'react'
import { ReactComponent as IconDotMenu } from '../icons/icon-dot-menu.svg'
import { useNavigate } from 'react-router'
import { format } from 'react-string-format'
import { url } from 'src/config/url'
import PopoverComponent from 'src/components/PopoverComponent'
import { MenuItem } from '@mui/material'
import ProjectType from 'src/types/project.type'
import SettingProject from '../SettingProject'
import { useArchiveProject } from '../../hook/useModifyProject'
import useRefreshQuery from 'src/hook/useRefreshQuery'
import queryKeys from 'src/config/queryKeys'

export default function ProjectComponentAdmin({ project }: { project: ProjectType }) {
  const navigate = useNavigate()
  const [anchorElMenu, setAnchorElMenu] = React.useState(null)
  const [showSetting, setShowSetting] = useState(false)
  const { archiveProject } = useArchiveProject()
  const { refreshQuery } = useRefreshQuery([queryKeys.projects.listActive])

  const handleCloseUserMenu = () => {
    setAnchorElMenu(null)
  }

  const handleOpenUserMenu = (event: any) => {
    setAnchorElMenu(event.currentTarget)
  }
  const handleGoToProject = () => {
    navigate(format(url.web.project.projectStringFormat, project._id))
    setAnchorElMenu(null)
  }

  const handleArchivedProject = async () => {
    archiveProject(project._id, refreshQuery)
    setAnchorElMenu(null)
  }

  const handleSettingProject = () => {
    setShowSetting(true)
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
          <MenuItem
            onClick={handleSettingProject}
            sx={{
              ':hover': {
                color: '#206bc4',
                backgroundColor: '#E6F7FF',
                fontWeight: '500'
              }
            }}
            className='hover:bg-primary-50'
          >
            <span className='hover:bg-primary-50'>Setting Project</span>
          </MenuItem>
          <MenuItem
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
            <span className='hover:bg-primary-50'>Archived Project</span>
          </MenuItem>
        </PopoverComponent>
      </div>
      <div className=' flex items-center justify-between'>
        <div className='space-y-[10px]'>
          <span className='font-medium text-sm leading-[18px] text-text_secondary'>Shared Users</span>
          {project?.shared_users && project?.shared_users.length > 5 && (
            <div className='flex gap-2'>
              <div className='w-[36px] h-[36px] bg-primary-50 rounded-xl'></div>
              <div className='w-[36px] h-[36px] bg-primary-100 rounded-xl -ml-5'></div>
              <div className='w-[36px] h-[36px] bg-primary-200 rounded-xl -ml-5'></div>
              <div className='w-[36px] h-[36px] bg-primary-300 rounded-xl -ml-5'></div>
              <div className='w-[36px] h-[36px] bg-primary-400 rounded-xl -ml-5 justify-center flex items-center'>
                <span className='font-medium text-sm leading-[18px] text-white'>
                  +{project?.shared_users.length - 5}
                </span>
              </div>
            </div>
          )}
          {project?.shared_users && project?.shared_users.length <= 5 && project?.shared_users.length !== 0 && (
            <div className='flex gap-2'>
              <div className='w-[36px] h-[36px] bg-primary-50 rounded-xl'></div>
              {Array(project?.shared_users.length - 1)
                .fill(0)
                .map((_, i) => (
                  <div className='w-[36px] h-[36px] bg-primary-100 rounded-xl -ml-5' key={i}></div>
                ))}
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
        open={showSetting}
        handleClose={() => setShowSetting(false)}
        handleOK={() => {}}
        project={project}
      ></SettingProject>
    </div>
  )
}
