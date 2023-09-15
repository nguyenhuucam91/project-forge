import { useQueryClient } from 'react-query'

const useRefreshQuery = (queryKeys: string[]) => {
  const queryClient = useQueryClient()
  const refreshQuery = () => queryClient.invalidateQueries({ queryKey: [...queryKeys] })
  return { refreshQuery }
}
export default useRefreshQuery
