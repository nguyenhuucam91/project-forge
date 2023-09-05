import { FolderType } from 'src/types/folder.type'
import FolderComponent from '../FolderComponent'
import { Button } from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { useState } from 'react'
import PopoverAddNewFolder from '../PopoverAddNewFolder'

export default function DocumentNavbar({
  openFolderId,
  setOpenFolderId,
  folders
}: {
  openFolderId: string
  setOpenFolderId: React.Dispatch<React.SetStateAction<string>>
  folders: FolderType[]
}) {
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleOpenFolder = (event: any) => {
    setAnchorEl(event.currentTarget)
  }

  return (
    <div className='w-full h-full bg-white rounded-md shadow-md hidden xl:block'>
      <div className='h-[50px] border-b-[2px] flex justify-center items-center font-medium text-primary-900'>
        Project Folders
      </div>
      <div className='text-center mt-4'>
        <Button
          onClick={handleOpenFolder}
          variant='contained'
          sx={{ height: '36px', minWidth: '26px', marginLeft: '6px', textTransform: 'none' }}
        >
          <AddCircleOutlineIcon sx={{ margin: '0px' }} /> <span className='ml-2'>Add New</span>
        </Button>
      </div>

      {folders &&
        folders.length > 0 &&
        folders.map((folder) => (
          <FolderComponent
            key={folder._id}
            folder={folder}
            openFolderId={openFolderId}
            setOpenFolderId={setOpenFolderId}
          ></FolderComponent>
        ))}
      <PopoverAddNewFolder anchorElement={anchorEl} handleClose={handleClose}></PopoverAddNewFolder>
    </div>
  )
}
