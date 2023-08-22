import DialogBase from 'src/components/DialogComponent/DialogBase'
import InputComponent from 'src/components/InputComponent'
import { Formik, FormikProps } from 'formik'
import ButtonSecondary from 'src/components/ButtonComponent/ButtonSecondary'
import createProjectSchema from './createProject.schema'
import projectAdminServices from '../../services/admin.services'
import toast from 'react-hot-toast'

interface CreateProject {
  open: boolean
  handleClose: () => void
}

interface CreateProjectValues {
  project_name: string
  project_description: string
}

export default function CreateProject({ open, handleClose }: CreateProject) {
  const initialValues: CreateProjectValues = { project_name: '', project_description: '' }

  const handleCreateProject = async (values: CreateProjectValues) => {
    try {
      const res = await projectAdminServices.createProject(values)
      if (res?.success) {
        toast(res.message)
      }
    } catch (error) {
      toast.error('Tao du an khong thanh cong')
    }
  }
  return (
    <Formik initialValues={initialValues} validationSchema={createProjectSchema} onSubmit={handleCreateProject}>
      {({ values, handleChange }: FormikProps<CreateProjectValues>) => (
        <DialogBase
          open={open}
          handleClose={handleClose}
          handleOK={() => handleCreateProject(values)}
          title='Create Project Profile'
          width={600}
        >
          <div className='flex items-start justify-between gap-10'>
            <div className='space-y-4'>
              <div className=' flex flex-col gap-2'>
                <label htmlFor='project_name' className='text-text_primary'>
                  Project Name
                </label>
                <InputComponent
                  id='project_name'
                  name='project_name'
                  value={values.project_name}
                  onChange={handleChange}
                ></InputComponent>
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
