import { useQuery } from 'react-query'
import queryKeys from 'src/config/queryKeys'
import projectServices from '../services/project.service'

export const useGetProjectsActive = () => {
  const {
    data: projects,
    isLoading,
    isSuccess
  } = useQuery({
    queryKey: [queryKeys.projects.listActive],
    queryFn: projectServices.getListProjectActive
  })
  return { projects, isLoading, isSuccess }
}

export const useGetProjectsArchived = () => {
  const {
    data: projects,
    isLoading,
    isSuccess
  } = useQuery({
    queryKey: [queryKeys.projects.listArchived],
    queryFn: projectServices.getListProjectArchived
  })
  return { projects, isLoading, isSuccess }
}
