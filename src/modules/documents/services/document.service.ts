import { format } from 'react-string-format'
import axiosService from 'src/_api/axios.service'
import configs from 'src/config'
import ProjectType from 'src/types/project.type'
import { SuccessResponse } from 'src/types/response.type'

export const documentService = {
  async createFolder(project_id: string, folderName: string) {
    const url = format(configs.url.api.document.folders, project_id)
    const res = await axiosService.post(url, { folder_name: folderName })
    return res.data.data.access_token
  },
  async modifyFolder(project_id: string, folder_id: string, folderName: string) {
    const url = format(configs.url.api.document.modifyFolder, project_id, folder_id)
    const res = await axiosService.post(url, { folder_name: folderName })
    return res.data.data.access_token
  },

  async deleteFolder(project_id: string, folder_id: string) {
    const url = format(configs.url.api.document.modifyFolder, project_id, folder_id)
    const res = await axiosService.delete(url)
    return res.data.data.access_token
  },

  async uploadFile(project_id: string, folderId: string, data: FormData) {
    const url = format(configs.url.api.document.modifyFolder, project_id, folderId)
    const res = await axiosService.post<SuccessResponse<object>>(url, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return res.data
  },

  async modifyFileName(project_id: string, fileId: string, fileName: string) {
    const url = format(configs.url.api.document.modifyFile, project_id, fileId)
    const res = await axiosService.patch<SuccessResponse<object>>(url, { file_name: fileName })
    return res.data
  },

  async getProjectData(project_id: string) {
    const url = format(configs.url.api.projectAdmin.projectsStringFormat, project_id)
    const res = await axiosService.get<SuccessResponse<ProjectType>>(url)
    return res.data.data
  }
}
