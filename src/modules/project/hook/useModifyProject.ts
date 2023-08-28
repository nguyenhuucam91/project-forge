import { useMutation } from 'react-query'
import projectServices from '../services/project.service'
import toast from 'react-hot-toast'

export const useActiveProject = () => {
  const { mutate } = useMutation({
    mutationFn: (project_id: string) => projectServices.activeProject(project_id)
  })

  const activeProject = (project_id: string, refreshQuery: () => Promise<void>) => {
    mutate(project_id, {
      onError: () => {
        toast.error('Active project failed')
      },
      onSuccess: () => {
        toast.success('Active project success')
        refreshQuery()
      }
    })
  }
  return { activeProject }
}

export const useArchiveProject = () => {
  const { mutate } = useMutation({
    mutationFn: (project_id: string) => projectServices.archiveProject(project_id)
  })

  const archiveProject = (project_id: string, refreshQuery: () => Promise<void>) => {
    mutate(project_id, {
      onError: () => {
        toast.error('Archive project failed')
      },
      onSuccess: () => {
        toast.success('Archive project success')
        refreshQuery()
      }
    })
  }
  return { archiveProject }
}

export const useDeleteProject = () => {
  const { mutate } = useMutation({
    mutationFn: (project_id: string) => projectServices.deleteProject(project_id)
  })

  const deleteProject = (project_id: string, refreshQuery: () => Promise<void>) => {
    mutate(project_id, {
      onError: () => {
        toast.error('Delete project failed')
      },
      onSuccess: () => {
        toast.success('Delete project success')
        refreshQuery()
      }
    })
  }
  return { deleteProject }
}
