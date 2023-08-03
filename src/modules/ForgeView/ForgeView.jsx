import React, { useEffect, useRef, useState } from 'react'
import { forgeAPI } from './services/forge.api'
import MarkupSidebar from './components/MarkupSidebar'
import MarkupStyleSidebar from './components/MarkupStyleSidebar'
import { useMutationObserver } from '@react-hooks-library/core'
import { useMaskUpServices } from './services/markup.services'
// eslint-disable-next-line no-undef
const Autodesk = window.Autodesk
export default function ForgeView() {
  const [showMarkup, setShowMaskup] = useState(false)
  const viewDomRef = React.useRef(null)
  const viewRef = React.useRef(null)
  const markupRef = useRef(null)
  const divRef = useRef(null)

  const [style, setStyle] = useState({
    'font-size': 200,
    'font-weight': 'normal',
    'font-style': 'normal',
    'stroke-color': '#ff0000',
    'stroke-width': 50
  })
  const {
    markupObject,
    handleMeasure,
    handleCopy,
    handleRedo,
    handleUndo,
    handleAddMaskUp,
    handleChangeCapture,
    handleCloseMarkup,
    handleDeleteMarkup,
    changeMarkupStyleUseEffect
  } = useMaskUpServices({ markupRef, viewRef, style, setShowMaskup })

  const [urnState, setUrnState] = useState([
    'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6bG5lMWRpd3p1enpudGNocWtmaGt5NmE0ZHpsZnRydHYtYmFzaWMtYXBwLyVFNCVCQiU5NSVFNSU4RiVBMyVFNSU4NiU4NSVFNyVCNCU4RCVFMyU4MSVCRSVFMyU4MiU4QSVFNSU5QiVCMyUyMDExMSgxKS5ydnQ'
  ])

  useEffect(() => {
    changeMarkupStyleUseEffect()
  }, [style])

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
          viewRef.current?.fitToView()
        })

        viewRef.current.loadExtension('Autodesk.DocumentBrowser')
        viewRef.current.loadExtension('Autodesk.Measure')
        viewRef.current.addEventListener(Autodesk.Viewing.GEOMETRY_LOADED_EVENT, () => {
          let explodeExtension = viewRef.current.getExtension('Autodesk.Explode')
          explodeExtension.unload()
        })

        viewRef.current.addEventListener(Autodesk.Viewing.TOOLBAR_CREATED_EVENT, function () {
          const button = new Autodesk.Viewing.UI.Button('Markup')
          button.onClick = function (e) {
            console.log(1212)
            const toolbar = document.getElementById('guiviewer3d-toolbar')
            if (!showMarkup) {
              viewRef.current.loadExtension('Autodesk.Viewing.MarkupsCore')
              toolbar.style.visibility = 'hidden'
              handleAddMaskUp('Pencil')
              changeMarkupStyleUseEffect()
            } else {
              viewRef.current.unloadExtension('Autodesk.Viewing.MarkupsCore')
              toolbar.style.visibility = 'visible'
            }
            setShowMaskup(!showMarkup)
          }
          button.addClass('markupExtensionIcon')
          button.setToolTip('Markup')
          const group = new Autodesk.Viewing.UI.ControlGroup('Markup')
          group.addControl(button)
          viewRef.current.toolbar.addControl(group)
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
            extensions: ['Autodesk.Viewing.MarkupsCore', 'Autodesk.Measure']
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

  return (
    <>
      <div id='viewer' ref={viewDomRef}></div>
      {showMarkup && (
        <>
          <MarkupSidebar
            divRef={divRef}
            addMaskUp={handleAddMaskUp}
            handleChangeCapture={handleChangeCapture}
            handleCloseMarkup={handleCloseMarkup}
            handleCopy={handleCopy}
            handleRedo={handleRedo}
            handleUndo={handleUndo}
            handleDeleteMarkup={handleDeleteMarkup}
          ></MarkupSidebar>

          <MarkupStyleSidebar markupObject={markupObject} style={style} setStyle={setStyle}></MarkupStyleSidebar>
        </>
      )}
    </>
  )
}
