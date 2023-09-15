import { format } from 'react-string-format'
import axiosService from 'src/_api/axios.service'
import configs from 'src/config'
import { MarkupType } from 'src/types/markup.type'
import { SuccessResponse } from 'src/types/response.type'
import { IssueType } from '../../../types/issue.type'

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
    project_id,
    file_id,
    svg,
    viewerStateOptions,
    img,
    status
  }: {
    project_id: string
    file_id: string
    svg: string
    viewerStateOptions: string
    img: string
    status: string
  }) {
    const url = format(configs.url.api.forge.addMarkup, project_id, file_id)
    const res = await axiosService.post(url, { svg, viewerStateOptions, img, status })
    return res.data.data
  },
  async getMarkups(project_id: string, file_id: string) {
    const url = format(configs.url.api.forge.addMarkup, project_id, file_id)
    const res = await axiosService.get<SuccessResponse<MarkupType[]>>(url)
    return res.data.data
  },
  async addIssue(project_id: string, file_id: string, issue: IssueType) {
    const url = format(configs.url.api.forge.addIssue, project_id, file_id)
    const res = await axiosService.post(url, { ...issue, file_id })
    return res.data.data
  },
  async getIssues(project_id: string, file_id: string) {
    const url = format(configs.url.api.forge.addIssue, project_id, file_id)
    const res = await axiosService.get<SuccessResponse<IssueType[]>>(url)
    return res.data.data
  }
}
