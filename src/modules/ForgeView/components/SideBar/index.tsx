import MarkupButton from '../MarkupButton'
import { ReactComponent as IconDelete } from '../../assets/icon_pencil.svg'
import { ReactComponent as IconError } from '../../assets/icon_error.svg'
import { useState } from 'react'
import DrawerMarkup from '../DrawerMarkup'

export default function SideBar() {
  const [openDrawerMarkup, setOpenDrawerMarkup] = useState(false)

  return (
    <>
      <div
        className='fixed top-[58px] left-0 w-[60px] z-20 bg-white shadow-lg flex items-center flex-col py-5 gap-4'
        style={{ height: 'calc( 100% - 60px)' }}
      >
        <MarkupButton
          handleOnClick={() => {
            setOpenDrawerMarkup(!openDrawerMarkup)
          }}
          active={false}
        >
          <IconDelete></IconDelete>
        </MarkupButton>

        <MarkupButton handleOnClick={() => {}} active={false}>
          <IconError></IconError>
        </MarkupButton>
      </div>
      <DrawerMarkup open={openDrawerMarkup} handleClose={() => setOpenDrawerMarkup(false)}></DrawerMarkup>
    </>
  )
}
