import React, { useEffect, useState } from 'react'
import { forgeAPI } from './services/forge.service'

export default function ForgeView() {
  const viewDomRef = React.useRef(null)
  const viewRef = React.useRef<Autodesk.Viewing.GuiViewer3D | null>(null)

  const [urnState, setUrnState] = useState<string[]>([
    'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6bG5lMWRpd3p1enpudGNocWtmaGt5NmE0ZHpsZnRydHYtYmFzaWMtYXBwLyVFNCVCQiU5NSVFNSU4RiVBMyVFNSU4NiU4NSVFNyVCNCU4RCVFMyU4MSVCRSVFMyU4MiU4QSVFNSU5QiVCMyUyMDExMSgxKS5ydnQ'
  ])

  useEffect(() => {
    const createInitViewer = async () => {
      //let viewer = null
      const onDocumentLoadSuccessInit = async (viewerDocument: Autodesk.Viewing.Document) => {
        const viewAbles = viewerDocument.getRoot().search({ type: 'geometry', role: '3d' })
        let view
        if (viewAbles.length != 0) {
          view = viewAbles[0]
        } else {
          view = viewerDocument.getRoot().getDefaultGeometry()
        }
        // load viewable vào view.
        viewRef?.current?.loadDocumentNode(viewerDocument, view, {
          keepCurrentModels: true,
          applyScaling: 'mm'
        })

        viewRef?.current?.addEventListener(Autodesk.Viewing.GEOMETRY_LOADED_EVENT, () => {
          viewRef?.current?.fitToView()
        })

        viewRef?.current?.loadExtension('Autodesk.DocumentBrowser')
        viewRef?.current?.addEventListener(Autodesk.Viewing.GEOMETRY_LOADED_EVENT, () => {
          const explodeExtension = viewRef?.current?.getExtension('Autodesk.Explode')
          explodeExtension?.unload()
        })
        const { ReactPanelExtension } = await import('./extension/MyExtension')
        console.log(
          '🚀 ~ file: ForgeView2.tsx:39 ~ onDocumentLoadSuccessInit ~ ReactPanelExtension:',
          ReactPanelExtension
        )
        ReactPanelExtension.register()
        viewRef?.current?.loadExtension('MyExtension')
      }

      function onDocumentLoadFailureInit() {
        console.error('Failed fetching Forge manifest')
      }

      const accessToken = await forgeAPI.getAccessToken()

      const options = {
        env: 'AutodeskProduction',
        api: 'derivativeV2', //region
        getAccessToken: function (onTokenReady: any) {
          const token = accessToken
          const timeInSeconds = 3600
          onTokenReady(token, timeInSeconds)
        },
        language: 'ja'
      }

      Autodesk.Viewing.Initializer(options, function onInitialized() {
        if (viewDomRef.current) {
          const config = {
            extensions: ['Autodesk.Viewing.MarkupsCore', 'MarkupExtension', 'WalkingPathToolExtension']
          }
          viewRef.current = new Autodesk.Viewing.GuiViewer3D(viewDomRef.current, config)

          viewRef.current.setTheme('dark-theme')
          const startedCode = viewRef.current.start()

          if (startedCode > 0) {
            return
          }
          urnState.map((urnState: string) => {
            Autodesk.Viewing.Document.load(urnState, onDocumentLoadSuccessInit, onDocumentLoadFailureInit)
          })
        }
      })
    }
    createInitViewer()
  }, [urnState])

  return <div ref={viewDomRef}></div>
}
