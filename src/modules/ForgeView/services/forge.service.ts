import { format } from 'react-string-format'
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
  },
  async addMarkup({
    file_id,
    svg,
    viewerStateOptions,
    img
  }: {
    file_id: string
    svg: string
    viewerStateOptions: string
    img: string
  }) {
    try {
      const url = format(configs.url.api.forge.addMarkup, file_id)
      const res = await axiosService.post(url, { svg, viewerStateOptions, img })
      console.log('🚀 ~ file: forge.service.ts:29 ~ { svg, viewerStateOptions, img }:', {
        svg,
        viewerStateOptions,
        img
      })
      return res.data.data
    } catch (error) {
      return null
    }
  }
}
