import axiosService from 'src/_api/axios.service'
import { routers } from 'src/config/routers'
import { SuccessResponse } from 'src/types/response.type'

const projectAdminServices = {
  async createProject(data: { project_name: string; project_description: string }) {
    const url = routers.api.projectAdmin.projects
    const res = await axiosService.post<SuccessResponse<object>>(url, data)
    return res.data
  }
}
export default projectAdminServices
