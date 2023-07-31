import MarkupButton from '../MarkupButton'

type MarkupSidebarType = {
  addMaskUp: (type: string) => void
  handleChangeCapture: () => void
  handleCloseMarkup: () => void
}
export default function MarkupSidebar({ addMaskUp, handleChangeCapture, handleCloseMarkup }: MarkupSidebarType) {
  const handleDrawPolyline = () => {
    addMaskUp('Polyline')
  }

  const handleDrawArrow = () => {
    addMaskUp('Arrow')
  }

  const handleDrawPencil = () => {
    addMaskUp('Pencil')
  }

  const handleDrawText = () => {
    addMaskUp('Text')
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
      style={{
        position: 'absolute',
        top: '140px',
        right: '0px'
      }}
      id='markupSidebar'
      className='z-10 w-[46px] flex flex-wrap-reverse flex-col gap-2 items-center justify-center rounded-md invisible bg-white'
    >
      <MarkupButton handleOnClick={handleDrawPolyline}>1</MarkupButton>

      <MarkupButton handleOnClick={handleDrawArrow}>2</MarkupButton>

      <MarkupButton handleOnClick={handleDrawPencil}>3</MarkupButton>

      <MarkupButton handleOnClick={handleDrawText}>4</MarkupButton>

      <MarkupButton handleOnClick={handleDrawCircle}>5</MarkupButton>

      <MarkupButton handleOnClick={handleDrawRect}>6</MarkupButton>

      <MarkupButton handleOnClick={handleDrawPolygon}>7</MarkupButton>

      {/* <MarkupButton handleOnClick={handleChangeStyle}>
        <span className='h-[4px] w-6 ' style={{ backgroundColor: color }}></span>
      </MarkupButton> */}

      <MarkupButton handleOnClick={handleChangeCapture}>9</MarkupButton>

      <MarkupButton handleOnClick={handleCloseMarkup}>10</MarkupButton>
    </div>
  )
}
