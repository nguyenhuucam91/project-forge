import React from 'react'
import DrawerBase from '../DrawerBase'
import { MarkupType } from 'src/types/markup.type'
import MarkupComponent from '../MarkupComponent'

type DrawerType = {
  handleClose: () => void
  open: boolean
}

const markups: MarkupType[] = [
  {
    _id: '1',
    img: 'https://plus.unsplash.com/premium_photo-1675314768267-b6ac0b096e07?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    status: 'Public',
    user_id: 'Hiep Nguyen',
    update_at: '2023-09-08'
  },
  {
    _id: '2',
    img: 'https://images.unsplash.com/photo-1693560332243-4e6c9cf23f7f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    status: 'Private',
    user_id: 'Hiep Nguyen',
    update_at: '2023-09-08'
  },
  {
    _id: '3',
    img: 'https://images.unsplash.com/photo-1693735017632-dbe1a460f265?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    status: 'Private',
    user_id: 'Hiep Nguyen',
    update_at: '2023-09-08'
  },
  {
    _id: '4',
    img: 'https://plus.unsplash.com/premium_photo-1693651294372-dea48a832da6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80',
    status: 'Private',
    user_id: 'Hiep Nguyen',
    update_at: '2023-09-08'
  }
]
export default function DrawerMarkup({ open, handleClose }: DrawerType) {
  return (
    <DrawerBase open={open} handleClose={handleClose}>
      <div className='h-full w-full'>
        <div className='text-lg text-text_primary font-medium ml-4 my-3 w-full'>
          <span>Markups</span>
        </div>
        <div className='text-lg text-text_primary font-medium border-b w-full border-gray-400'></div>

        <div>
          {markups &&
            markups.length > 0 &&
            markups.map((markup) => <MarkupComponent key={markup._id} markup={markup}></MarkupComponent>)}
        </div>
      </div>
    </DrawerBase>
  )
}
