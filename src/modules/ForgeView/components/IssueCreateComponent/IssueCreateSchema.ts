import * as Yup from 'yup'

const IssueCreateSchema = Yup.object().shape({
  status: Yup.string().required('Required'),
  type: Yup.string().required('Required'),
  title: Yup.string().required('Required'),
  assigned_id: Yup.string().required('Required'),
  due_date: Yup.string().required('Required'),
  markup_id: Yup.string().required('Required')
})

export default IssueCreateSchema
