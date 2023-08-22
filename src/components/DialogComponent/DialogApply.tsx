import { ReactNode } from 'react'
import Dialog from '@mui/material/Dialog'
import { Button } from '@mui/material'

interface DialogApplyType {
  open: boolean
  handleOK: () => void
  handleClose: () => void
  handleNotOk: () => void
  title: string
  children: ReactNode
  width?: number
}
export default function DialogApply({ open, handleOK, handleNotOk, handleClose, title, children }: DialogApplyType) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <div className='rounded min-w-[500px]'>
        {/* title */}
        <div className='px-4 h-11  flex items-center'>
          <h3 className='text-lg font-bold'>{title}</h3>
        </div>

        {/* content */}
        <div className='px-8 py-6 w-full border-y flex justify-center items-center'>{children}</div>
        {/* action */}
        <div className=' p-4 flex flex-row-reverse items-center gap-4'>
          <Button onClick={handleClose}>キャンセル</Button>
          <Button onClick={handleNotOk}>保存しない</Button>
          <Button onClick={handleOK}>保存</Button>
        </div>
      </div>
    </Dialog>
  )
}
