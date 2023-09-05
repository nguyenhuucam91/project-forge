import { useTitle } from 'react-use'
import DocumentNavbar from './components/DocumentNavbar'
import DocumentView from './components/DocumentView'
import { useMemo, useState } from 'react'

const folders = [
  {
    _id: 1,
    folder_name: 'folder 1',
    files: [
      {
        id: 1.1,
        file_name: 'structure 1',
        version: 0
      },
      {
        id: 1.2,
        file_name: 'structure 2',
        version: 0
      },
      {
        id: 1.3,
        file_name: 'structure 3',
        version: 0
      },
      {
        id: 1.4,
        file_name: 'structure 4',
        version: 0
      },
      {
        id: 1.5,
        file_name: 'structure 5',
        version: 0
      }
    ]
  },
  {
    _id: 2,
    folder_name: 'folder 2',
    files: [
      {
        id: 2.1,
        file_name: 'structure 1',
        version: 0
      },
      {
        id: 2.2,
        file_name: 'structure 2',
        version: 0
      },
      {
        id: 2.3,
        file_name: 'structure 3',
        version: 0
      },
      {
        id: 2.4,
        file_name: 'structure 4',
        version: 0
      },
      {
        id: 2.5,
        file_name: 'structure 5',
        version: 0
      }
    ]
  },
  {
    _id: 3,
    folder_name: 'folder 3',
    files: [
      {
        id: 3.1,
        file_name: 'structure 1',
        version: 0
      },
      {
        id: 3.2,
        file_name: 'structure 3',
        version: 0
      },
      {
        id: 3.3,
        file_name: 'structure 3',
        version: 0
      },
      {
        id: 3.4,
        file_name: 'structure 4',
        version: 0
      },
      {
        id: 3.5,
        file_name: 'structure 5',
        version: 0
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
  return (
    <div className=' w-full h-full flex flex-col bg-gray-200'>
      <div className=' h-full w-full grid xl:grid-cols-8 grid-cols-1 gap-3 flex-1 p-3'>
        <DocumentNavbar
          folders={folders}
          openFolderId={openFolderId}
          setOpenFolderId={setOpenFolderId}
        ></DocumentNavbar>

        <DocumentView files={files}></DocumentView>
      </div>
    </div>
  )
}
