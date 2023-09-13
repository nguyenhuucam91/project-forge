import { useState } from 'react'
import { useMutation } from 'react-query'
import { DialogBase } from 'src/components/DialogComponent'
import InputComponent from 'src/components/InputComponent'
import { documentService } from '../../services/document.service'
import { useParams } from 'react-router'
import toast from 'react-hot-toast'

interface CreateProject {
  open: boolean
  handleClose: () => void
}
export default function DialogCreateFolder({ open, handleClose }: CreateProject) {
  const [folderName, setFolderName] = useState('')
  const { projectId } = useParams()
  console.log('🚀 ~ file: index.tsx:16 ~ DialogCreateFolder ~ projectId:', projectId)
  const { mutate } = useMutation({
    mutationFn: (folderName: string) => documentService.createFolder(projectId as string, folderName)
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
        toast.success('Add Folder Success')
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
      title='Create Folder'
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
