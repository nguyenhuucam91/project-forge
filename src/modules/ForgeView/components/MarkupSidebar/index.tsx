import MarkupButton from '../MarkupButton'
import { ReactComponent as IconArrow } from './icons//icon-arrow.svg'
import { ReactComponent as IconCapture } from './icons//icon-capture.svg'
import { ReactComponent as IconCircle } from './icons//icon-circle.svg'
import { ReactComponent as IconClose } from './icons//icon-close.svg'
import { ReactComponent as IconPencil } from './icons//icon-pencil.svg'
import { ReactComponent as IconPolygon } from './icons//icon-polygon.svg'
import { ReactComponent as IconPolyline } from './icons//icon-polyline.svg'
import { ReactComponent as IconRect } from './icons//icon-rect.svg'
import { ReactComponent as IconText } from './icons//icon-text.svg'
import { ReactComponent as IconDim } from './icons//icon-dimension.svg'
import { ReactComponent as IconUndo } from './icons//icon-undo.svg'
import { ReactComponent as IconRedo } from './icons//icon-redo.svg'
import { ReactComponent as IconCopy } from './icons//icon-copy.svg'
import { ReactComponent as IconDelete } from './icons//icon-delete.svg'

import TooltipComponent from 'src/components/TooltipComponent'
import { useState } from 'react'

type MarkupSidebarType = {
  addMaskUp: (type: string) => void
  handleChangeCapture: () => void
  handleCloseMarkup: () => void
  handleDeleteMarkup: () => void
  handleUndo: () => void
  handleRedo: () => void
  handleCopy: () => void
  divRef: React.MutableRefObject<null>
}
export default function MarkupSidebar({
  divRef,
  addMaskUp,
  handleUndo,
  handleRedo,
  handleCopy,
  handleChangeCapture,
  handleCloseMarkup,
  handleDeleteMarkup
}: MarkupSidebarType) {
  const [selectedTool, setSelectedTool] = useState<string>('')

  const handleDrawPolyline = () => {
    setSelectedTool('Polyline')
    addMaskUp('Polyline')
  }

  const handleDrawArrow = () => {
    setSelectedTool('Arrow')
    addMaskUp('Arrow')
  }
  const handleDrawText = () => {
    setSelectedTool('Text')

    addMaskUp('Text')
  }
  const handleDrawPencil = () => {
    setSelectedTool('Pencil')

    addMaskUp('Pencil')
  }

  const handleDrawCircle = () => {
    setSelectedTool('Circle')

    addMaskUp('Circle')
  }

  const handleDrawRect = () => {
    setSelectedTool('Rect')

    addMaskUp('Rect')
  }

  const handleDrawPolygon = () => {
    setSelectedTool('Polygon')

    addMaskUp('Polygon')
  }

  const handleCreateDimension = () => {
    setSelectedTool('Dimension')
    addMaskUp('Dimension')
  }

  return (
    <div
      id='markupSidebar'
      className='absolute shadow-lg bottom-[12px] left-1/2 -translate-x-1/2 z-10 flex  gap-3 items-center justify-center rounded-md bg-white px-3 py-2'
      ref={divRef}
    >
      <TooltipComponent title='Draw Rectangular' placement='top'>
        <div>
          <MarkupButton handleOnClick={handleDrawRect} active={selectedTool === 'Rect'}>
            <IconRect></IconRect>
          </MarkupButton>
        </div>
      </TooltipComponent>

      <TooltipComponent title='Draw Circle' placement='top'>
        <div>
          <MarkupButton handleOnClick={handleDrawCircle} active={selectedTool === 'Circle'}>
            <IconCircle></IconCircle>
          </MarkupButton>
        </div>
      </TooltipComponent>

      <TooltipComponent title='Draw Polyline' placement='top'>
        <div>
          <MarkupButton handleOnClick={handleDrawPolyline} active={selectedTool === 'Polyline'}>
            <IconPolyline></IconPolyline>
          </MarkupButton>
        </div>
      </TooltipComponent>

      <TooltipComponent title='Draw Arrow' placement='top'>
        <div>
          <MarkupButton handleOnClick={handleDrawArrow} active={selectedTool === 'Arrow'}>
            <IconArrow></IconArrow>
          </MarkupButton>
        </div>
      </TooltipComponent>

      <TooltipComponent title='Draw Pencil' placement='top'>
        <div>
          <MarkupButton handleOnClick={handleDrawPencil} active={selectedTool === 'Pencil'}>
            <IconPencil></IconPencil>
          </MarkupButton>
        </div>
      </TooltipComponent>

      <TooltipComponent title='Draw Text' placement='top'>
        <div>
          <MarkupButton handleOnClick={handleDrawText} active={selectedTool === 'Text'}>
            <IconText></IconText>
          </MarkupButton>
        </div>
      </TooltipComponent>

      <TooltipComponent title='Draw Polygon' placement='top'>
        <div>
          <MarkupButton handleOnClick={handleDrawPolygon} active={selectedTool === 'Polygon'}>
            <IconPolygon></IconPolygon>
          </MarkupButton>
        </div>
      </TooltipComponent>

      <TooltipComponent title='Create Dimension' placement='top'>
        <div>
          <MarkupButton handleOnClick={handleCreateDimension} active={selectedTool === 'Dimension'}>
            <IconDim></IconDim>
          </MarkupButton>
        </div>
      </TooltipComponent>

      <TooltipComponent title='Capture' placement='top'>
        <div>
          <MarkupButton handleOnClick={handleChangeCapture}>
            <IconCapture></IconCapture>
          </MarkupButton>
        </div>
      </TooltipComponent>

      <div className=' w-1 border-l-2 border-l-primary-900 h-8'></div>

      <TooltipComponent title='Undo' placement='top'>
        <div>
          <MarkupButton handleOnClick={handleUndo}>
            <IconUndo></IconUndo>
          </MarkupButton>
        </div>
      </TooltipComponent>

      <TooltipComponent title='Redo' placement='top'>
        <div>
          <MarkupButton handleOnClick={handleRedo}>
            <IconRedo></IconRedo>
          </MarkupButton>
        </div>
      </TooltipComponent>

      <TooltipComponent title='Copy Markup' placement='top'>
        <div>
          <MarkupButton handleOnClick={handleCopy}>
            <IconCopy></IconCopy>
          </MarkupButton>
        </div>
      </TooltipComponent>

      <TooltipComponent title='Delete Markup' placement='top'>
        <div>
          <MarkupButton handleOnClick={handleDeleteMarkup}>
            <IconDelete></IconDelete>
          </MarkupButton>
        </div>
      </TooltipComponent>

      <TooltipComponent title='Close Markup' placement='top'>
        <div>
          <MarkupButton handleOnClick={handleCloseMarkup}>
            <IconClose></IconClose>
          </MarkupButton>
        </div>
      </TooltipComponent>
    </div>
  )
}
