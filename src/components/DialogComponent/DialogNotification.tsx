import { ReactNode } from 'react'
import Dialog from '@mui/material/Dialog'
import { Button } from '@mui/material'

interface DialogNotificationType {
  open: boolean
  handleOK: () => void
  handleClose: () => void
  title: string
  children: ReactNode
}
export default function DialogNotification({ open, handleClose, title, children }: DialogNotificationType) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <div className='rounded min-w-[500px]'>
        {/* title */}
        <div className='px-4 h-11  flex items-center'>
          <h3 className='text-lg font-bold'>{title}</h3>
        </div>

        {/* content */}
        <div className='px-8 py-6 w-full border-y flex justify-center items-center'>
          <span className='text-base text-center'>{children}</span>
        </div>
        {/* action */}
        <div className=' p-4 flex justify-center items-center gap-4'>
          <Button onClick={handleClose}>OK</Button>
        </div>
      </div>
    </Dialog>
  )
}
