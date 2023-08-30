/* eslint-disable jsx-a11y/click-events-have-key-events */
import FolderOpenOutlinedIcon from '@mui/icons-material/FolderOpenOutlined'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import { useState } from 'react'
import { FolderType } from 'src/types/folder.type'

export default function FolderComponent({ folder }: { folder: FolderType }) {
  const [open, setOpen] = useState<boolean>(false)
  return (
    /* eslint-disable jsx-a11y/no-static-element-interactions */
    <div className='pl-5 pt-3 transition-all duration-200 ease-linear'>
      <div className='flex items-center gap-2 cursor-pointer justify-between'>
        <div className='flex items-center gap-2 ' onClick={() => setOpen(!open)}>
          <FolderOpenOutlinedIcon className={`${open ? 'text-primary-900' : 'text-gray-800'}`}></FolderOpenOutlinedIcon>
          <span className={`${open ? 'text-primary-900 font-medium' : 'text-gray-800'}`}>{folder.folder_name}</span>
        </div>
        {open && (
          <MoreHorizIcon className={`mr-5 ${open ? 'text-primary-900 font-medium' : 'text-gray-800'}`}></MoreHorizIcon>
        )}
      </div>
      {/* <div className='flex flex-col ml-[60px] gap-[4px]'>
        {open &&
          folder.files &&
          folder.files.length > 0 &&
          folder.files.map((file) => (
            <span key={file._id} className='text-base cursor-pointer hover:text-primary-600'>
              {file.file_name}
            </span>
          ))}
      </div> */}
    </div>
  )
}
