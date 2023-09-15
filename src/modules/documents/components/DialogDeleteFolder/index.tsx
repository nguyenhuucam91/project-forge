import { useMutation } from 'react-query'
import { documentService } from '../../services/document.service'
import { useParams } from 'react-router'
import toast from 'react-hot-toast'
import { DialogDanger } from 'src/components/DialogComponent'
import useRefreshQuery from 'src/hook/useRefreshQuery'
import queryKeys from 'src/config/queryKeys'

interface DeleteFolder {
  folder_id: string
  open: boolean
  handleClose: () => void
}
export default function DialogDeleteFolder({ folder_id, open, handleClose }: DeleteFolder) {
  const { projectId } = useParams()
  const { refreshQuery } = useRefreshQuery([queryKeys.projects.Project])
  const { mutate } = useMutation({
    mutationFn: (folder_id: string) => documentService.deleteFolder(projectId as string, folder_id)
  })

  const handleCreateFolder = async () => {
    mutate(folder_id, {
      onError: () => {
        toast.error('Delete Folder Failed')
      },
      onSuccess: () => {
        toast.success('Delete Folder Success')
        refreshQuery()
        handleClose()
      }
    })
  }
  return (
    <DialogDanger
      open={open}
      handleClose={() => {
        handleClose()
      }}
      handleOK={handleCreateFolder}
    >
      <span className='font-medium'>Do you want delete this folder?</span>
    </DialogDanger>
  )
}
