import { ReactNode } from 'react'
import Dialog from '@mui/material/Dialog'
import { ButtonPrimary, ButtonSecondary } from '../ButtonComponent'

interface DialogConfirmType {
  open: boolean
  handleOK: () => void
  handleClose: () => void
  title: string
  children: ReactNode
  width?: number
}

export default function DialogConfirm({
  open,
  handleOK,
  handleClose,
  title,
  children,
  width = 500
}: DialogConfirmType) {
  return (
    <Dialog open={open} onClose={handleClose} sx={{ zIndex: 1000001 }}>
      <div className='rounded' style={{ maxWidth: `${width}px` }}>
        {/* title */}
        <div className='px-4 h-11 flex items-center'>
          <h3 className='text-lg font-bold'>{title}</h3>
        </div>

        {/* content */}
        <div className='px-8 py-6 w-full border-y flex justify-center items-center'>{children}</div>
        {/* action */}
        <div className=' p-4 flex flex-row-reverse items-center gap-4'>
          <ButtonSecondary onClick={handleClose}>{'キャンセル'}</ButtonSecondary>
          <ButtonPrimary onClick={handleOK}>{'OK'}</ButtonPrimary>
        </div>
      </div>
    </Dialog>
  )
}
