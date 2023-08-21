import { ReactComponent as IconEmpty } from '../../components/icons/icon-empty.svg'
import ProjectDetailContainer from '../../components/ProjectDetailContainer'
import WeatherCard from '../../components/WeatherCard'

export default function ProjectDetail() {
  return (
    <div className=' w-full flex-1 flex flex-col bg-gray-100'>
      {/* <ProjectHeader></ProjectHeader> */}
      <div className=' w-full grid xl:grid-cols-2 grid-cols-1 xl:grid-rows-2 gap-4 flex-1 p-5 overflow-y-auto'>
        <div className='grid grid-cols-2 gap-4'>
          <ProjectDetailContainer title='Project Address'>
            <div className='h-full w-full flex flex-col gap-3 items-center justify-center '>
              <IconEmpty className='w-20 h-20 fill-primary-800'></IconEmpty>
              <h3 className='font-medium'>No Information</h3>
            </div>
          </ProjectDetailContainer>
          <ProjectDetailContainer title='Weather'>
            <WeatherCard></WeatherCard>
          </ProjectDetailContainer>
        </div>
        <ProjectDetailContainer title='Project Design Issues'>
          <div className='h-full w-full flex flex-col gap-3 items-center justify-center '>
            <IconEmpty className='w-20 h-20 fill-primary-800'></IconEmpty>
            <h3 className='font-medium'>No Issues</h3>
          </div>
        </ProjectDetailContainer>
        <ProjectDetailContainer title='Project Issues'>
          <div className='h-full w-full flex flex-col gap-3 items-center justify-center '>
            <IconEmpty className='w-20 h-20 fill-primary-800'></IconEmpty>
            <h3 className='font-medium'>No Issues</h3>
          </div>
        </ProjectDetailContainer>
        <ProjectDetailContainer title='Design Packages'>
          <div className='h-full w-full flex flex-col gap-3 items-center justify-center '>
            <IconEmpty className='w-20 h-20 fill-primary-800'></IconEmpty>
            <h3 className='font-medium'>No Packages</h3>
          </div>
        </ProjectDetailContainer>
      </div>
    </div>
  )
}
