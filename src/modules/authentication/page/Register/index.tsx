import { Formik, FormikHelpers, FormikProps } from 'formik'
import registerSchema from './registerSchema'
import authenticationService from '../../services/authentication.service'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router'
import { setUnprocessableEntityErrorToForm } from 'src/utils/utilsError'
import { useTitle } from 'react-use'

interface RegisterFormValue {
  password: string
  confirm_password: string
  email: string
  name: string
}

type RegisterFormError =
  | {
      [key in keyof RegisterFormValue]: string
    }
  | null

export default function Register() {
  useTitle('Register')

  const initialValues: RegisterFormValue = { password: '', confirm_password: '', email: '', name: '' }
  const navigate = useNavigate()

  const handleRegister = async (values: RegisterFormValue, { setErrors }: FormikHelpers<RegisterFormValue>) => {
    try {
      const result = await authenticationService.registerAccount(values)
      if (result.data.success) {
        toast.success(result.data.message)
        navigate('/')
      } else {
        toast.error(result.data.message)
      }
    } catch (error) {
      setUnprocessableEntityErrorToForm<RegisterFormError, RegisterFormValue>(error, setErrors)
    }
  }
  return (
    <section className='bg-gray-50 '>
      <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
        <div className='w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 '>
          <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
            <div className='flex flex-col items-center justify-center w-full'>
              <img
                alt='logo'
                srcSet='https://www.autodesk.com/bim-360/app/themes/bim360/assets/img/logos/nav-logo-desktop.png 1x, https://www.autodesk.com/bim-360/app/themes/bim360/assets/img/logos/nav-logo-desktop@2x.png 2x, https://www.autodesk.com/bim-360/app/themes/bim360/assets/img/logos/nav-logo-desktop@3x.png 3x'
              />
              <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl mt-3'>
                Create and account
              </h1>
            </div>
            <Formik initialValues={initialValues} validationSchema={registerSchema} onSubmit={handleRegister}>
              {({ values, handleChange, errors, handleSubmit }: FormikProps<RegisterFormValue>) => (
                <div>
                  <div>
                    <label htmlFor='email' className='block mb-2 text-sm font-medium text-gray-900 '>
                      Your email
                    </label>
                    <input
                      type='email'
                      name='email'
                      id='email'
                      className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 '
                      placeholder='name@company.com'
                      value={values.email}
                      onChange={handleChange}
                    />
                    <div className='h-4 w-full py-1 mb-4'>
                      {errors.email && <span className='text-sm text-red-400'>{errors.email}</span>}
                    </div>
                  </div>
                  <div>
                    <label htmlFor='name' className='block mb-2 text-sm font-medium text-gray-900 '>
                      Your name
                    </label>
                    <input
                      type='name'
                      name='name'
                      id='name'
                      className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 '
                      placeholder='your name'
                      value={values.name}
                      onChange={handleChange}
                    />
                    <div className='h-4 w-full py-1 mb-4'>
                      {errors.name && <span className='text-sm text-red-400'>{errors.name}</span>}
                    </div>
                  </div>
                  <div>
                    <label htmlFor='password' className='block mb-2 text-sm font-medium text-gray-900 '>
                      Password
                    </label>
                    <input
                      type='password'
                      name='password'
                      id='password'
                      placeholder='••••••••'
                      className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 '
                      value={values.password}
                      onChange={handleChange}
                    />
                    <div className='h-4 w-full py-1 mb-4'>
                      {errors.password && <span className='text-sm text-red-400'>{errors.password}</span>}
                    </div>
                  </div>
                  <div>
                    <label htmlFor='confirm_password' className='block mb-2 text-sm font-medium text-gray-900 '>
                      Confirm password
                    </label>
                    <input
                      type='password'
                      name='confirm_password'
                      id='confirm_password'
                      placeholder='••••••••'
                      className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 '
                      value={values.confirm_password}
                      onChange={handleChange}
                    />
                    <div className='h-4 w-full py-1 mb-4'>
                      {errors.confirm_password && (
                        <span className='text-sm text-red-400'>{errors.confirm_password}</span>
                      )}
                    </div>
                  </div>
                  <div className='space-y-4 md:space-y-6'>
                    <div className='flex items-start'>
                      <div className='flex items-center h-5'>
                        <input
                          id='terms'
                          aria-describedby='terms'
                          type='checkbox'
                          className='cursor-pointer w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 '
                        />
                      </div>
                      <div className='ml-3 text-sm'>
                        <label htmlFor='terms' className='font-light text-gray-500 '>
                          I accept the{' '}
                          <a className='font-medium text-primary-600 hover:underline ' href='/#'>
                            Terms and Conditions
                          </a>
                        </label>
                      </div>
                    </div>
                    <button
                      type='submit'
                      onClick={() => handleSubmit()}
                      className='w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center '
                    >
                      Create an account
                    </button>
                    <p className='text-sm font-light text-gray-500 '>
                      Already have an account?{' '}
                      <a href='/login' className='font-medium text-primary-600 hover:underline '>
                        Login here
                      </a>
                    </p>
                  </div>
                </div>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </section>
  )
}
