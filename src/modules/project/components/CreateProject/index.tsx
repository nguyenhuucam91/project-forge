import DialogBase from 'src/components/DialogComponent/DialogBase'
import InputComponent from 'src/components/InputComponent'
import { Formik, FormikErrors, FormikProps } from 'formik'
import ButtonSecondary from 'src/components/ButtonComponent/ButtonSecondary'
import createProjectSchema from './createProject.schema'
import projectAdminServices from '../../services/admin.service'
import toast from 'react-hot-toast'
import { setUnprocessableEntityErrorToForm } from 'src/utils/utilsError'

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
  const handleCreateProject = async (
    values: ProjectFormValue,
    setErrors: (errors: FormikErrors<ProjectFormValue>) => void
  ) => {
    if (!values.project_name) {
      setErrors({
        project_name: 'Project name is required'
      })
      return
    }
    try {
      const res = await projectAdminServices.createProject(values)
      if (res?.success) {
        toast.success(res.message)
      }
    } catch (error) {
      setUnprocessableEntityErrorToForm<ProjectError, ProjectFormValue>(error, setErrors)
    }
  }

  return (
    <Formik initialValues={initialValues} validationSchema={createProjectSchema} onSubmit={() => {}}>
      {({ values, handleChange, errors, setErrors }: FormikProps<ProjectFormValue>) => (
        <DialogBase
          open={open}
          handleClose={handleClose}
          handleOK={() => handleCreateProject(values, setErrors)}
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
                <div className='w-[100px] h-[100px] bg-slate-400 rounded-md'></div>
                <div>
                  <div className='flex flex-col gap-3'>
                    <span className='text-sm text-text_primary'>Select image to upload</span>
                    <span className='text-[12px] text-text_secondary mb-[8px]'>JPEG, PNG file (3MB max)</span>
                    <ButtonSecondary sx={{ maxWidth: '96px' }}>Browser</ButtonSecondary>
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
