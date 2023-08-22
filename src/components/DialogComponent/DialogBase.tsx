import { ReactNode } from 'react'
import Dialog from '@mui/material/Dialog'
import { Button } from '@mui/material'

interface DialogBaseType {
  open: boolean
  handleOK: () => void
  handleClose: () => void
  title: string
  children: ReactNode
  width?: number
}

export default function DialogBase({ open, handleOK, handleClose, title, children, width = 500 }: DialogBaseType) {
  return (
    <Dialog open={open} onClose={handleClose} sx={{ zIndex: 1000001 }}>
      <div className='rounded' style={{ maxWidth: `${width}px` }}>
        {/* title */}
        <div className='px-4 h-11 flex items-center'>
          <h3 className='text-lg font-medium'>{title}</h3>
        </div>

        {/* content */}
        <div className='px-6 py-3 w-full border-y flex justify-center items-center'>{children}</div>
        {/* action */}
        <div className=' p-4 flex flex-row-reverse items-center justify-center gap-4'>
          <Button onClick={handleClose}>キャンセル</Button>
          <Button onClick={handleOK}>OK</Button>
        </div>
      </div>
    </Dialog>
  )
}
