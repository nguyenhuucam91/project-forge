import { useState } from 'react'
import { useMutation } from 'react-query'
import { DialogBase } from 'src/components/DialogComponent'
import InputComponent from 'src/components/InputComponent'
import { documentService } from '../../services/document.service'
import { useParams } from 'react-router'
import toast from 'react-hot-toast'
import useRefreshQuery from 'src/hook/useRefreshQuery'
import queryKeys from 'src/config/queryKeys'
import FileType from 'src/types/file.type'

interface ModifyFolder {
  file: FileType
  open: boolean
  handleClose: () => void
}
export default function DialogModifyFileName({ file, open, handleClose }: ModifyFolder) {
  console.log('🚀 ~ file: index.tsx:18 ~ DialogModifyFileName ~ file:', file)
  const [fileName, setFileName] = useState(file.file_name)
  const { projectId } = useParams()
  const { refreshQuery } = useRefreshQuery([queryKeys.projects.Project])

  const { mutate } = useMutation({
    mutationFn: (fileName: string) => documentService.modifyFileName(projectId as string, file._id, fileName)
  })

  const handleCreateFolder = async () => {
    if (fileName === '') {
      toast.error('File Name is required')
    }
    mutate(fileName, {
      onError: () => {
        toast.error('Modify file name failed')
      },
      onSuccess: () => {
        toast.success('Modify file name success')
        handleClose()
        setFileName('')
        refreshQuery()
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
      title='Modify File Name'
      width={600}
    >
      <div className='flex flex-col justify-between items-start gap-2 w-[400px]'>
        <label htmlFor='name' className='text-sm font-medium'>
          File Name
        </label>
        <InputComponent value={fileName} onChange={(e) => setFileName(e.target.value)} id='name' fullWidth />
      </div>
    </DialogBase>
  )
}
