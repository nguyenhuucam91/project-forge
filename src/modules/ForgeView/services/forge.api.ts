import axiosClient from 'src/api/axiosClient'
import { routers } from 'src/routers/routers'

export const forgeAPI = {
  async getAccessToken() {
    try {
      const url = routers.api.forge.accessToken
      const res = await axiosClient.request({
        method: 'GET',
        url: url
      })
      return res.data.access_token
    } catch (error) {
      return null
    }
  }
}
