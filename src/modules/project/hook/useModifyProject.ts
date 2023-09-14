import { useMutation } from 'react-query'
import projectServices from '../services/project.service'
import toast from 'react-hot-toast'
import { SharedUser } from 'src/types/user.type'

export const useActiveProject = () => {
  const { mutate: projectMutate } = useMutation({
    mutationFn: (project_id: string) => projectServices.activeProject(project_id)
  })

  const activeProject = (project_id: string, refreshQuery: () => Promise<void>) => {
    projectMutate(project_id, {
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

export const useModifyUser = (projectId: string) => {
  const { mutate: permissionMutate } = useMutation({
    mutationFn: (user: SharedUser) => projectServices.changeUserPermission(projectId as string, user)
  })

  const { mutate: removeUserMutate } = useMutation({
    mutationFn: (user_id: string) => projectServices.removeUser(projectId as string, user_id)
  })

  const changePermission = (user: SharedUser, refreshQuery: () => Promise<void>) => {
    permissionMutate(user, {
      onError: () => {
        toast.error('Change permission failed')
      },
      onSuccess: () => {
        toast.success('Change permission success')
        refreshQuery()
      }
    })
  }

  const removeUser = (user_id: string, refreshQuery: () => Promise<void>) => {
    removeUserMutate(user_id, {
      onError: () => {
        toast.error('Remove user failed')
      },
      onSuccess: () => {
        toast.success('Remove user success')
        refreshQuery()
      }
    })
  }
  return { changePermission, removeUser }
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
