import { useTitle } from 'react-use'
import { ProjectComponentArchived } from '../../components/ProjectsComponent'
import { useGetProjectsArchived } from '../../hook/useGetProjects'
import { ProjectSkeleton } from 'src/components/Skeleton'

export default function ProjectArchived() {
  useTitle('Project Archived')
  const { projects, isLoading, isSuccess } = useGetProjectsArchived()
  return (
    <div className=' w-full h-full flex flex-col bg-gray-100'>
      <div className=' h-full w-full grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 flex-1 p-5 overflow-y-auto auto-rows-max mb-8'>
        {isLoading &&
          Array(20)
            .fill(1)
            .map((_, i) => <ProjectSkeleton key={i}></ProjectSkeleton>)}
        {isSuccess &&
          projects &&
          projects.length > 0 &&
          projects.map((project, index) => (
            <>
              <ProjectComponentArchived key={index} project={project}></ProjectComponentArchived>
            </>
          ))}
      </div>
    </div>
  )
}
