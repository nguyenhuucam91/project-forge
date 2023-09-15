import React, { useEffect, useRef } from 'react'
import { forgeAPI } from 'src/modules/ForgeView/services/forge.service'

export default function ForgePreview({ urn, width }: { urn: string; width: number }) {
  const viewDomRef = React.useRef(null)
  const viewRef = React.useRef<Autodesk.Viewing.GuiViewer3D | null>(null)
  const viewerDocumentRef = useRef<Autodesk.Viewing.Document | null>(null)

  useEffect(() => {
    viewRef.current?.resize()
    viewRef.current?.fitToView()
  }, [width])

  useEffect(() => {
    const createInitViewer = async () => {
      function onDocumentLoadSuccessInit(viewerDocument: Autodesk.Viewing.Document) {
        viewerDocumentRef.current = viewerDocument
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
        const htmlElement = viewDomRef.current

        if (htmlElement) {
          const config = {
            extensions: ['Autodesk.Viewing.MarkupsCore', 'MarkupExtension']
          }
          viewRef.current = new Autodesk.Viewing.GuiViewer3D(htmlElement, config)

          viewRef.current.setTheme('dark-theme')
          const startedCode = viewRef.current.start()

          if (startedCode > 0) {
            return
          }
          Autodesk.Viewing.Document.load(urn, onDocumentLoadSuccessInit, onDocumentLoadFailureInit)
        }
      })
    }
    createInitViewer()

    return () => {
      if (!viewRef.current) return
      viewRef.current.finish()
      Autodesk.Viewing.shutdown()
    }
  }, [urn])

  return <div ref={viewDomRef}></div>
}
