import * as Yup from 'yup'

const createProjectSchema = Yup.object().shape({
  project_name: Yup.string().required('Required'),
  project_description: Yup.string()
})

export default createProjectSchema
