import { FolderType } from 'src/types/folder.type'
import FolderComponent from '../FolderComponent'
import { Button } from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import { useState } from 'react'
// import PopoverAddNewFolder from '../PopoverAddNewFolder'
import DialogCreateFolder from '../DialogCreateFolder'

export default function DocumentNavbar({
  openFolderId,
  setOpenFolderId,
  folders
}: {
  openFolderId: string
  setOpenFolderId: React.Dispatch<React.SetStateAction<string>>
  folders: FolderType[]
}) {
  // const [anchorEl, setAnchorEl] = useState(null)
  const [isCreateProject, setIsCreateProject] = useState(false)

  // const handleClose = () => {
  //   setAnchorEl(null)
  // }

  const handleOpenFolder = () => {
    // setAnchorEl(event.currentTarget)
    setIsCreateProject(true)
  }
  const handleGotoTrash = () => {}

  return (
    <div className='w-full h-full bg-white rounded-md shadow-lg border hidden xl:block relative '>
      <div className='h-[50px] border-b-[2px] flex justify-center items-center font-medium text-primary-900'>
        Documents
      </div>
      <div className='text-center mt-4 pb-4 border-b-[2px]'>
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
      <DialogCreateFolder
        open={isCreateProject}
        handleClose={() => {
          setIsCreateProject(false)
        }}
      ></DialogCreateFolder>
      {/* <PopoverAddNewFolder anchorElement={anchorEl} handleClose={handleClose}></PopoverAddNewFolder> */}
      <div className='text-center absolute bottom-5 w-full'>
        <Button
          onClick={handleGotoTrash}
          variant='outlined'
          sx={{ height: '36px', minWidth: '26px', marginLeft: '6px', textTransform: 'none' }}
        >
          <DeleteOutlineOutlinedIcon sx={{ margin: '0px' }} /> <span className='ml-2'>Trash</span>
        </Button>
      </div>
    </div>
  )
}
