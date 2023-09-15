import DocViewer, { DocViewerRenderers } from 'react-doc-viewer'
import ForgePreview from '../ForgePreview'
import FileType from 'src/types/file.type'

const height = window.innerHeight - 210

export default function DocumentPreview({ width, file }: { width: number; file: FileType }) {
  return (
    <>
      {file?.file_ext === 'pdf' && (
        <DocViewer
          documents={[{ uri: file.urn }]}
          pluginRenderers={DocViewerRenderers}
          style={{ height: `${height}px` }}
          config={{ header: { disableFileName: true, disableHeader: true } }}
        ></DocViewer>
      )}
      {file?.file_ext === 'rvt' && <ForgePreview width={width} urn={file.urn}></ForgePreview>}
    </>
  )
}
