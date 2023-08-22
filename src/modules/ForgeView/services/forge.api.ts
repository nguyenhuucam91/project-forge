import axiosService from 'src/_api/axios.service'
import { routers } from 'src/config/routers'

export const forgeAPI = {
  async getAccessToken() {
    try {
      const url = routers.api.forge.accessToken
      const res = await axiosService.request({
        method: 'POST',
        url: url
      })
      return res.data.access_token
    } catch (error) {
      return null
    }
  }
}
