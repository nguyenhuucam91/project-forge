import { Navigate } from 'react-router-dom'
import { url } from '../config/url'
import { ReactNode } from 'react'
import { UserService } from 'src/services/user.service'

const MustLogin = ({ children }: { children: ReactNode }) => {
  const isLogin = UserService.getUser() ? true : false
  return <>{!isLogin ? <Navigate to={url.web.authentication.login} /> : children}</>
}

export default MustLogin
