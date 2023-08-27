import { useQuery } from 'react-query'
import queryKeys from 'src/config/queryKeys'
import projectServices from '../services/project.service'

export const useGetProjects = () => {
  const {
    data: projects,
    isLoading,
    isSuccess
  } = useQuery({
    queryKey: [queryKeys.projects.list],
    queryFn: projectServices.getListProject
  })
  return { projects, isLoading, isSuccess }
}
