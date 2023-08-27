import { useTitle } from 'react-use'
import { ProjectComponentArchived } from '../../components/ProjectsComponent'

export default function ProjectArchived() {
  useTitle('Project Archived')
  return (
    <div className=' w-full h-full flex flex-col bg-gray-100'>
      {/* <ProjectHeader></ProjectHeader> */}
      <div className=' h-full w-full grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 flex-1 p-5 overflow-y-auto'>
        {Array(30)
          .fill(0)
          .map((_, index) => (
            <>
              <ProjectComponentArchived key={index}></ProjectComponentArchived>
            </>
          ))}
      </div>
    </div>
  )
}
