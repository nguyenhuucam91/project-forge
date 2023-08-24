import { Formik, FormikHelpers, FormikProps } from 'formik'
import loginSchema from './loginSchema'
import authenticationService from '../../services/authentication.service'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router'
import { url } from 'src/config/url'
import { isAxiosError, setUnprocessableEntityErrorToForm } from 'src/utils/utilsError'
import { useTitle } from 'react-use'
import logo from 'src/assets/logo.png'

interface LoginFormValue {
  email: string
  password: string
}

type LoginFormError =
  | {
      [key in keyof LoginFormValue]: string
    }
  | null

export default function Login() {
  useTitle('Login')

  const initialValues: LoginFormValue = { email: '', password: '' }
  const navigate = useNavigate()
  const handleLogin = async (values: LoginFormValue, { setErrors }: FormikHelpers<LoginFormValue>) => {
    try {
      const result = await authenticationService.login(values)
      if (!result.data.success) {
        toast.error(result.data.message)
      } else {
        toast.success(result.data.message)
        navigate(url.web.project.projects)
      }
    } catch (error) {
      setUnprocessableEntityErrorToForm<LoginFormError, LoginFormValue>(error, setErrors)
      if (isAxiosError(error)) {
        if (error.response?.status === 404) {
          setErrors({
            password: 'Email or password is incorrect',
            email: 'Email or password is incorrect'
          })
        }
      }
    }
    // router.push(routers.web.home)
  }
  return (
    <div>
      <section className='bg-gray-50 '>
        <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
          <div className='w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 '>
            <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
              <div className='flex flex-col items-center justify-center w-full'>
                {/* <img
                  alt='logo'
                  srcSet='https://www.autodesk.com/bim-360/app/themes/bim360/assets/img/logos/nav-logo-desktop.png 1x, https://www.autodesk.com/bim-360/app/themes/bim360/assets/img/logos/nav-logo-desktop@2x.png 2x, https://www.autodesk.com/bim-360/app/themes/bim360/assets/img/logos/nav-logo-desktop@3x.png 3x'
                /> */}
                <div className='flex items-end gap-2'>
                  <img src={logo} alt='Logo' className='w-12 aspect-square' />
                  <h3 className='text-xl text-primary-900 font-medium'>CIM Tools</h3>
                </div>

                <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl mt-3'>
                  Sign in to your account
                </h1>
              </div>
              <Formik initialValues={initialValues} validationSchema={loginSchema} onSubmit={handleLogin}>
                {({ values, handleChange, errors, handleSubmit }: FormikProps<LoginFormValue>) => (
                  <div className=''>
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
                      <div className='h-4 w-full py-1 mb-3'>
                        {errors.email && <span className='text-sm text-red-400'>{errors.email}</span>}
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
                      <div className='h-4 w-full py-1 mb-3'>
                        {errors.password && <span className='text-sm text-red-400'>{errors.password}</span>}
                      </div>
                    </div>
                    <div className='space-y-4 md:space-y-6 mt-3'>
                      <div className='flex items-center justify-between'>
                        <div className='flex items-center '>
                          <div className='flex items-center h-5'>
                            <input
                              id='remember'
                              aria-describedby='remember'
                              type='checkbox'
                              className='w-4 h-4 cursor-pointer border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 '
                            />
                          </div>
                          <div className='ml-3 text-sm mt-1'>
                            <label htmlFor='remember' className='text-gray-500 '>
                              Remember me
                            </label>
                          </div>
                        </div>
                        <a href='/#' className='text-sm font-medium text-primary-600 hover:underline '>
                          Forgot password?
                        </a>
                      </div>
                      <button
                        type='submit'
                        onClick={() => handleSubmit()}
                        className='w-full text-white  bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center '
                      >
                        Sign in
                      </button>
                      <p className='text-sm font-light text-gray-500 '>
                        Don’t have an account yet?{' '}
                        <a href='/signup' className='font-medium text-primary-600 hover:underline '>
                          Sign up
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
    </div>
  )
}
