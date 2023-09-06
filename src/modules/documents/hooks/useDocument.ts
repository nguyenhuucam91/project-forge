import { useLocation, useNavigate } from 'react-router'

const useDocument = (fileId: string) => {
  const navigate = useNavigate()
  const location = useLocation()
  const handleOpenFile = () => {
    navigate(location.pathname + `/${fileId}`)
  }
  return { handleOpenFile }
}

export default useDocument
