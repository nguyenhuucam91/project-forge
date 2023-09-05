import { ButtonPrimary } from 'src/components/ButtonComponent'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { Button } from '@mui/material'
import DocViewer, { DocViewerRenderers } from 'react-doc-viewer'
import { ReflexContainer, ReflexElement, ReflexSplitter } from 'react-reflex'
import 'react-reflex/styles.css'
import pdf from './samle.pdf'
import { useState } from 'react'
import DocumentTable from '../DocumentTable'
import PopoverAddNewFile from '../PopoverAddNewFile'
import ButtonHeader from '../Button'
import { ReactComponent as IconOpen } from '../../assets/icon-open.svg'
import { ReactComponent as IconDownload } from '../../assets/icon-download.svg'
import { ReactComponent as IconDelete } from '../../assets/icon-delete.svg'
import { ReactComponent as IconLink } from '../../assets/icon-link.svg'
import { ReactComponent as IconRename } from '../../assets/icon-rename.svg'
import { ReactComponent as IconMove } from '../../assets/icon-move.svg'
import useDocument from '../../hooks/useDocument'

const docs = [
  { uri: pdf } // Local File
]
const minSizeLeftPanel = 790
const maxSizeLeftPanel = window.innerWidth * 0.7
const height = window.innerHeight - 184

export default function DocumentView({
  files
}: {
  files:
    | {
        id: number
        file_name: string
        version: number
      }[]
    | undefined
}) {
  const [preview, setPreview] = useState(true)
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedFileIds, setSelectedFileIds] = useState([])
  console.log('🚀 ~ file: index.tsx:41 ~ selectedFile:', selectedFileIds)
  const { handleOpenFile } = useDocument(selectedFileIds[0] || '0')

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleOpenFolder = (event: any) => {
    setAnchorEl(event.currentTarget)
  }
  return (
    <div className='w-full h-full col-span-7 flex flex-col'>
      {/* Header */}
      <div className='flex w-full justify-between h-[50px] pb-3 items-center'>
        <div>
          <ButtonPrimary onClick={handleOpenFolder}>Upload files</ButtonPrimary>
          <Button variant='contained' sx={{ height: '36px', padding: '0 0', minWidth: '26px', marginLeft: '6px' }}>
            <KeyboardArrowDownIcon sx={{ margin: '0px' }} />
          </Button>
        </div>
        {selectedFileIds !== null && selectedFileIds?.length === 1 && (
          <div className='hidden md2:block'>
            <div className='flex items-center justify-center gap-2 h-12 py-0 px-2 bg-white rounded-md shadow-md'>
              <ButtonHeader content='Open' icon={<IconOpen></IconOpen>} onClick={handleOpenFile}></ButtonHeader>
              <ButtonHeader content='Rename' icon={<IconRename></IconRename>}></ButtonHeader>
              <ButtonHeader content='Move' icon={<IconMove></IconMove>}></ButtonHeader>
              <ButtonHeader content='Copy link' icon={<IconLink></IconLink>}></ButtonHeader>
              <ButtonHeader content='Delete' icon={<IconDelete></IconDelete>}></ButtonHeader>
              <ButtonHeader content='Download' icon={<IconDownload></IconDownload>}></ButtonHeader>
            </div>
          </div>
        )}
        {selectedFileIds !== null && selectedFileIds?.length > 1 && (
          <div className='hidden md2:block'>
            <div className='flex items-center justify-center gap-2 h-12 py-0 px-2 bg-white rounded-md shadow-md '>
              <ButtonHeader content='Move' icon={<IconMove></IconMove>}></ButtonHeader>
              <ButtonHeader content='Copy link' icon={<IconLink></IconLink>}></ButtonHeader>
              <ButtonHeader content='Delete' icon={<IconDelete></IconDelete>}></ButtonHeader>
              <ButtonHeader content='Download' icon={<IconDownload></IconDownload>}></ButtonHeader>
            </div>
          </div>
        )}
        <ButtonPrimary onClick={() => setPreview(!preview)}>Preview</ButtonPrimary>
      </div>
      {/* Content */}
      {preview && (
        <div className='w-full flex-1 bg-white rounded-md shadow-sm'>
          {files && files?.length > 0 && (
            <DocumentTable files={files} setSelectedFile={setSelectedFileIds}></DocumentTable>
          )}
        </div>
      )}

      {!preview && (
        <div className='w-full flex-1 bg-white rounded-md shadow-sm'>
          <ReflexContainer orientation='vertical' className='h-full'>
            <ReflexElement minSize={minSizeLeftPanel} maxSize={maxSizeLeftPanel} flex={0.3}>
              <div className='w-full h-full'>
                {files && files?.length > 0 && (
                  <DocumentTable files={files} setSelectedFile={setSelectedFileIds}></DocumentTable>
                )}
              </div>
            </ReflexElement>
            <ReflexSplitter propagate={true} className=' customSplitter' />
            <ReflexElement>
              <DocViewer
                documents={docs}
                pluginRenderers={DocViewerRenderers}
                style={{ height: `${height}px` }}
              ></DocViewer>
              {/* <div className='h-full w-full bg-red-50'></div> */}
            </ReflexElement>
          </ReflexContainer>
        </div>
      )}
      <PopoverAddNewFile anchorElement={anchorEl} handleClose={handleClose}></PopoverAddNewFile>
    </div>
  )
}
