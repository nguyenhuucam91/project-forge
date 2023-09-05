import { useLocation, useNavigate } from 'react-router'

const useDocument = (fileId: string) => {
  console.log('🚀 ~ file: useDocument.ts:4 ~ useDocument ~ fileId:', fileId)
  const navigate = useNavigate()
  const location = useLocation()
  const handleOpenFile = () => {
    navigate(location.pathname + `/${fileId}`)
  }
  return { handleOpenFile }
}

export default useDocument
