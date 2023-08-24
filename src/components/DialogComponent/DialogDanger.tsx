import { ReactNode } from 'react'
import Dialog from '@mui/material/Dialog'
import { ReactComponent as IconDanger } from './icons/icon-danger.svg'
import { ButtonPrimary, ButtonSecondary } from '../ButtonComponent'

interface DialogDangerType {
  open: boolean
  handleOK: () => void
  handleClose: () => void
  children: ReactNode
}

export default function DialogDanger({ open, handleOK, handleClose, children }: DialogDangerType) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <div className='rounded min-w-[500px]'>
        {/* title */}
        <div className='w-full h-3 bg-red-600'></div>

        {/* content */}
        <div className='px-8 py-6 w-full border-y flex justify-start items-center gap-5'>
          <IconDanger className='w-[70px] h-[70px] text-red-600'></IconDanger>
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
