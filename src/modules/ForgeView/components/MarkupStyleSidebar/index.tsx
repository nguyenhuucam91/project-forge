import React from 'react'
import MarkupButton from '../MarkupButton'
import { MarkupStyleType } from 'src/type/style.type'
import { ReactComponent as IconBold } from './icons/icon-bold.svg'
import { ReactComponent as IconDelete } from './icons/icon-delete.svg'
import { ReactComponent as IconItalic } from './icons/icon-italic.svg'
import { ReactComponent as IconUp } from './icons/icon-up.svg'
import { ReactComponent as IconDown } from './icons/icon-down.svg'

type MarkupStyleSidebarProps = {
  style: MarkupStyleType
  markup: any
  setStyle: (value: React.SetStateAction<MarkupStyleType>) => void
  handleDeleteMarkup: () => void
}

export default function MarkupStyleSidebar({ markup, style, setStyle, handleDeleteMarkup }: MarkupStyleSidebarProps) {
  const handleFontUp = () => {
    setStyle((prev) => {
      const copyStyle = { ...prev }
      if (markup.type === 'label') {
        copyStyle['font-size'] = copyStyle['font-size'] + 30
      } else {
        copyStyle['stroke-width'] = copyStyle['stroke-width'] + 5
      }
      return copyStyle
    })
  }
  const handleFontDown = () => {
    setStyle((prev) => {
      const copyStyle = { ...prev }
      if (markup.type === 'label') {
        copyStyle['font-size'] = copyStyle['font-size'] - 30
      } else {
        copyStyle['stroke-width'] = copyStyle['stroke-width'] - 5
      }

      return copyStyle
    })
  }

  const handleBold = () => {
    setStyle((prev) => {
      const copyStyle = { ...prev }
      if (copyStyle['font-weight'] === 'normal') {
        copyStyle['font-weight'] = 'bold'
      } else {
        copyStyle['font-weight'] = 'normal'
      }
      return copyStyle
    })
  }

  const handleItalic = () => {
    setStyle((prev) => {
      const copyStyle = { ...prev }
      if (copyStyle['font-style'] === 'normal') {
        copyStyle['font-style'] = 'italic'
      } else {
        copyStyle['font-style'] = 'normal'
      }
      return copyStyle
    })
  }
  return (
    <div
      id='markupStyleSidebar'
      className='absolute shadow-lg top-[12px] left-1/2 -translate-x-1/2 z-10 flex gap-3 items-center justify-center rounded-md invisible bg-white px-3 py-2'
    >
      <MarkupButton handleOnClick={handleFontDown}>
        <IconDown></IconDown>
      </MarkupButton>
      <MarkupButton handleOnClick={handleFontUp}>
        <IconUp></IconUp>
      </MarkupButton>

      <MarkupButton handleOnClick={handleBold}>
        <IconBold></IconBold>
      </MarkupButton>
      <MarkupButton handleOnClick={handleItalic}>
        <IconItalic></IconItalic>
      </MarkupButton>

      <MarkupButton handleOnClick={handleDeleteMarkup}>
        <IconDelete></IconDelete>
      </MarkupButton>
    </div>
  )
}
