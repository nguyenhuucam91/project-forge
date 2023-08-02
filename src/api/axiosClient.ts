import queryString from 'query-string'
import axios from 'axios'
import UtilsToken from 'src/utils/UtilsToken'
import { routers } from 'src/routers/routers'

const axiosClient = axios.create({
  baseURL: `${routers.api.local_host}`,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Headers':
      'Origin,DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type'
  },
  paramsSerializer: (params) => queryString.stringify(params)
})

axiosClient.interceptors.request.use(async (config) => {
  const accessToken = UtilsToken.getLocalAccessToken()
  try {
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`
    }
  } catch (error) {
    return Promise.reject(error)
  }
  return config
})

axiosClient.interceptors.response.use(
  (res) => {
    return res
  },
  async (err) => {
    const originalConfig = err.config
    if (!originalConfig.url.includes(routers.web.authentication.login) && err.response) {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true
        try {
          return axiosClient(originalConfig)
        } catch (_error) {
          return Promise.reject(_error)
        }
      }
    }
    return Promise.reject(err)
  }
)

export default axiosClient
