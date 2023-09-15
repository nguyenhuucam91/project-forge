import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import { Formik, FormikProps } from 'formik'
import { ButtonPrimary, ButtonSecondary } from 'src/components/ButtonComponent'
import DatePickerComponent from 'src/components/DatePickerComponent'
import FomikSelectComponent from 'src/components/FomikSelectComponent'
import InputComponent from 'src/components/InputComponent'
import { IssueType } from 'src/types/issue.type'
import SelectMarkup from '../SelectMarkup'
import IssueCreateSchema from './IssueCreateSchema'
import { useMutation, useQuery } from 'react-query'
import { forgeAPI } from '../../services/forge.service'
import { useParams } from 'react-router'
import toast from 'react-hot-toast'
import useRefreshQuery from 'src/hook/useRefreshQuery'
import queryKeys from 'src/config/queryKeys'
import { documentService } from 'src/modules/documents/services/document.service'
import { UserService } from 'src/services/user.service'
import ButtonUploadFile from '../ButtonUploadFile'

const initDate = new Date().toISOString().slice(0, 10)
export default function IssueModifyComponent({ handleClose, issue }: { handleClose: () => void; issue: IssueType }) {
  const user = UserService.getUser()
  const { projectId, docId } = useParams()
  const { refreshQuery } = useRefreshQuery([queryKeys.files.issues])

  const { mutate } = useMutation({
    mutationFn: (issueData: IssueType) =>
      forgeAPI.updateIssue(projectId as string, docId as string, issueData, issue._id as string)
  })
  const { data: project } = useQuery({
    queryKey: [queryKeys.projects.Project],
    queryFn: () => documentService.getProjectData(projectId as string)
  })

  const initialValues: IssueType = {
    status: issue.status || 'open',
    type: issue.type || 'high',
    title: issue.title || 'Issue 1',
    assigned_id: issue.assigned_id || '647dae8f4ad8a8f6b7f7b869',
    due_date: issue.due_date || initDate,
    markup_id: issue.markup_id || ''
  }

  const handleAddIssue = async (values: IssueType) => {
    mutate(values, {
      onError: () => {
        toast.error('Update Issue Failed')
        handleClose()
      },
      onSuccess: () => {
        toast.success('Update Issue Success')
        handleClose()
        refreshQuery()
      }
    })
  }
  return (
    <div className='w-full h-full'>
      {/* header */}
      <div className='flex gap-3 pl-3 border-b items-center h-[50px]'>
        <button onClick={handleClose}>
          <ChevronLeftIcon className=' text-text_secondary'></ChevronLeftIcon>
        </button>

        <span className='text-lg text-text_secondary font-bold'>Modify Issue</span>
      </div>
      {/* Contents */}
      <Formik initialValues={initialValues} onSubmit={handleAddIssue} validationSchema={IssueCreateSchema}>
        {({ values, handleChange, errors, handleSubmit, setFieldValue }: FormikProps<IssueType>) => (
          <div className=' p-5'>
            <label htmlFor='type' className='block mb-2 text-sm font-medium text-gray-900 '>
              Priority<span className='ml-1 text-red-600'>*</span>
            </label>
            <FomikSelectComponent
              value={values.type}
              name='type'
              id='type'
              options={[
                {
                  value: 'high',
                  label: 'High Priority'
                },
                {
                  value: 'low',
                  label: 'Low Priority'
                }
              ]}
              fullWidth
              disable={user?._id !== issue.owner_id}
              className='w-full'
              setFieldValue={setFieldValue}
            ></FomikSelectComponent>
            <div className='h-4 w-full py-1 mb-3'>
              {errors.type && <span className='text-sm text-red-400'>{errors.type}</span>}
            </div>

            <label htmlFor='status' className='block mb-2 text-sm font-medium text-gray-900 '>
              Status<span className='ml-1 text-red-600'>*</span>
            </label>
            <FomikSelectComponent
              value={values.status}
              name='status'
              id='status'
              options={[
                {
                  value: 'open',
                  label: 'Open'
                },
                {
                  value: 'close',
                  label: 'Close'
                }
              ]}
              fullWidth
              setFieldValue={setFieldValue}
              disable={user?._id !== issue.owner_id}
            ></FomikSelectComponent>
            <div className='h-4 w-full py-1 mb-3'>
              {errors.status && <span className='text-sm text-red-400'>{errors.status}</span>}
            </div>

            <label htmlFor='title' className='block mb-2 text-sm font-medium text-gray-900 '>
              Title<span className='ml-1 text-red-600'>*</span>
            </label>
            <InputComponent
              disabled={user?._id !== issue.owner_id}
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
              Assign To<span className='ml-1 text-red-600'>*</span>
            </label>
            <FomikSelectComponent
              value={values.assigned_id}
              name='assigned_id'
              id='assigned_id'
              options={
                project?.shared_users?.map((user) => {
                  return {
                    value: user.user_id,
                    label: user.email
                  }
                }) || []
              }
              fullWidth
              className='w-full'
              disable={user?._id !== issue.owner_id}
              setFieldValue={setFieldValue}
            ></FomikSelectComponent>
            <div className='h-4 w-full py-1 mb-3'>
              {errors.assigned_id && <span className='text-sm text-red-400'>{errors.assigned_id}</span>}
            </div>

            <label htmlFor='due_date' className='block mb-2 text-sm font-medium text-gray-900 '>
              Due Date<span className='ml-1 text-red-600'>*</span>
            </label>
            <DatePickerComponent
              name='due_date'
              value={errors.due_date as string}
              setFieldValue={setFieldValue}
              disable={user?._id !== issue.owner_id}
            ></DatePickerComponent>
            <div className='h-4 w-full py-1 mb-3'>
              {errors.due_date && <span className='text-sm text-red-400'>{errors.due_date}</span>}
            </div>
            <label htmlFor='due_date' className='block mb-2 text-sm font-medium text-gray-900 '>
              Markup
            </label>

            <SelectMarkup
              value={values.markup_id}
              name='markup_id'
              disable={user?._id !== issue.owner_id}
              setFieldValue={setFieldValue}
            ></SelectMarkup>
            <div className='h-4 w-full py-1 mb-3'>
              {errors.markup_id && <span className='text-sm text-red-400'>{errors.markup_id}</span>}
            </div>
            <div className='w-full flex items-center justify-center'></div>
            <div className='w-full flex items-center justify-end gap-3 mt-4'>
              {user?._id !== issue.owner_id && (
                <ButtonUploadFile file_id={issue.file_id as string} issue_id={issue._id as string}></ButtonUploadFile>
              )}
              {user?._id === issue.owner_id && <ButtonPrimary onClick={() => handleSubmit()}>Update</ButtonPrimary>}
              <ButtonSecondary onClick={handleClose}>Cancel</ButtonSecondary>
            </div>
          </div>
        )}
      </Formik>
    </div>
  )
}
