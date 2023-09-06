import React, { ReactNode, useEffect, useRef, useState } from 'react'
import { forgeAPI } from 'src/modules/ForgeView/services/forge.service'

export default function ForgePreview({ urn, width }: { urn: string; width: number }) {
  const viewDomRef = React.useRef(null)
  const viewRef = React.useRef<Autodesk.Viewing.GuiViewer3D | null>(null)
  const viewerDocumentRef = useRef<Autodesk.Viewing.Document | null>(null)
  const [listImg, setListImgs] = useState<ReactNode[]>([])
  console.log('🚀 ~ file: index.tsx:8 ~ ForgePreview ~ listImg:', listImg)
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

  const handleLoad = async () => {
    const newListImgs: ReactNode[] = []
    const view3dGeoAbles = viewerDocumentRef.current.getRoot().search({ type: 'geometry', role: '3d' })

    view3dGeoAbles.forEach((view) => {
      Autodesk.Viewing?.Thumbnails?.getUrlForBubbleNode(view).then((src) => {
        console.log('====================================')
        console.log(src)
        console.log('====================================')
      })
    })

    const view2dGeoAbles = viewerDocumentRef.current.getRoot().search({ type: 'geometry', role: '2d' })
    view2dGeoAbles.forEach((view) => {
      Autodesk.Viewing?.Thumbnails?.getUrlForBubbleNode(view).then((src) => {
        console.log(src)
      })
    })
    setListImgs(newListImgs)
  }
  return (
    <div className='relative h-full w-full'>
      <div ref={viewDomRef}></div>
      <div className='absolute bg-red-200 w-[200px] h-[500px] z-30'>
        <button onClick={handleLoad}>Load</button>
      </div>
    </div>
  )
}
