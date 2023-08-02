import { useState } from 'react'
import getScreenshotDataUrl from './captureMaskup'

// eslint-disable-next-line no-undef
const Autodesk = window.Autodesk

export const useMaskUpServices = ({ markupRef, viewRef, style }) => {
  const [clicked, setClicked] = useState(false)
  const [markupObject, setMarkupObject] = useState(null)

  const handleAddMaskUp = (type) => {
    if (!clicked) {
      setClicked(true)
    }
    if (viewRef === null) {
      return
    }
    markupRef.current = viewRef.current?.getExtension('Autodesk.Viewing.MarkupsCore')
    const markup = markupRef.current
    markup.enterEditMode()
    addEvent()
    let maskUpElement
    switch (type) {
      case 'Polyline':
        maskUpElement = new Autodesk.Viewing.Extensions.Markups.Core.EditModePolyline(markup)
        break
      case 'Arrow':
        maskUpElement = new Autodesk.Viewing.Extensions.Markups.Core.EditModeArrow(markup)
        break
      case 'Pencil':
        maskUpElement = new Autodesk.Viewing.Extensions.Markups.Core.EditModeFreehand(markup)
        break
      case 'Text':
        maskUpElement = new Autodesk.Viewing.Extensions.Markups.Core.EditModeText(markup)
        break
      case 'Circle':
        maskUpElement = new Autodesk.Viewing.Extensions.Markups.Core.EditModeCircle(markup)
        break
      case 'Rect':
        maskUpElement = new Autodesk.Viewing.Extensions.Markups.Core.EditModeRectangle(markup)
        break
      case 'Cloud':
        maskUpElement = new Autodesk.Viewing.Extensions.Markups.Core.EditModeCloud(markup)
        break
      case 'Polygon':
        maskUpElement = new Autodesk.Viewing.Extensions.Markups.Core.EditModePolycloud(markup)
        break
      default:
        break
    }
    markup.changeEditMode(maskUpElement)
    changeMarkupStyle()
  }

  const addEvent = () => {
    const selectMarkupEvent = (event) => {
      setMarkupObject(event.markup)
    }
    markupRef.current = viewRef.current?.getExtension('Autodesk.Viewing.MarkupsCore')
    if (markupRef.current) {
      markupRef.current.addEventListener(
        Autodesk.Viewing.Extensions.Markups.Core.EVENT_MARKUP_SELECTED,
        selectMarkupEvent
      )
    }
  }

  const handleDeleteMarkup = () => {
    markupRef.current = viewRef.current.getExtension('Autodesk.Viewing.MarkupsCore')
    const markup = markupRef.current
    markup.deleteMarkup(markupObject, false)
  }

  const changeMarkupStyle = () => {
    markupRef.current = viewRef.current?.getExtension('Autodesk.Viewing.MarkupsCore')
    const markup = markupRef.current
    if (!markup || !clicked) {
      return
    }
    const viewState = viewRef.current.getState({ viewport: true })
    const scaleView = viewState.viewport.distanceToOrbit / 6999 || 1

    const styleAttributes = ['font-size', 'font-weight', 'font-style', 'stroke-color', 'stroke-width']
    const nsu = Autodesk.Viewing.Extensions.Markups.Core.Utils
    const styleObject = nsu.createStyle(styleAttributes, markup)

    styleObject['font-size'] = style['font-size']
    styleObject['font-weight'] = style['font-weight']
    styleObject['font-style'] = style['font-style']
    styleObject['stroke-color'] = style['stroke-color']
    styleObject['stroke-width'] = style['stroke-width'] * scaleView
    markup.setStyle(styleObject)
  }

  const handleChangeCapture = async () => {
    function simulateDownloadImageClick(uri, filename) {
      // eslint-disable-next-line no-undef
      var link = document.createElement('a')
      if (typeof link.download !== 'string') {
        // eslint-disable-next-line no-undef
        window.open(uri)
      } else {
        link.href = uri
        link.download = filename
        accountForFirefox(clickLink, link)
      }
    }

    function clickLink(link) {
      link.click()
    }

    function accountForFirefox(click) {
      let link = arguments[1]
      // eslint-disable-next-line no-undef
      document.body.appendChild(link)
      click(link)
      // eslint-disable-next-line no-undef
      document.body.removeChild(link)
    }

    const dataUrl = await getScreenshotDataUrl(viewRef.current)
    simulateDownloadImageClick(dataUrl, 'View-Capture.png')
  }

  const handleCloseMarkup = async () => {
    viewRef.current.unloadExtension('Autodesk.Viewing.MarkupsCore')
    // eslint-disable-next-line no-undef
    document.getElementById('markupSidebar').style.visibility = 'hidden'
    document.getElementById('markupStyleSidebar').style.visibility = 'hidden'
  }
  const handleUndo = () => {
    markupRef.current = viewRef.current.getExtension('Autodesk.Viewing.MarkupsCore')
    const markup = markupRef.current
    console.log('🚀 ~ file: markup.services.js:130 ~ handleUndo ~ markup:', markup)
    markup.undo()
  }

  const handleRedo = () => {
    markupRef.current = viewRef.current.getExtension('Autodesk.Viewing.MarkupsCore')
    const markup = markupRef.current
    console.log('🚀 ~ file: markup.services.js:136 ~ handleRedo ~ markup:', markup)
    markup.redo()
  }

  const handleCopy = () => {
    markupRef.current = viewRef.current.getExtension('Autodesk.Viewing.MarkupsCore')
    const markup = markupRef.current
    markup.copy()
    markup.paste()
  }
  const changeMarkupStyleUseEffect = () => {
    const markup = viewRef.current?.getExtension('Autodesk.Viewing.MarkupsCore')

    if (!markup) {
      return
    } else {
      const viewState = viewRef.current.getState({ viewport: true })
      const scaleView = viewState.viewport.distanceToOrbit / 6999 || 1

      const styleAttributes = ['font-size', 'font-weight', 'font-style', 'stroke-color', 'stroke-width']
      const nsu = Autodesk.Viewing.Extensions.Markups.Core.Utils
      const styleObject = nsu.createStyle(styleAttributes, markup)

      styleObject['font-size'] = style['font-size']
      styleObject['font-weight'] = style['font-weight']
      styleObject['font-style'] = style['font-style']
      styleObject['stroke-color'] = style['stroke-color']
      styleObject['stroke-width'] = style['stroke-width'] * scaleView

      markup.setStyle(styleObject)
    }
  }
  return {
    markupObject,
    handleUndo,
    handleRedo,
    handleCopy,
    handleAddMaskUp,
    handleDeleteMarkup,
    handleChangeCapture,
    handleCloseMarkup,
    changeMarkupStyleUseEffect
  }
}