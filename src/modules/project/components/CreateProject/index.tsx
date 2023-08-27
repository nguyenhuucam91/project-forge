import { useRef, useState, useMemo } from 'react'
import InputComponent from 'src/components/InputComponent'
import { Formik, FormikErrors, FormikProps, FormikState } from 'formik'
import ButtonSecondary from 'src/components/ButtonComponent/ButtonSecondary'
import createProjectSchema from './createProject.schema'
import projectServices from '../../services/project.service'
import toast from 'react-hot-toast'
import { setUnprocessableEntityErrorToForm } from 'src/utils/utilsError'
import { DialogBase } from 'src/components/DialogComponent'
import { useMutation, useQueryClient } from 'react-query'
import queryKeys from 'src/config/queryKeys'

interface CreateProject {
  open: boolean
  handleClose: () => void
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

export default function CreateProject({ open, handleClose }: CreateProject) {
  const initialValues: ProjectFormValue = { project_name: '', project_description: '' }
  const inputFile = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<File>()

  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: (project: FormData) => projectServices.createProject(project)
  })

  const handleCreateProject = async (
    values: ProjectFormValue,
    setErrors: (errors: FormikErrors<ProjectFormValue>) => void,
    resetForm: (nextState?: Partial<FormikState<ProjectFormValue>> | undefined) => void
  ) => {
    if (!values.project_name) {
      setErrors({
        project_name: 'Project name is required'
      })
      return
    }
    const form = new FormData()
    form.append('project_image', file as Blob)
    form.append('project_name', values.project_name)
    form.append('project_description', values.project_description)

    mutate(form, {
      onError: (error) => {
        setUnprocessableEntityErrorToForm<ProjectError, ProjectFormValue>(error, setErrors)
      },
      onSuccess: () => {
        resetForm()
        handleClose()
        queryClient.invalidateQueries({ queryKey: [queryKeys.projects] })
      }
    })
  }

  const handleBrowserImage = () => {
    inputFile.current?.click()
  }

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileFromLocal = event.target.files?.[0]
    inputFile.current?.setAttribute('value', '')
    console.log(fileFromLocal?.size)

    if (fileFromLocal && (fileFromLocal.size >= 1048576 || !fileFromLocal.type.includes('image'))) {
      toast.error(`Dụng lượng file tối đa 1 MB. Định dạng:.JPEG, .PNG`, {
        position: 'top-center'
      })
    } else {
      setFile(fileFromLocal)
    }
  }

  const previewImage = useMemo(() => {
    return file ? URL.createObjectURL(file) : ''
  }, [file])

  return (
    <Formik initialValues={initialValues} validationSchema={createProjectSchema} onSubmit={() => {}}>
      {({ values, handleChange, errors, setErrors, resetForm }: FormikProps<ProjectFormValue>) => (
        <DialogBase
          open={open}
          handleClose={() => {
            handleClose()
            resetForm()
          }}
          handleOK={() => {
            handleCreateProject(values, setErrors, resetForm)
          }}
          title='Create Project Profile'
          width={600}
        >
          <div className='flex items-start justify-between gap-10'>
            <div className='space-y-2'>
              <div className=' flex flex-col gap-2'>
                <label htmlFor='project_name' className='text-text_primary'>
                  Project Name
                </label>
                <div>
                  <InputComponent
                    id='project_name'
                    name='project_name'
                    value={values.project_name}
                    onChange={handleChange}
                  ></InputComponent>
                  <div className='w-full h-[16px] mt-1'>
                    {errors.project_name && <span className='text-sm text-red-500'>{errors.project_name}</span>}
                  </div>
                </div>
              </div>
              <div className=' flex flex-col gap-2'>
                <label htmlFor='project_description' className='text-text_primary'>
                  Project Description
                </label>
                <InputComponent
                  id='project_description'
                  name='project_description'
                  value={values.project_description}
                  onChange={handleChange}
                ></InputComponent>
                <div className='w-full h-[16px]mt-1'>
                  {errors.project_description && (
                    <span className='text-sm text-red-500'>{errors.project_description}</span>
                  )}
                </div>
              </div>
            </div>
            <div>
              <h3 className='text-base text-text_primary mb-2 leading-[16px]'>Project Image</h3>
              <div className='flex gap-3'>
                <div className='w-[100px] h-[100px] bg-slate-400 rounded-md overflow-hidden'>
                  <img
                    src={previewImage || ''}
                    alt='project_image'
                    className='h-full w-full object-cover rounded-md'
                  ></img>
                </div>
                <div>
                  <div className='flex flex-col gap-3'>
                    <span className='text-sm text-text_primary'>Select image to upload</span>
                    <span className='text-[12px] text-text_secondary mb-[8px]'>JPEG, PNG file (1MB max)</span>
                    <input
                      type='file'
                      ref={inputFile}
                      className='hidden'
                      accept='.jpeg, .png'
                      onChange={onFileChange}
                      onClick={(event) => {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        ;(event.target as any).value = null
                      }}
                    ></input>
                    <ButtonSecondary sx={{ maxWidth: '96px' }} onClick={handleBrowserImage}>
                      Browser
                    </ButtonSecondary>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogBase>
      )}
    </Formik>
  )
}
