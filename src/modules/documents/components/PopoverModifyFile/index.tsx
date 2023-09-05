import { MenuItem, PopoverProps } from '@mui/material'
import { ReactComponent as IconOpen } from '../../assets/icon-open.svg'
import { ReactComponent as IconDownload } from '../../assets/icon-download.svg'
import { ReactComponent as IconDelete } from '../../assets/icon-delete.svg'
import { ReactComponent as IconLink } from '../../assets/icon-link.svg'
import { ReactComponent as IconRename } from '../../assets/icon-rename.svg'
import { ReactComponent as IconMove } from '../../assets/icon-move.svg'
import PopoverComponent from 'src/components/PopoverComponent'

type PopoverType = {
  handleClose: () => void
  anchorElement: PopoverProps['anchorEl'] | undefined | null
}

export default function PopoverModifyFile({ anchorElement, handleClose }: PopoverType) {
  return (
    <PopoverComponent anchorElement={anchorElement} handleClose={handleClose} sx={{ boxShadow: 'none' }}>
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
        <div className='flex items-center gap-1'>
          <IconOpen></IconOpen>
          <span>Open</span>
        </div>
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
        <div className='flex items-center gap-1'>
          <IconRename></IconRename>
          <span>Rename</span>
        </div>
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
        <div className='flex items-center gap-1'>
          <IconMove></IconMove>
          <span>Move</span>
        </div>
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
        <div className='flex items-center gap-1'>
          <IconLink></IconLink>
          <span>Copy link</span>
        </div>
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
        <div className='flex items-center gap-1'>
          <IconDelete></IconDelete>
          <span>Delete</span>
        </div>
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
        <div className='flex items-center gap-1'>
          <IconDownload></IconDownload>
          <span>Download</span>
        </div>
      </MenuItem>
    </PopoverComponent>
  )
}
