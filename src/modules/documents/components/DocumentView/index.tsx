import { ButtonPrimary } from 'src/components/ButtonComponent'
import { ReflexContainer, ReflexElement, ReflexSplitter } from 'react-reflex'
import 'react-reflex/styles.css'
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
import DocumentPreview from '../DocumentPreview'
import { Breadcrumbs } from '@mui/material'

const minSizeLeftPanel = 790
const maxSizeLeftPanel = window.innerWidth * 0.7

export default function DocumentView({
  files,
  selectedFolderName
}: {
  files:
    | {
        id: number
        file_name: string
        extension: string
        version: number
      }[]
    | undefined
  selectedFolderName: string
}) {
  const [preview, setPreview] = useState(true)
  const [anchorEl, setAnchorEl] = useState(null)
  const [previewWidth, setPreviewWidth] = useState<number>(0)
  const [selectedFileIds, setSelectedFileIds] = useState([])

  const { handleOpenFile } = useDocument(selectedFileIds[0] || '0')
  const getSelectedFileType = () => {
    if (selectedFileIds.length !== 1) {
      return ''
    }
    const file = files?.find((f) => f.id === selectedFileIds[0])
    if (file) {
      return file.extension
    }
    return ''
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleOpenFolder = (event: any) => {
    setAnchorEl(event.currentTarget)
  }

  const handleResize = (e: any) => {
    if (e.domElement) {
      const width = e.domElement.getBoundingClientRect().width
      setPreviewWidth(width)
    }
  }
  return (
    <div className='w-full h-full col-span-7 flex flex-col '>
      {/* Header */}
      <div className='flex w-full justify-between h-[50px] pb-3 items-center'>
        <div>
          <ButtonPrimary onClick={handleOpenFolder}>Upload files</ButtonPrimary>
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
              <ButtonHeader content='Delete' icon={<IconDelete></IconDelete>}></ButtonHeader>
              <ButtonHeader content='Download' icon={<IconDownload></IconDownload>}></ButtonHeader>
            </div>
          </div>
        )}
        <ButtonPrimary onClick={() => setPreview(!preview)}>Preview</ButtonPrimary>
      </div>
      {/* Content */}
      <div className='pb-2'>
        <Breadcrumbs aria-label='breadcrumb'>
          <button>Project</button>
          <button className='font-medium text-primary-700'>{selectedFolderName}</button>
        </Breadcrumbs>
      </div>
      {preview && (
        <div className='w-full flex-1 bg-white rounded-md shadow-lg border'>
          {files && files?.length > 0 && (
            <DocumentTable
              files={files}
              setSelectedFile={setSelectedFileIds}
              selectedFileIds={selectedFileIds}
            ></DocumentTable>
          )}
        </div>
      )}

      {!preview && (
        <div className='w-full flex-1 bg-white rounded-md shadow-lg border'>
          <ReflexContainer orientation='vertical' className='h-full'>
            <ReflexElement minSize={minSizeLeftPanel} maxSize={maxSizeLeftPanel} flex={0.3}>
              <div className='w-full h-full'>
                {files && files?.length > 0 && (
                  <DocumentTable
                    files={files}
                    setSelectedFile={setSelectedFileIds}
                    selectedFileIds={selectedFileIds}
                  ></DocumentTable>
                )}
              </div>
            </ReflexElement>
            <ReflexSplitter
              propagate={true}
              className=' customSplitter'
              onResize={handleResize}
              onStopResize={handleResize}
            />
            <ReflexElement>
              <DocumentPreview width={previewWidth} type={getSelectedFileType()}></DocumentPreview>
            </ReflexElement>
          </ReflexContainer>
        </div>
      )}
      <PopoverAddNewFile anchorElement={anchorEl} handleClose={handleClose}></PopoverAddNewFile>
    </div>
  )
}
