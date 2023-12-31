import axiosService from 'src/_api/axios.service'
import configs from 'src/config'
import { AuthResponse } from 'src/types/auth.type'

const authenticationService = {
  login(body: { email: string; password: string }) {
    return axiosService.post<AuthResponse>(configs.url.api.authentication.login, body)
  },
  registerAccount(body: { password: string; confirm_password: string; email: string; name: string }) {
    return axiosService.post<AuthResponse>(configs.url.api.authentication.register, body)
  },
  logout(body: { refresh_token: string }) {
    return axiosService.post<AuthResponse>(configs.url.api.authentication.logout, body)
  }
}

export default authenticationService
