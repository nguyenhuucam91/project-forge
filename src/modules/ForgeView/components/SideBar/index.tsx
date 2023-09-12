import MarkupButton from '../MarkupButton'
import { ReactComponent as IconDelete } from '../../assets/icon_pencil.svg'
import { ReactComponent as IconError } from '../../assets/icon_error.svg'
import { useState } from 'react'
import DrawerMarkup from '../DrawerMarkup'
import DrawerIssues from '../DrawerIssues'

export default function SideBar({ handleLoadMasksUp }: { handleLoadMasksUp: (svg: any, viewPortObject: any) => void }) {
  const [openDrawerMarkup, setOpenDrawerMarkup] = useState(false)
  const [openDrawerIssue, setOpenDrawerIssue] = useState(false)

  return (
    <>
      <div
        className='fixed top-[58px] left-0 w-[60px] z-20 bg-white shadow-lg flex items-center flex-col py-5 gap-4'
        style={{ height: 'calc( 100% - 60px)' }}
      >
        <MarkupButton
          handleOnClick={() => {
            setOpenDrawerMarkup(!openDrawerMarkup)
            setOpenDrawerIssue(false)
          }}
          active={false}
        >
          <IconDelete></IconDelete>
        </MarkupButton>

        <MarkupButton
          handleOnClick={() => {
            setOpenDrawerIssue(!openDrawerIssue)
            setOpenDrawerMarkup(false)
          }}
          active={false}
        >
          <IconError></IconError>
        </MarkupButton>
      </div>
      <DrawerMarkup
        open={openDrawerMarkup}
        handleClose={() => setOpenDrawerMarkup(false)}
        handleLoadMasksUp={handleLoadMasksUp}
      ></DrawerMarkup>

      <DrawerIssues open={openDrawerIssue} handleClose={() => setOpenDrawerIssue(false)}></DrawerIssues>
    </>
  )
}
