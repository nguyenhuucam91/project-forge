import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import { ReactNode } from 'react'
type DrawerType = {
  handleClose: () => void
  open: boolean
  children: ReactNode
}
export default function DrawerBase({ open, handleClose, children }: DrawerType) {
  return (
    <div
      className={`fixed left-[60px] w-[360px] z-[19] bg-white shadow-lg transition delay-300 ease-out ${
        !open ? '-translate-x-[360px]' : ''
      }`}
      style={{ height: 'calc( 100% - 60px)' }}
    >
      <button onClick={handleClose} className=' absolute top-1 right-1 z-20'>
        <CloseOutlinedIcon sx={{ width: '20px' }}></CloseOutlinedIcon>
      </button>
      {children}
    </div>
  )
}
