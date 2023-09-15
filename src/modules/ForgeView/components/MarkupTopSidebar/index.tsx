import TooltipComponent from 'src/components/TooltipComponent'
import MarkupButton from '../MarkupButton'
import { ReactComponent as IconSave } from '../MarkupSidebar/icons/icon-save.svg'
import SelectComponent from 'src/components/SelectComponent'
import { useState } from 'react'

type MarkupSidebarType = {
  handleSaveMasksUp: (status: string) => void
}

export default function MarkupTopSidebar({ handleSaveMasksUp }: MarkupSidebarType) {
  const [status, setStatus] = useState('Public')
  return (
    <div
      id='markupSidebar'
      className='absolute shadow-lg top-[105px] left-1/2 -translate-x-1/2 z-10 flex  gap-3 items-center justify-center rounded-md bg-white px-3 py-2'
    >
      <TooltipComponent title='Status' placement='bottom'>
        <SelectComponent
          value={status}
          options={[
            {
              value: 'Public',
              label: 'Public'
            },
            {
              value: 'Private',
              label: 'Private'
            }
          ]}
          handleChange={(event) => {
            setStatus(event.target.value)
          }}
          sx={{
            fontSize: '14px',
            minWidth: '90px',
            width: '90px',
            '& .MuiSelect-select': { border: 'none', paddingLeft: '10px' },
            '.MuiOutlinedInput-notchedOutline': { border: 0 },
            '.MuiSvgIcon-root': { right: '5px' }
          }}
        ></SelectComponent>
      </TooltipComponent>

      <TooltipComponent title='Save' placement='bottom'>
        <div>
          <MarkupButton handleOnClick={() => handleSaveMasksUp(status)}>
            <IconSave></IconSave>
          </MarkupButton>
        </div>
      </TooltipComponent>
    </div>
  )
}
