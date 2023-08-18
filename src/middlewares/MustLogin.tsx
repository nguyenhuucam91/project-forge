import { Navigate } from 'react-router-dom'
import { routers } from '../config/routers'
import { ReactNode } from 'react'
import { UserService } from 'src/services/user.service'

const MustLogin = ({ children }: { children: ReactNode }) => {
  const isLogin = UserService.getUser() ? true : false
  console.log('🚀 ~ file: MustLogin.tsx:9 ~ MustLogin ~ isLogin:', UserService.getUser())
  return <>{!isLogin ? <Navigate to={routers.web.authentication.login} /> : children}</>
}

export default MustLogin
