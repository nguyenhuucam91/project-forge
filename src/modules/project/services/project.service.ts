import axiosService from 'src/_api/axios.service'
import configs from 'src/config'
import ProjectType from 'src/types/project.type'
import { SuccessResponse } from 'src/types/response.type'

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

  async getListProject() {
    const url = configs.url.api.projectAdmin.projects
    const res = await axiosService.get<SuccessResponse<ProjectType[]>>(url)
    return res.data.data
  }
}
export default projectServices
