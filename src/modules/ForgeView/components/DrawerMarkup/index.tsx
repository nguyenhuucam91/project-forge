import React from 'react'
import DrawerBase from '../DrawerBase'

type DrawerType = {
  handleClose: () => void
  open: boolean
}

export default function DrawerMarkup({ open, handleClose }: DrawerType) {
  return (
    <DrawerBase open={open} handleClose={handleClose}>
      <div className='h-full w-full'>
        <div className='text-lg text-text_primary font-medium ml-3 border-b w-full'>
          <span>Markups</span>
        </div>

        <div></div>
      </div>
    </DrawerBase>
  )
}
