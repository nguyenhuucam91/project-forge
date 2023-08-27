import { useTitle } from 'react-use'
import { ProjectSkeleton } from 'src/components/Skeleton'
import { ProjectComponent } from './components/ProjectsComponent'
import { useGetProjects } from './hook/useGetProjects'

export default function Projects() {
  useTitle('Projects')
  const { projects, isLoading, isSuccess } = useGetProjects()

  return (
    <div className=' w-full h-full flex flex-col bg-gray-100'>
      <div className=' h-full w-full grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 flex-1 p-5 overflow-y-auto auto-rows-max'>
        {isLoading &&
          Array(20)
            .fill(1)
            .map((_, i) => <ProjectSkeleton key={i}></ProjectSkeleton>)}
        {isSuccess && projects && projects.length > 0 && (
          <>
            {projects.map((project, index) => (
              <>
                <ProjectComponent key={index} project={project}></ProjectComponent>
              </>
            ))}
          </>
        )}
      </div>
    </div>
  )
}
