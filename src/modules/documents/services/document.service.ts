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

  async getProjectData(project_id: string) {
    const url = format(configs.url.api.projectAdmin.projectsStringFormat, project_id)
    const res = await axiosService.get<SuccessResponse<ProjectType>>(url)
    return res.data.data
  }
}
