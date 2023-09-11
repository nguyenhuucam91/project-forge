import { useTitle } from 'react-use'
import DocumentNavbar from './components/DocumentNavbar'
import DocumentView from './components/DocumentView'
import { useMemo, useState } from 'react'

const folders = [
  {
    _id: 1,
    folder_name: 'Structure',
    files: [
      {
        id: '64ecbd931495ac98c090fb92',
        file_name: 'structure 1',
        version: 0,
        extension: 'rvt'
      },
      {
        id: 12,
        file_name: 'structure 2',
        version: 1,
        extension: 'dwg'
      },
      {
        id: 13,
        file_name: 'structure 3',
        version: 2,
        extension: 'nwd'
      },
      {
        id: 14,
        file_name: 'structure 4',
        version: 4,
        extension: 'rvt'
      },
      {
        id: 15,
        file_name: 'structure 5',
        version: 5,
        extension: 'pdf'
      }
    ]
  },
  {
    _id: 2,
    folder_name: 'Architecture',
    files: [
      {
        id: 21,
        file_name: 'architecture 1',
        version: 0,
        extension: 'pdf'
      },
      {
        id: 22,
        file_name: 'architecture 2',
        version: 0,
        extension: 'rvt'
      },
      {
        id: 23,
        file_name: 'architecture 3',
        version: 0,
        extension: 'rvt'
      },
      {
        id: 24,
        file_name: 'architecture 4',
        version: 0,
        extension: 'pdf'
      },
      {
        id: 25,
        file_name: 'architecture 5',
        version: 0,
        extension: 'rvt'
      }
    ]
  },
  {
    _id: 3,
    folder_name: 'MEP',
    files: [
      {
        id: 31,
        file_name: 'mep 1',
        version: 0,
        extension: 'rvt'
      },
      {
        id: 32,
        file_name: 'mep 3',
        version: 0,
        extension: 'pdf'
      },
      {
        id: 33,
        file_name: 'mep 3',
        version: 0,
        extension: 'rvt'
      },
      {
        id: 34,
        file_name: 'mep 4',
        version: 0,
        extension: 'pdf'
      },
      {
        id: 35,
        file_name: 'mep 5',
        version: 0,
        extension: 'rvt'
      }
    ]
  }
]

export default function Documents() {
  useTitle('Project Documents')
  const [openFolderId, setOpenFolderId] = useState<string>('')
  const files = useMemo(() => {
    return folders.find((folder) => folder._id.toString() === openFolderId)?.files
  }, [openFolderId])

  const folderName = useMemo(() => {
    return folders.find((folder) => folder._id.toString() === openFolderId)?.folder_name || ''
  }, [openFolderId])
  return (
    <div className=' w-full h-full flex flex-col '>
      <div className=' h-full w-full grid xl:grid-cols-8 grid-cols-1 gap-3 flex-1 p-3'>
        <DocumentNavbar
          folders={folders}
          openFolderId={openFolderId}
          setOpenFolderId={setOpenFolderId}
        ></DocumentNavbar>
        <DocumentView files={files} selectedFolderName={folderName}></DocumentView>
      </div>
    </div>
  )
}
