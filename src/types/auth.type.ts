import { SuccessResponse } from './response.type'
import User from './user.type'

export type AuthResponse = SuccessResponse<{
  access_token: string
  refresh_token: string
  user: User
}>

export type RefreshTokenResponse = SuccessResponse<{ access_token: string }>
