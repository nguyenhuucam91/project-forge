import { MenuItem, PopoverProps } from '@mui/material'
import PopoverComponent from 'src/components/PopoverComponent'

type PopoverType = {
  handleClose: () => void
  anchorElement: PopoverProps['anchorEl'] | undefined | null
}

export default function PopoverAddNewFile({ anchorElement, handleClose }: PopoverType) {
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
        <span className='hover:bg-primary-50'>Upload file</span>
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
        <span className='hover:bg-primary-50'>Upload files</span>
      </MenuItem>
    </PopoverComponent>
  )
}
