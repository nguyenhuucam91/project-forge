import CreateProject from '../../components/CreateProject'
import ProjectsComponent from '../../components/ProjectsComponent'
import { url } from 'src/config/url'
import { useNavigate } from 'react-router'
import { useState } from 'react'
import { useTitle } from 'react-use'
import { ButtonPrimary } from 'src/components/ButtonComponent'
import queryKeys from 'src/config/queryKeys'
import { useQuery } from 'react-query'
import projectServices from '../../services/project.service'
import { ProjectSkeleton } from 'src/components/Skeleton'

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

  const {
    data: projects,
    isLoading,
    isSuccess
  } = useQuery({
    queryKey: [queryKeys.projects],
    queryFn: projectServices.getListProject
  })
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
          <span className='text-sm border-r-2 border-r-primary-900 pr-2 '>20 Current Project</span>
          <button onClick={handleMoveToArchived} className='text-primary-800 text-sm pl-2 font-medium'>
            View Archived
          </button>
        </div>
      </div>
      <div className=' h-full w-full grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 flex-1 p-5 overflow-y-auto'>
        {isLoading &&
          Array(20)
            .fill(1)
            .map((_, i) => <ProjectSkeleton key={i}></ProjectSkeleton>)}

        {isSuccess && projects && (
          <>
            {projects.map((project, index) => (
              <>
                <ProjectsComponent key={index} project={project}></ProjectsComponent>
              </>
            ))}
          </>
        )}
      </div>
      <CreateProject open={openCreateProject} handleClose={() => setOpenCreateProject(false)}></CreateProject>
    </div>
  )
}
