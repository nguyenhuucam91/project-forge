import { Navigate } from 'react-router-dom'
import { ReactNode } from 'react'
import { UserService } from 'src/services/user.service'

const MustBeAdmin = ({ children }: { children: ReactNode }) => {
  const isAdmin = UserService.isAdmin()
  return <>{!isAdmin ? <Navigate to={'/'} /> : children}</>
}

export default MustBeAdmin
