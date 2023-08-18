import * as Yup from 'yup'

const registerSchema = Yup.object().shape({
  email: Yup.string().email('Must be email').required('Required'),
  name: Yup.string().required('Required'),
  confirm_password: Yup.string()
    .min(7, 'Must be exactly 5 digits')
    .required('Required')
    .oneOf([Yup.ref('password')], 'Passwords must match'),
  password: Yup.string().min(7, 'Must be exactly 5 digits').required('Required')
})

export default registerSchema
