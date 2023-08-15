import React from 'react'
import MarkupButton from '../MarkupButton'
import { MarkupStyleType } from 'src/type/style.type'
import { ReactComponent as IconBold } from './icons/icon-bold.svg'
import { ReactComponent as IconItalic } from './icons/icon-italic.svg'
import { ReactComponent as IconUp } from './icons/icon-up.svg'
import { ReactComponent as IconDown } from './icons/icon-down.svg'

type MarkupStyleSidebarProps = {
  style: MarkupStyleType
  markupObject: any
  setStyle: (value: React.SetStateAction<MarkupStyleType>) => void
}

export default function MarkupStyleSidebar({ markupObject, style, setStyle }: MarkupStyleSidebarProps) {
  const handleFontUp = () => {
    setStyle((prev) => {
      const copyStyle = { ...prev }
      if (markupObject.type === 'label') {
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
      if (markupObject.type === 'label') {
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
  const handleChangeColor = (color: string) => {
    console.log(12121)

    setStyle((prev) => {
      const copyStyle = { ...prev }
      copyStyle['stroke-color'] = color
      return copyStyle
    })
  }
  return (
    <div
      id='markupStyleSidebar'
      className='absolute shadow-lg right-[12px] flex-col top-1/2 -translate-y-1/2 z-10 flex gap-3 items-center justify-center rounded-md bg-white px-2 py-3'
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
      <hr className='w-full h-[2px] bg-primary-300' />

      <MarkupButton handleOnClick={() => handleChangeColor('#FF0000')}>
        <div className='h-4 w-4 rounded-full ring-4 ring-[#FF0000]'></div>
      </MarkupButton>

      <MarkupButton handleOnClick={() => handleChangeColor('#ecec01')}>
        <div className='h-4 w-4 rounded-full ring-4 ring-[#ecec01]'></div>
      </MarkupButton>

      <MarkupButton handleOnClick={() => handleChangeColor('#00FF00')}>
        <div className='h-4 w-4 rounded-full ring-4 ring-[#00FF00]'></div>
      </MarkupButton>
      <MarkupButton handleOnClick={() => handleChangeColor('#00FFFF')}>
        <div className='h-4 w-4 rounded-full ring-4 ring-[#00FFFF]'></div>
      </MarkupButton>
      <MarkupButton handleOnClick={() => handleChangeColor('#0000FF')}>
        <div className='h-4 w-4 rounded-full ring-4 ring-[#0000FF]'></div>
      </MarkupButton>
      <MarkupButton handleOnClick={() => handleChangeColor('#FF00FF')}>
        <div className='h-4 w-4 rounded-full ring-4 ring-[#FF00FF]'></div>
      </MarkupButton>
    </div>
  )
}
