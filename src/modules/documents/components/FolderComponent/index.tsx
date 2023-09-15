/* eslint-disable jsx-a11y/click-events-have-key-events */
import FolderOpenOutlinedIcon from '@mui/icons-material/FolderOpenOutlined'
import FolderOpenTwoToneIcon from '@mui/icons-material/FolderOpenTwoTone'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import { FolderType } from 'src/types/folder.type'
import PopoverModifyFolder from '../PopoverModifyFolder'
import { useState } from 'react'

export default function FolderComponent({
  folder,
  openFolderId,
  setOpenFolderId
}: {
  folder: FolderType
  openFolderId: string
  setOpenFolderId: React.Dispatch<React.SetStateAction<string>>
}) {
  const [anchorEl, setAnchorEl] = useState(null)
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleClickMenu = (event: any) => {
    setAnchorEl(event.currentTarget)
  }

  return (
    /* eslint-disable jsx-a11y/no-static-element-interactions */
    <div className='pl-5 pt-3 transition-all duration-200 ease-linear'>
      <div className='flex items-center gap-2 cursor-pointer justify-between'>
        <div className='flex items-center gap-2 ' onClick={() => setOpenFolderId(folder._id.toString())}>
          {openFolderId !== folder._id.toString() && (
            <FolderOpenOutlinedIcon className={'text-gray-800'}></FolderOpenOutlinedIcon>
          )}
          {openFolderId === folder._id.toString() && (
            <FolderOpenTwoToneIcon className='text-primary-900 '></FolderOpenTwoToneIcon>
          )}
          <span
            className={`${
              openFolderId === folder._id.toString()
                ? 'text-primary-900 font-medium min-w-[86px] text-sm'
                : 'text-gray-800 text-sm'
            }`}
          >
            {folder.folder_name}
          </span>
        </div>
        {openFolderId === folder._id.toString() && (
          <span onClick={handleClickMenu}>
            <MoreHorizIcon className={`mr-5 text-primary-900 font-medium`}></MoreHorizIcon>
          </span>
        )}
      </div>
      <PopoverModifyFolder folder={folder} anchorElement={anchorEl} handleClose={handleClose}></PopoverModifyFolder>
    </div>
  )
}
