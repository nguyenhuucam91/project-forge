import * as Yup from 'yup'

const loginSchema = Yup.object().shape({
  email: Yup.string().email('Must be email').required('Required'),
  password: Yup.string().min(7, 'Must be exactly 5 digits').required('Required')
})

export default loginSchema
