import { useTitle } from 'react-use'
import DocumentNavbar from './components/DocumentNavbar'
import DocumentView from './components/DocumentView'
import { useMemo, useState } from 'react'
import { useQuery } from 'react-query'
import queryKeys from 'src/config/queryKeys'
import { useParams } from 'react-router'
import { documentService } from './services/document.service'
import { FolderType } from 'src/types/folder.type'
import FileType from 'src/types/file.type'

export default function Documents() {
  useTitle('Project Documents')
  const [openFolderId, setOpenFolderId] = useState<string>('')
  const { projectId } = useParams()
  const { data: project } = useQuery({
    queryKey: [queryKeys.projects.Project],
    queryFn: () => documentService.getProjectData(projectId as string)
  })

  const files = useMemo(() => {
    return project?.folders.find((folder) => folder._id.toString() === openFolderId)?.files
  }, [openFolderId, project?.folders])

  const folderName = useMemo(() => {
    return project?.folders.find((folder) => folder._id.toString() === openFolderId)?.folder_name || ''
  }, [openFolderId, project?.folders])

  return (
    <div className=' w-full h-full flex flex-col '>
      <div className=' h-full w-full grid xl:grid-cols-8 grid-cols-1 gap-3 flex-1 p-3'>
        <DocumentNavbar
          folders={project?.folders as FolderType[]}
          openFolderId={openFolderId}
          setOpenFolderId={setOpenFolderId}
        ></DocumentNavbar>
        <DocumentView
          files={files as FileType[]}
          selectedFolderName={folderName}
          selectedFolderId={openFolderId}
        ></DocumentView>
      </div>
    </div>
  )
}
