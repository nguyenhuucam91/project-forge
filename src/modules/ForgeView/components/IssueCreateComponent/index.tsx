import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import { Formik, FormikHelpers, FormikProps } from 'formik'
import { ButtonPrimary, ButtonSecondary } from 'src/components/ButtonComponent'
import DatePickerComponent from 'src/components/DatePickerComponent'
import InputComponent from 'src/components/InputComponent'
import SelectComponent from 'src/components/SelectComponent'
import { IssueType } from 'src/types/issue.type'

export default function IssueCreateComponent() {
  const initialValues: IssueType = {
    status: '',
    type: '',
    title: '',
    owner_id: '',
    assigned_id: '',
    due_date: '',
    update_at: ''
  }
  const handleLogin = async (values: IssueType, { setErrors }: FormikHelpers<IssueType>) => {
    console.log('====================================')
    console.log(values)
    console.log('====================================')
  }
  return (
    <div className='w-full h-full'>
      {/* header */}
      <div className='flex flex-col gap-3 ml-3 border-b'>
        <ChevronLeftIcon></ChevronLeftIcon>
        <span className='text-lg text-text_secondary font-bold'>New Issue</span>
      </div>
      {/* Contents */}
      <Formik initialValues={initialValues} onSubmit={handleLogin}>
        {({ values, handleChange, errors, handleSubmit }: FormikProps<IssueType>) => (
          <div className=' p-5'>
            <label htmlFor='type' className='block mb-2 text-sm font-medium text-gray-900 '>
              Type
            </label>
            <SelectComponent
              value={values.type}
              name='type'
              id='type'
              options={[
                {
                  value: 'Public',
                  label: 'Public'
                },
                {
                  value: 'Private',
                  label: 'Private'
                }
              ]}
              fullWidth
              className='w-full'
              handleChange={handleChange}
            ></SelectComponent>
            <div className='h-4 w-full py-1 mb-3'>
              {errors.type && <span className='text-sm text-red-400'>{errors.type}</span>}
            </div>

            <label htmlFor='status' className='block mb-2 text-sm font-medium text-gray-900 '>
              Status
            </label>
            <SelectComponent
              value={values.status}
              name='status'
              id='status'
              options={[
                {
                  value: 'open',
                  label: 'open'
                },
                {
                  value: 'close',
                  label: 'close'
                }
              ]}
              fullWidth
              handleChange={handleChange}
            ></SelectComponent>
            <div className='h-4 w-full py-1 mb-3'>
              {errors.status && <span className='text-sm text-red-400'>{errors.status}</span>}
            </div>

            <label htmlFor='title' className='block mb-2 text-sm font-medium text-gray-900 '>
              Title
            </label>
            <InputComponent
              fullWidth
              value={values.title}
              name='title'
              id='title'
              onChange={handleChange}
            ></InputComponent>
            <div className='h-4 w-full py-1 mb-3'>
              {errors.title && <span className='text-sm text-red-400'>{errors.title}</span>}
            </div>
            <br></br>
            <label htmlFor='assigned_id' className='block mb-2 text-sm font-medium text-gray-900 '>
              Assign To
            </label>
            <InputComponent
              fullWidth
              value={values.assigned_id}
              name='assigned_id'
              id='assigned_id'
              onChange={handleChange}
            ></InputComponent>
            <div className='h-4 w-full py-1 mb-3'>
              {errors.assigned_id && <span className='text-sm text-red-400'>{errors.assigned_id}</span>}
            </div>

            <label htmlFor='due_date' className='block mb-2 text-sm font-medium text-gray-900 '>
              Due Date
            </label>
            <DatePickerComponent
              name='due_date'
              id='due_date'
              value={errors.due_date as string}
              handleChange={handleChange}
            ></DatePickerComponent>
            <div className='h-4 w-full py-1 mb-3'>
              {errors.due_date && <span className='text-sm text-red-400'>{errors.due_date}</span>}
            </div>

            <div className='w-full flex items-center justify-end gap-4'>
              <ButtonSecondary>Cancel</ButtonSecondary>
              <ButtonPrimary onClick={() => handleSubmit()}>Create</ButtonPrimary>
            </div>
          </div>
        )}
      </Formik>
    </div>
  )
}
