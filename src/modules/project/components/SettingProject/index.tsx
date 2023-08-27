import { Dialog } from '@mui/material'
import ModifyProject from './ModifyProject'
import { ButtonPrimary, ButtonSecondary } from 'src/components/ButtonComponent'
import TableMember from './TableMemeber'
import { useFormik } from 'formik'
import ProjectType from 'src/types/project.type'
import { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import projectServices from '../../services/project.service'
import { setUnprocessableEntityErrorToForm } from 'src/utils/utilsError'
import queryKeys from 'src/config/queryKeys'

interface SettingProjectType {
  open: boolean
  handleOK?: () => void
  handleClose: () => void
  project: ProjectType
}

interface ProjectFormValue {
  project_name: string
  project_description: string
}

type ProjectError =
  | {
      [key in keyof ProjectFormValue]: string
    }
  | null

export default function SettingProject({ open, handleClose, project }: SettingProjectType) {
  const [file, setFile] = useState<File>()
  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: (projectData: FormData) => projectServices.modifyProject(project._id, projectData)
  })

  const formik = useFormik<ProjectFormValue>({
    initialValues: {
      project_name: project?.project_name || '',
      project_description: project?.project_description || ''
    },
    onSubmit: (values) => {
      const form = new FormData()
      form.append('project_image', file as Blob)
      form.append('project_name', values.project_name)
      form.append('project_description', values.project_description)

      mutate(form, {
        onError: (error) => {
          setUnprocessableEntityErrorToForm<ProjectError, ProjectFormValue>(error, formik.setErrors)
        },
        onSuccess: () => {
          formik.resetForm()
          handleClose()
          queryClient.invalidateQueries({ queryKey: [queryKeys.projects.list] })
        }
      })
    },
    enableReinitialize: true
  })

  return (
    <Dialog open={open} onClose={handleClose} sx={{ zIndex: 30 }} maxWidth='md'>
      <div className='rounded' style={{ maxWidth: `${800}px` }}>
        {/* title */}
        <div className='px-4 h-11 flex items-center'>
          <h3 className='text-lg font-medium'>Setting Project</h3>
        </div>
        <div className='px-6 py-3 w-full border-b flex flex-col justify-center items-center'>
          <ModifyProject formik={formik} imgSrc={project?.project_image} file={file} setFile={setFile}></ModifyProject>
          <TableMember project={project}></TableMember>
        </div>
        <div className=' p-4 flex flex-row-reverse items-center justify-center gap-4'>
          <ButtonSecondary onClick={handleClose}>Cancel</ButtonSecondary>
          <ButtonPrimary
            onClick={() => {
              formik.handleSubmit()
            }}
            type='submit'
          >
            OK
          </ButtonPrimary>
        </div>
      </div>
    </Dialog>
  )
}
