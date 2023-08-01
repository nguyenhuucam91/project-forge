import MarkupButton from '../MarkupButton'
import { ReactComponent as IconArrow } from './icons//icon-arrow.svg'
import { ReactComponent as IconCapture } from './icons//icon-capture.svg'
import { ReactComponent as IconCircle } from './icons//icon-circle.svg'
import { ReactComponent as IconClose } from './icons//icon-close.svg'
import { ReactComponent as IconPencil } from './icons//icon-pencil.svg'
import { ReactComponent as IconPolygon } from './icons//icon-polygon.svg'
import { ReactComponent as IconPolyline } from './icons//icon-polyline.svg'
import { ReactComponent as IconRect } from './icons//icon-rect.svg'
import { ReactComponent as IconStyle } from './icons//icon-style.svg'
import { ReactComponent as IconText } from './icons//icon-text.svg'

type MarkupSidebarType = {
  addMaskUp: (type: string) => void
  handleDrawText: () => void
  handleChangeCapture: () => void
  handleCloseMarkup: () => void
}
export default function MarkupSidebar({
  addMaskUp,
  handleDrawText,
  handleChangeCapture,
  handleCloseMarkup
}: MarkupSidebarType) {
  const handleDrawPolyline = () => {
    addMaskUp('Polyline')
  }

  const handleDrawArrow = () => {
    addMaskUp('Arrow')
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
      className='absolute right-[15px] shadow-lg top-1/2 -translate-y-1/2 z-10 flex flex-wrap-reverse flex-col gap-3 items-center justify-center rounded-md invisible bg-white px-2 py-3'
    >
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

      <MarkupButton handleOnClick={handleDrawCircle}>
        <IconCircle></IconCircle>
      </MarkupButton>

      <MarkupButton handleOnClick={handleDrawRect}>
        <IconRect></IconRect>
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

      <MarkupButton handleOnClick={handleCloseMarkup}>
        <IconClose></IconClose>
      </MarkupButton>
    </div>
  )
}
