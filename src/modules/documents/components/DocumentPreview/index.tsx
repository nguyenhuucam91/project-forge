import DocViewer, { DocViewerRenderers } from 'react-doc-viewer'
import pdf from './samle.pdf'
import ForgePreview from '../ForgePreview'
const docs = [
  { uri: pdf } // Local File
]

const height = window.innerHeight - 210
export default function DocumentPreview({ width, type }: { width: number; type: string }) {
  console.log('🚀 ~ file: index.tsx:10 ~ DocumentPreview ~ type:', type)
  return (
    <>
      {type === 'pdf' && (
        <DocViewer documents={docs} pluginRenderers={DocViewerRenderers} style={{ height: `${height}px` }}></DocViewer>
      )}
      {type === 'rvt' && (
        <ForgePreview
          width={width}
          urn='urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6bG5lMWRpd3p1enpudGNocWtmaGt5NmE0ZHpsZnRydHYtYmFzaWMtYXBwLyVFNCVCQiU5NSVFNSU4RiVBMyVFNSU4NiU4NSVFNyVCNCU4RCVFMyU4MSVCRSVFMyU4MiU4QSVFNSU5QiVCMyUyMDExMSgxKS5ydnQ'
        ></ForgePreview>
      )}
    </>
  )
}
