import React, { useEffect, useRef, useState } from 'react'
import { forgeAPI } from './services/forge.service'
import MarkupSidebar from './components/MarkupSidebar'
import MarkupStyleSidebar from './components/MarkupStyleSidebar'
import Sidebar from './components/Sidebar'
import { useMaskUpServices } from './services/markup.services'
import { useTitle } from 'react-use'
import { Breadcrumbs } from '@mui/material'
import { useNavigate, useParams } from 'react-router'
import { format } from 'react-string-format'
import { url } from 'src/config/url'

// eslint-disable-next-line no-undef
const Autodesk = window.Autodesk
export default function ForgeView() {
  useTitle('Document View')

  const [showMarkup, setShowMaskup] = useState(false)
  const viewDomRef = React.useRef(null)
  const viewRef = React.useRef(null)
  const markupRef = useRef(null)
  const divRef = useRef(null)

  const { projectId } = useParams()
  const navigate = useNavigate()

  const [style, setStyle] = useState({
    'font-size': 200,
    'font-weight': 'normal',
    'font-style': 'normal',
    'stroke-color': '#ff0000',
    'stroke-width': 50
  })
  const {
    markupObject,
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
          viewRef.current.fitToView()
        })

        viewRef.current.loadExtension('Autodesk.DocumentBrowser')
        viewRef.current.addEventListener(Autodesk.Viewing.GEOMETRY_LOADED_EVENT, () => {
          let explodeExtension = viewRef.current.getExtension('Autodesk.Explode')
          explodeExtension.unload()
        })

        viewRef.current.addEventListener(Autodesk.Viewing.TOOLBAR_CREATED_EVENT, function () {
          const button = new Autodesk.Viewing.UI.Button('Markup')
          button.onClick = function () {
            console.log(1212)
            // eslint-disable-next-line no-undef
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
        let htmlElement = viewDomRef.current

        if (htmlElement) {
          const config = {
            extensions: ['Autodesk.Viewing.MarkupsCore', 'MarkupExtension', 'WalkingPathToolExtension']
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

  // const handleSnapping = () => {
  //   const viewer = viewRef.current
  //   const stateFilter1 = {
  //     seedURN: false,
  //     objectSet: true,
  //     viewport: true,
  //     renderOptions: true
  //   }
  //   localStorage.setItem('homeView', JSON.stringify(viewer.getState(stateFilter1)))
  //   // Autodesk.Viewing.theExtensionManager.registerExtension('WalkingPathToolExtension2', WalkingPathToolExtension)
  //   // const names = viewer.toolController.activateTool('WalkingPathToolExtension2')
  //   console.log('handleSnapping')
  // }
  // const filterState = (srcState, setNames, elementNames) => {
  //   const state = JSON.parse(JSON.stringify(srcState))

  //   const sets = Array.isArray(setNames) ? setNames : [setNames]

  //   const elements = Array.isArray(elementNames) ? elementNames : [elementNames]

  //   sets.forEach((setName) => {
  //     if (state[setName]) {
  //       elements.forEach((elementName) => {
  //         state[setName].forEach((element) => {
  //           delete element[elementName]
  //         })
  //       })
  //     }
  //   })

  //   return state
  // }
  // const handleRestore = () => {
  //   const viewer = viewRef.current
  //   const viewPortValue = localStorage.getItem('homeView')
  //   const viewPortObject = JSON.parse(viewPortValue)
  //   const filteredState = filterState(viewPortObject, 'objectSet', 'explodeScale')
  //   console.log('🚀 ~ file: ForgeView.jsx:163 ~ handleRestore ~ viewPortObject:', viewPortObject)
  //   const stateFilter2 = {
  //     seedURN: false,
  //     objectSet: true,
  //     viewport: true,
  //     renderOptions: {
  //       environment: false,
  //       ambientOcclusion: false,
  //       toneMap: {
  //         exposure: false
  //       },
  //       appearance: false
  //     }
  //   }
  //   viewer.restoreState(viewPortObject, stateFilter2, false)
  //   console.log('handleRestore')

  //   // Autodesk.Viewing.theExtensionManager.registerExtension('WalkingPathToolExtension2', WalkingPathToolExtension)
  //   // const names = viewer.toolController.activateTool('WalkingPathToolExtension2')
  //   // console.log('🚀 ~ file: ForgeView.jsx:155 ~ handleSnapping ~ names:', names)
  // }
  const handleBackHome = () => {
    navigate(format(url.web.documents.documentStringFormat, projectId))
  }
  return (
    <>
      <div className='w-full h-[40px] bg-white fixed z-[11] shadow-md pl-[70px] flex items-center'>
        <Breadcrumbs aria-label='breadcrumb'>
          <button onClick={handleBackHome}>Project</button>
          <button onClick={handleBackHome} className='font-medium '>
            Structure
          </button>
          <button className='font-medium text-primary-900'>Structure 1</button>
        </Breadcrumbs>
      </div>
      <div id='viewer' ref={viewDomRef}></div>
      {/* <div className=' absolute top-[300px] left-0 z-20 flex gap-3'>
        <button onClick={handleSnapping} className='p-5 bg-primary-800 text-white'>
          Save View
        </button>
        <button onClick={handleRestore}>Restore</button>
      </div> */}
      <Sidebar></Sidebar>
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
