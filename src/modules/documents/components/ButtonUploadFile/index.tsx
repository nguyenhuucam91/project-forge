import { useRef } from 'react'
import toast from 'react-hot-toast'
import { useMutation } from 'react-query'
import { ButtonPrimary } from 'src/components/ButtonComponent'
import { documentService } from '../../services/document.service'
import { useParams } from 'react-router'
import useRefreshQuery from 'src/hook/useRefreshQuery'
import queryKeys from 'src/config/queryKeys'

interface ButtonUploadFileType {
  folder_id: string
}

export default function ButtonUploadFile({ folder_id }: ButtonUploadFileType) {
  const { projectId } = useParams()
  const inputFile = useRef<HTMLInputElement>(null)
  const { refreshQuery } = useRefreshQuery([queryKeys.projects.Project])

  const { mutate } = useMutation({
    mutationFn: (file: FormData) => documentService.uploadFile(projectId as string, folder_id, file)
  })

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileFromLocal = event.target.files?.[0]
    inputFile.current?.setAttribute('value', '')
    const fileExtension = fileFromLocal?.name.substring(fileFromLocal.name.length - 3, fileFromLocal.name.length)

    if (
      fileFromLocal &&
      (fileFromLocal.size >= 10485760 * 2 || !['rvt', 'dwg', 'pdf'].includes(fileExtension as string))
    ) {
      toast.error(`Maximum file size is 20 MB. Format: .rvt, .dwg, .pdf`, {
        position: 'top-center'
      })
    } else {
      const form = new FormData()
      form.append('file', fileFromLocal as Blob)
      mutate(form, {
        onError: () => {
          toast.error('Upload file failed')
        },
        onSuccess: () => {
          toast.success('Upload file success')
          refreshQuery()
        }
      })
    }
  }
  const handleOpenFolder = () => {
    if (!folder_id) {
      toast.error('Please select folder before upload file')
      return
    }
    inputFile.current?.click()
  }
  return (
    <div>
      <ButtonPrimary onClick={handleOpenFolder}>Upload file</ButtonPrimary>
      <input
        type='file'
        ref={inputFile}
        className='hidden'
        accept='.rvt, .dwg, .pdf'
        onChange={onFileChange}
        onClick={(event) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ;(event.target as any).value = null
        }}
      ></input>
    </div>
  )
}
