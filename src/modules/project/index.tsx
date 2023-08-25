import { useTitle } from 'react-use'
import ProjectsComponent from './components/ProjectsComponent'
import { useQuery } from 'react-query'
import queryKeys from 'src/config/queryKeys'
import projectServices from './services/project.service'
import { ProjectSkeleton } from 'src/components/Skeleton'

export default function Projects() {
  useTitle('Projects')
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
      {/* <ProjectHeader></ProjectHeader> */}

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
    </div>
  )
}
