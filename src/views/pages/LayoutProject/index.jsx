import React from 'react'
import { Outlet } from 'react-router'
import { ReactComponent as IconChevron } from './icons/icon-chevron.svg'
import SearchComponent from '../../../components/SearchComponent'
import PopoverComponent from '../../../components/PopoverComponent'
import CompanyItem from './components/CompanyItem'
import ProjectItem from './components/ProjectItem'
import AvatarComponent from './components/AvatarComponent'
import ProjectHeader from 'src/modules/project/components/ProjectHeader'

export default function LayoutProject() {
  const [anchorElProject, setAnchorElProject] = React.useState(null)

  const handleOpenProject = (event) => {
    setAnchorElProject(event.currentTarget)
  }

  const handleCloseProject = () => {
    setAnchorElProject(null)
  }

  return (
    <div className='h-full'>
      <div className='fixed w-screen px-[36px] h-[58px] z-10 flex items-center justify-between shadow-sm shadow-primary-300 bg-white'>
        <div className='flex items-center'>
          <a href='/'>
            <img
              srcSet='https://www.autodesk.com/bim-360/app/themes/bim360/assets/img/logos/nav-logo-desktop.png 1x, https://www.autodesk.com/bim-360/app/themes/bim360/assets/img/logos/nav-logo-desktop@2x.png 2x, https://www.autodesk.com/bim-360/app/themes/bim360/assets/img/logos/nav-logo-desktop@3x.png 3x'
              alt='logo'
            ></img>
          </a>
          {/* Company Name */}
          <button
            className='flex items-center gap-1 ml-2 border-b-primary-300 border-b-2 cursor-pointer hover:border-b-blurColor '
            onClick={handleOpenProject}
          >
            <span className='text-base font-medium select-none '>Company Name</span>
            <span className=' w-5 h-5'>
              <IconChevron className=' w-5 h-5'></IconChevron>
            </span>
            {/* Project Name */}
            <span className='text-base font-medium select-none'>Project Name</span>
            <span className=' w-5 h-5 '>
              <IconChevron className=' w-5 h-5 rotate-90'></IconChevron>
            </span>
          </button>
          <PopoverComponent anchorElement={anchorElProject} handleClose={handleCloseProject}>
            <div className='w-[500px] h-[500px] p-[20px]'>
              <SearchComponent placeholder='Search all projects'></SearchComponent>
              <CompanyItem></CompanyItem>
              <h3 className='capitalize font-medium mb-2'>Project Name</h3>
              <div className='border rounded-md p-2 flex flex-col gap-2 max-h-[280px] overflow-y-auto scrollbar-thumb-primary-300 scrollbar-track-primary-50 scrollbar-thin scrollbar-track-rounded-full scrollbar-thumb-rounded-full'>
                <ProjectItem
                  imgSrc='https://images.unsplash.com/photo-1622612063021-116cc3407145?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
                  projectName='001-VinHome'
                  isActive
                  handleClose={handleCloseProject}
                ></ProjectItem>
                {Array(10)
                  .fill(0)
                  .map((index) => {
                    return (
                      <ProjectItem
                        key={index}
                        imgSrc='https://images.unsplash.com/photo-1622612063021-116cc3407145?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
                        projectName='001-VinHome'
                        handleClose={handleCloseProject}
                      ></ProjectItem>
                    )
                  })}
              </div>
            </div>
          </PopoverComponent>
        </div>
        <AvatarComponent></AvatarComponent>
      </div>
      <div className='w-full h-[58px]'></div>
      <div className='flex flex-col overflow-hidden h-[calc(100vh-58px)]'>
        <ProjectHeader></ProjectHeader>
        <Outlet></Outlet>
      </div>
    </div>
  )
}
