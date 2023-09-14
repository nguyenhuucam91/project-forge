import { MenuItem, PopoverProps } from '@mui/material'
import PopoverComponent from 'src/components/PopoverComponent'

type PopoverType = {
  handleClose: () => void
  anchorElement: PopoverProps['anchorEl'] | undefined | null
}

export default function PopoverModifyFolder({ anchorElement, handleClose }: PopoverType) {
  return (
    <PopoverComponent anchorElement={anchorElement} handleClose={handleClose}>
      <MenuItem
        onClick={() => {}}
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
        onClick={() => {}}
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
    </PopoverComponent>
  )
}
