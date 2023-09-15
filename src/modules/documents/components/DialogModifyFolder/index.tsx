import { useState } from 'react'
import { useMutation } from 'react-query'
import { DialogBase } from 'src/components/DialogComponent'
import InputComponent from 'src/components/InputComponent'
import { documentService } from '../../services/document.service'
import { useParams } from 'react-router'
import toast from 'react-hot-toast'

interface ModifyFolder {
  folder_name: string
  folder_id: string
  open: boolean
  handleClose: () => void
}
export default function DialogModifyFolder({ folder_name, folder_id, open, handleClose }: ModifyFolder) {
  const [folderName, setFolderName] = useState(folder_name)
  const { projectId } = useParams()

  const { mutate } = useMutation({
    mutationFn: (folderName: string) => documentService.modifyFolder(projectId as string, folder_id, folderName)
  })

  const handleCreateFolder = async () => {
    if (folderName === '') {
      toast.error('Folder Name is required')
    }
    mutate(folderName, {
      onError: () => {
        toast.error('Folder name is exited')
      },
      onSuccess: () => {
        toast.success('Modify Folder Success')
        handleClose()
        setFolderName('')
      }
    })
  }
  return (
    <DialogBase
      open={open}
      handleClose={() => {
        handleClose()
      }}
      handleOK={handleCreateFolder}
      title='Modify Folder'
      width={600}
    >
      <div className='flex flex-col justify-between items-start gap-2 w-[400px]'>
        <label htmlFor='name' className='text-sm font-medium'>
          Folder Name
        </label>
        <InputComponent value={folderName} onChange={(e) => setFolderName(e.target.value)} id='name' fullWidth />
      </div>
    </DialogBase>
  )
}
