import axiosService from 'src/_api/axios.service'
import { routers } from 'src/config/routers'
import { SuccessResponse } from 'src/types/response.type'

const projectAdminServices = {
  async createProject(data: { project_name: string; project_description: string }) {
    try {
      const url = routers.api.projectAdmin.projects
      const res = await axiosService.request<SuccessResponse<object>>({
        method: 'POST',
        url: url,
        data: data
      })
      return res.data
    } catch (error) {
      return null
    }
  }
}
export default projectAdminServices
