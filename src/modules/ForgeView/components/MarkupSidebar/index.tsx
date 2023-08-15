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
import { ReactComponent as IconUndo } from './icons//icon-undo.svg'
import { ReactComponent as IconRedo } from './icons//icon-redo.svg'
import { ReactComponent as IconCopy } from './icons//icon-copy.svg'
import { ReactComponent as IconDelete } from './icons//icon-delete.svg'

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
  const handleDrawPolyline = () => {
    addMaskUp('Polyline')
  }

  const handleDrawArrow = () => {
    addMaskUp('Arrow')
  }
  const handleDrawText = () => {
    addMaskUp('Text')
  }
  const handleDrawPencil = () => {
    addMaskUp('Pencil')
  }

  const handleDrawCircle = () => {
    addMaskUp('Circle')
  }

  const handleDrawRect = () => {
    addMaskUp('Rect')
  }

  const handleDrawPolygon = () => {
    addMaskUp('Polygon')
  }

  return (
    <div
      id='markupSidebar'
      className='absolute shadow-lg bottom-[12px] left-1/2 -translate-x-1/2 z-10 flex  gap-3 items-center justify-center rounded-md bg-white px-3 py-2'
      ref={divRef}
    >
      <MarkupButton handleOnClick={handleDrawRect}>
        <IconRect></IconRect>
      </MarkupButton>

      <MarkupButton handleOnClick={handleDrawCircle}>
        <IconCircle></IconCircle>
      </MarkupButton>

      <MarkupButton handleOnClick={handleDrawPolyline}>
        <IconPolyline></IconPolyline>
      </MarkupButton>

      <MarkupButton handleOnClick={handleDrawArrow}>
        <IconArrow></IconArrow>
      </MarkupButton>

      <MarkupButton handleOnClick={handleDrawPencil}>
        <IconPencil></IconPencil>
      </MarkupButton>

      <MarkupButton handleOnClick={handleDrawText}>
        <IconText></IconText>
      </MarkupButton>

      <MarkupButton handleOnClick={handleDrawPolygon}>
        <IconPolygon></IconPolygon>
      </MarkupButton>

      {/* <MarkupButton handleOnClick={handleChangeStyle}>
        <span className='h-[4px] w-6 ' style={{ backgroundColor: color }}></span>
      </MarkupButton> */}

      <MarkupButton handleOnClick={handleChangeCapture}>
        <IconCapture></IconCapture>
      </MarkupButton>
      <hr className=' w-8 rotate-90 bg-primary-300'></hr>
      <MarkupButton handleOnClick={handleUndo}>
        <IconUndo></IconUndo>
      </MarkupButton>
      <MarkupButton handleOnClick={handleRedo}>
        <IconRedo></IconRedo>
      </MarkupButton>
      <MarkupButton handleOnClick={handleCopy}>
        <IconCopy></IconCopy>
      </MarkupButton>
      <MarkupButton handleOnClick={handleDeleteMarkup}>
        <IconDelete></IconDelete>
      </MarkupButton>
      <MarkupButton handleOnClick={handleCloseMarkup}>
        <IconClose></IconClose>
      </MarkupButton>
    </div>
  )
}
