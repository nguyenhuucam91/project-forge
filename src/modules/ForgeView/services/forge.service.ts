import axiosService from 'src/_api/axios.service'
import configs from 'src/config'

export const forgeAPI = {
  async getAccessToken() {
    try {
      const url = configs.url.api.forge.accessToken
      const res = await axiosService.post(url)
      return res.data.data.access_token
    } catch (error) {
      return null
    }
  }
}
