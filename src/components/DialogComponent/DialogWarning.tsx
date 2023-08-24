import { ReactNode } from 'react'
import Dialog from '@mui/material/Dialog'
import { ReactComponent as IconWaring } from './icons/icon-waring.svg'
import { ButtonPrimary, ButtonSecondary } from '../ButtonComponent'

interface DialogWarningType {
  open: boolean
  handleOK: () => void
  handleClose: () => void
  children: ReactNode
}

export default function DialogWarning({ open, handleOK, handleClose, children }: DialogWarningType) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <div className='rounded min-w-[500px]'>
        {/* title */}
        <div className='w-full h-3 bg-yellow-600'></div>
        {/* content */}
        <div className='px-8 py-6 w-full border-y flex justify-start items-center gap-5'>
          <IconWaring className='w-[70px] h-[70px] text-yellow-600'></IconWaring>
          {children}
        </div>
        {/* action */}

        <div className=' p-4 flex flex-row-reverse items-center gap-4'>
          <ButtonSecondary onClick={handleClose}>キャンセル</ButtonSecondary>
          <ButtonPrimary onClick={handleOK}>OK</ButtonPrimary>
        </div>
      </div>
    </Dialog>
  )
}
