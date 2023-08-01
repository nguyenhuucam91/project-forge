import React, { useEffect, useRef, useState } from 'react'
import { forgeAPI } from './services/forge.api'
import getScreenshotDataUrl from './services/captureMaskup'
import MarkupSidebar from './components/MarkupSidebar'
import MarkupStyleSidebar from './components/MarkupStyleSidebar'
import { useMutationObserver } from '@react-hooks-library/core'
// eslint-disable-next-line no-undef
const Autodesk = window.Autodesk
export default function ForgeView() {
  const viewDomRef = React.useRef(null)
  const viewRef = React.useRef(null)
  const markupRef = useRef(null)
  const [clicked, setClicked] = useState()
  const divref = useRef(null)
  const [observed, setObserved] = useState(false)

  useMutationObserver(
    divref,
    (mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === 'attributes') {
          setObserved(true)
          console.log(121212)
        }
      }
    },
    { attributes: true }
  )
  const [urnState, setUrnState] = useState([
    'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6bG5lMWRpd3p1enpudGNocWtmaGt5NmE0ZHpsZnRydHYtYmFzaWMtYXBwLyVFNCVCQiU5NSVFNSU4RiVBMyVFNSU4NiU4NSVFNyVCNCU4RCVFMyU4MSVCRSVFMyU4MiU4QSVFNSU5QiVCMyUyMDExMSgxKS5ydnQ'
  ])

  const [style, setStyle] = useState({
    'font-size': 200,
    'font-weight': 'normal',
    'font-style': 'normal',
    'stroke-color': '#ff0000',
    'stroke-width': 50
  })

  useEffect(() => {
    changeMarkupStyleUseEffect()
  }, [style, clicked])

  useEffect(() => {
    const createInitViewer = async () => {
      //let viewer = null
      function onDocumentLoadSuccessInit(viewerDocument) {
        const viewAbles = viewerDocument.getRoot().search({ type: 'geometry', role: '3d' })
        let view
        if (viewAbles.length != 0) {
          view = viewAbles[0]
        } else {
          view = viewerDocument.getRoot().getDefaultGeometry()
        }
        // load viewable vào view.
        viewRef.current.loadDocumentNode(viewerDocument, view, {
          keepCurrentModels: true,
          applyScaling: 'mm'
        })

        viewRef.current.addEventListener(Autodesk.Viewing.GEOMETRY_LOADED_EVENT, () => {
          viewRef.current.fitToView()
        })

        viewRef.current.loadExtension('Autodesk.DocumentBrowser')
        viewRef.current.loadExtension('MarkupExtension')
        viewRef.current.addEventListener(Autodesk.Viewing.GEOMETRY_LOADED_EVENT, () => {
          let explodeExtension = viewRef.current.getExtension('Autodesk.Explode')
          explodeExtension.unload()
        })

        viewRef.current.addEventListener(Autodesk.Viewing.CAMERA_CHANGE_EVENT, () => {
          const viewState = viewRef.current.getState({ viewport: true })
          console.log(viewState.viewport.distanceToOrbit)
        })
      }

      function onDocumentLoadFailureInit() {
        console.error('Failed fetching Forge manifest')
      }

      const accessToken = await forgeAPI.getAccessToken()

      const options = {
        env: 'AutodeskProduction',
        api: 'derivativeV2', //region
        getAccessToken: function (onTokenReady) {
          const token = accessToken
          const timeInSeconds = 3600
          onTokenReady(token, timeInSeconds)
        },
        language: 'ja'
      }

      Autodesk.Viewing.Initializer(options, function onInitialized() {
        // let htmlElement = document.getElementById('viewer')
        let htmlElement = viewDomRef.current

        if (htmlElement) {
          const config = {
            extensions: ['Autodesk.Viewing.MarkupsCore', 'MarkupExtension']
            //'Autodesk.ADN.Viewing.Extension.Markup',
          }
          viewRef.current = new Autodesk.Viewing.GuiViewer3D(htmlElement, config)

          viewRef.current.setTheme('dark-theme')
          var startedCode = viewRef.current.start()

          if (startedCode > 0) {
            return
          }

          urnState.map((urnState) => {
            Autodesk.Viewing.Document.load(urnState, onDocumentLoadSuccessInit, onDocumentLoadFailureInit)
          })
        }
      })
    }
    createInitViewer()
  }, [urnState])

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
  const addMaskUp = (type) => {
    if (!clicked) {
      setClicked(true)
    }
    markupRef.current = viewRef.current.getExtension('Autodesk.Viewing.MarkupsCore')
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
  const handleDrawText = () => {
    if (!clicked) {
      setClicked(true)
    }
    addEvent()

    markupRef.current = viewRef.current.getExtension('Autodesk.Viewing.MarkupsCore')
    const markup = markupRef.current
    markup.enterEditMode()
    changeMarkupStyle()
    const circle = new Autodesk.Viewing.Extensions.Markups.Core.EditModeText(markup)
    markup.changeEditMode(circle)
    changeMarkupStyle()
  }

  const addEvent = () => {
    const selectMarkupEvent = (event) => {
      setMarkupEle(event.markup)
    }
    markupRef.current = viewRef.current?.getExtension('Autodesk.Viewing.MarkupsCore')
    if (markupRef.current) {
      markupRef.current.addEventListener(
        Autodesk.Viewing.Extensions.Markups.Core.EVENT_MARKUP_SELECTED,
        selectMarkupEvent
      )
    }
  }
  const [markupEle, setMarkupEle] = useState(null)

  const handleDeleteMarkup = () => {
    markupRef.current = viewRef.current.getExtension('Autodesk.Viewing.MarkupsCore')
    const markup = markupRef.current
    markup.deleteMarkup(markupEle, false)
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
  }

  return (
    <>
      <div id='viewer' ref={viewDomRef} className='rounded-md'></div>
      <div ref={divref} id='extensionMarkup'></div>
      <MarkupSidebar
        addMaskUp={addMaskUp}
        handleDrawText={handleDrawText}
        handleChangeCapture={handleChangeCapture}
        handleCloseMarkup={handleCloseMarkup}
      ></MarkupSidebar>
      <MarkupStyleSidebar
        markup={markupEle}
        style={style}
        setStyle={setStyle}
        handleDeleteMarkup={handleDeleteMarkup}
      ></MarkupStyleSidebar>
    </>
  )
}
