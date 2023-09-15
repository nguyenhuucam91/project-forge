import { MenuItem, PopoverProps } from '@mui/material'
import PopoverComponent from 'src/components/PopoverComponent'
import DialogModifyFolder from '../DialogModifyFolder'
import { useState } from 'react'
import { FolderType } from 'src/types/folder.type'
import DialogDeleteFolder from '../DialogDeleteFolder'

type PopoverType = {
  folder: FolderType
  handleClose: () => void
  anchorElement: PopoverProps['anchorEl'] | undefined | null
}

export default function PopoverModifyFolder({ folder, anchorElement, handleClose }: PopoverType) {
  const [modifyFolder, setModifyFolder] = useState<boolean>(false)
  const [deleteFolder, setDeleteFolder] = useState<boolean>(false)
  return (
    <PopoverComponent anchorElement={anchorElement} handleClose={handleClose}>
      <MenuItem
        onClick={() => {
          setModifyFolder(true)
          handleClose()
        }}
        sx={{
          ':hover': {
            color: '#206bc4',
            backgroundColor: '#E6F7FF',
            fontWeight: '500'
          }
        }}
        className='hover:bg-primary-50'
      >
        <span className='hover:bg-primary-50'>Modify Name</span>
      </MenuItem>

      <MenuItem
        onClick={() => {
          setDeleteFolder(true)
          handleClose()
        }}
        sx={{
          ':hover': {
            color: '#206bc4',
            backgroundColor: '#E6F7FF',
            fontWeight: '500'
          }
        }}
        className='hover:bg-primary-50'
      >
        <span className='hover:bg-primary-50'>Delete Folder</span>
      </MenuItem>
      <DialogModifyFolder
        folder_name={folder.folder_name}
        folder_id={folder._id}
        open={modifyFolder}
        handleClose={() => {
          setModifyFolder(false)
        }}
      ></DialogModifyFolder>

      <DialogDeleteFolder
        open={deleteFolder}
        folder_id={folder._id}
        handleClose={() => {
          setDeleteFolder(false)
        }}
      ></DialogDeleteFolder>
    </PopoverComponent>
  )
}
