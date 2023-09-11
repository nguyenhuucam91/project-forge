import { format } from 'react-string-format'
import axiosService from 'src/_api/axios.service'
import configs from 'src/config'
import { MarkupType } from 'src/types/markup.type'
import { SuccessResponse } from 'src/types/response.type'

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
      const url = format(configs.url.api.forge.addMarkup, '64ec76442b2494ec54aa5c31', file_id)
      const res = await axiosService.post(url, { svg, viewerStateOptions, img })
      return res.data.data
    } catch (error) {
      return null
    }
  },
  async getMarkups(file_id: string) {
    try {
      const url = format(configs.url.api.forge.addMarkup, '64ec76442b2494ec54aa5c31', file_id)
      const res = await axiosService.get<SuccessResponse<MarkupType[]>>(url)
      return res.data.data
    } catch (error) {
      return null
    }
  }
}
