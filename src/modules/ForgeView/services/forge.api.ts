import axiosService from 'src/api/axios.service'
import { routers } from 'src/config/routers'

export const forgeAPI = {
  async getAccessToken() {
    try {
      const url = routers.api.forge.accessToken
      const res = await axiosService.request({
        method: 'GET',
        url: url
      })
      return res.data.access_token
    } catch (error) {
      return null
    }
  }
}
