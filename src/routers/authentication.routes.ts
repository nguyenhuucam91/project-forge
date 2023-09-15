import { url } from 'src/config/url'
import { lazy } from 'react'
import Loadable from 'src/components/Loadable'
const Home = Loadable(lazy(() => import('../modules/home/index')))
const Login = Loadable(lazy(() => import('../modules/authentication/page/Login/index')))
const Register = Loadable(lazy(() => import('../modules/authentication/page/Register/index')))

const AuthenticationRoutes = [
  {
    path: '/',
    element: Home
  },
  {
    path: url.web.authentication.login,
    element: Login
  },
  {
    path: url.web.authentication.signup,
    element: Register
  }
]

export default AuthenticationRoutes
