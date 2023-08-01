import React from 'react'
import MarkupButton from '../MarkupButton'
import { ReactComponent as IconPolyline } from '../MarkupSidebar/icons/icon-arrow.svg'
import { MarkupStyleType } from 'src/type/style.type'

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
      className='absolute shadow-lg top-[12px] left-1/2 -translate-x-1/2 z-10 flex gap-3 items-center justify-center rounded-md invisible bg-white px-2 py-3'
    >
      <MarkupButton handleOnClick={handleFontDown}>
        <IconPolyline></IconPolyline>
      </MarkupButton>
      <MarkupButton handleOnClick={handleFontUp}>
        <IconPolyline></IconPolyline>
      </MarkupButton>

      <MarkupButton handleOnClick={handleBold}>
        <IconPolyline></IconPolyline>
      </MarkupButton>
      <MarkupButton handleOnClick={handleItalic}>
        <IconPolyline></IconPolyline>
      </MarkupButton>
      <MarkupButton handleOnClick={handleDeleteMarkup}>
        <IconPolyline></IconPolyline>
      </MarkupButton>
    </div>
  )
}
