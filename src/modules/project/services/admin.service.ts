import axiosService from 'src/_api/axios.service'
import configs from 'src/config'
import { SuccessResponse } from 'src/types/response.type'

const projectAdminServices = {
  async createProject(data: { project_name: string; project_description: string }) {
    const url = configs.url.api.projectAdmin.projects
    const res = await axiosService.post<SuccessResponse<object>>(url, data)
    return res.data
  }
}
export default projectAdminServices
