import { format } from 'react-string-format'
import axiosService from 'src/_api/axios.service'
import configs from 'src/config'
import ProjectType from 'src/types/project.type'
import { SuccessResponse } from 'src/types/response.type'
import User from 'src/types/user.type'
import { SharedUser } from '../../../types/user.type'

const projectServices = {
  async createProject(data: FormData) {
    const url = configs.url.api.projectAdmin.projects
    const res = await axiosService.post<SuccessResponse<object>>(url, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return res.data
  },

  async deleteProject(projectId: string) {
    const url = format(configs.url.api.projectAdmin.projectsStringFormat, projectId)
    const res = await axiosService.delete<SuccessResponse<object>>(url)
    return res.data
  },

  async modifyProject(project_id: string, data: FormData) {
    const url = format(configs.url.api.projectAdmin.projectsStringFormat, project_id)
    const res = await axiosService.patch<SuccessResponse<object>>(url, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return res.data
  },

  async addUserToProject(project_id: string, user: SharedUser) {
    const url = format(configs.url.api.projectAdmin.projectUserStringFormat, project_id)
    const res = await axiosService.post<SuccessResponse<object>>(url, user)
    return res.data
  },

  async changeUserPermission(project_id: string, user: SharedUser) {
    const url = format(configs.url.api.projectAdmin.projectUpdateUserStringFormat, project_id, user.user_id)
    console.log('🚀 ~ file: project.service.ts:44 ~ changeUserPermission ~ url:', url)
    const res = await axiosService.patch<SuccessResponse<object>>(url, { project_role: user.project_role })
    return res.data
  },

  async removeUser(project_id: string, user_id: string) {
    const url = format(configs.url.api.projectAdmin.projectUpdateUserStringFormat, project_id, user_id)
    const res = await axiosService.delete<SuccessResponse<object>>(url)
    return res.data
  },

  async getListProjectActive() {
    const url = configs.url.api.projectAdmin.projects
    const res = await axiosService.get<SuccessResponse<ProjectType[]>>(url)
    return res.data.data
  },

  async getListProjectArchived() {
    const url = configs.url.api.projectAdmin.projectsArchived
    const res = await axiosService.get<SuccessResponse<ProjectType[]>>(url)
    return res.data.data
  },

  async getAllUsers() {
    const url = configs.url.api.user.allUser
    type Users = Pick<User, '_id' | 'email'>
    const res = await axiosService.get<SuccessResponse<Users[]>>(url)
    return res.data.data
  },

  async activeProject(project_id: string) {
    const url = format(configs.url.api.projectAdmin.activeProject, project_id)
    const res = await axiosService.patch<SuccessResponse<object>>(url)
    return res.data
  },

  async archiveProject(project_id: string) {
    const url = format(configs.url.api.projectAdmin.archiveProject, project_id)
    const res = await axiosService.patch<SuccessResponse<object>>(url)
    return res.data
  }
}
export default projectServices
