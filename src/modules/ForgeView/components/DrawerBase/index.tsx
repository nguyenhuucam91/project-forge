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
      className={`absolute left-[60px] w-[300px] z-[19] bg-white shadow-lg transition delay-300 ease-out ${
        !open ? '-translate-x-[300px]' : ''
      }`}
      style={{ height: 'calc( 100% - 58px)' }}
    >
      <button onClick={handleClose} className=' absolute top-1 right-1'>
        <CloseOutlinedIcon></CloseOutlinedIcon>
      </button>
      {children}
    </div>
  )
}
