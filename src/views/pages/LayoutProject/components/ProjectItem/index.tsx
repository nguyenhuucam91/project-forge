import React from 'react'
import CheckIcon from '@mui/icons-material/Check'
import { useNavigate } from 'react-router-dom'
import { routers } from 'src/routers/routers'
import { format } from 'react-string-format'

type ProjectItemType = {
  imgSrc: string
  projectName: string
  isActive: boolean
  handleClose: () => void
}
export default function ProjectItem({ imgSrc, projectName, isActive, handleClose }: ProjectItemType) {
  const navigate = useNavigate()
  const handleGotoProject = () => {
    navigate(format(routers.web.project.viewStringFormat, '1', '1'))
    handleClose()
  }
  return (
    <div
      onClick={handleGotoProject}
      className={`w-full py-[10px] px-[20px] flex gap-5 items-center cursor-pointer rounded-lg ${
        isActive ? `bg-blueColor text-white` : `hover:bg-secondaryColor`
      }`}
    >
      <img src={imgSrc} alt='project logo' className='w-[80px] h-[80px] object-cover rounded-lg'></img>
      <div className={`flex flex-col items-start justify-center gap-2 flex-1 `}>
        <span className='text-[18px] font-medium'>{projectName}</span>
        <span className='text-sm font-medium '>Solid BIM</span>
      </div>
      {isActive ? <CheckIcon className='text-white' /> : ``}
    </div>
  )
}
