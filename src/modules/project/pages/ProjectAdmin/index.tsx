import CreateProject from '../../components/CreateProject'
import { ProjectComponentAdmin } from '../../components/ProjectsComponent'
import { url } from 'src/config/url'
import { useNavigate } from 'react-router'
import { useState } from 'react'
import { useTitle } from 'react-use'
import { ButtonPrimary } from 'src/components/ButtonComponent'
import { ProjectSkeleton } from 'src/components/Skeleton'
import { useGetProjects } from '../../hook/useGetProjects'

export default function ProjectAdmin() {
  useTitle('Project Admin')
  const [openCreateProject, setOpenCreateProject] = useState(false)

  const navigate = useNavigate()
  const handleMoveToArchived = () => {
    navigate(url.web.project.projectsArchived)
  }

  const handleCreateProject = () => {
    setOpenCreateProject(true)
  }

  const { projects, isLoading, isSuccess } = useGetProjects()

  return (
    <div className=' w-full h-full flex flex-col bg-gray-100'>
      <div className='w-full py-5 px-5 border-b shadow-sm flex flex-col gap-2 bg-white'>
        <div className='flex flex-col gap-1'>
          <span className='text-xl font-medium text-text_primary'>Project Directory</span>
          <span className='text-base font-normal text-text_secondary'>
            The project directory lists all projects in your account.
          </span>
        </div>
        <div>
          <ButtonPrimary onClick={handleCreateProject}>Add Project</ButtonPrimary>
        </div>
        <div className=' mt-1'>
          <span className='text-sm border-r-2 border-r-primary-900 pr-2 '>{projects?.length} Current Project</span>
          <button onClick={handleMoveToArchived} className='text-primary-800 text-sm pl-2 font-medium'>
            View Archived
          </button>
        </div>
      </div>
      <div className=' h-full w-full grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 flex-1 p-5 overflow-y-auto auto-rows-max'>
        {isLoading &&
          Array(20)
            .fill(1)
            .map((_, i) => {
              return <ProjectSkeleton key={i}></ProjectSkeleton>
            })}

        {isSuccess &&
          projects &&
          projects.map((project) => (
            <ProjectComponentAdmin key={project?._id} project={project}></ProjectComponentAdmin>
          ))}
      </div>
      <CreateProject open={openCreateProject} handleClose={() => setOpenCreateProject(false)}></CreateProject>
    </div>
  )
}
