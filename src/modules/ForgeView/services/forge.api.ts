import axiosClient from 'src/api/axiosClient'

export const forgeAPI = {
  async getAccessToken() {
    try {
      const url = `/forge/oauth/token `
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
