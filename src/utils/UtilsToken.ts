import StorageKeys from 'src/constants/StorageKeys.enum'

class UtilsToken {
  addToken(data: any) {
    localStorage.setItem(StorageKeys.access, data.accessToken)
    localStorage.setItem(StorageKeys.refresh, data.refreshToken)
  }
  getLocalRefreshToken() {
    return localStorage.getItem(StorageKeys.refresh)
  }
  getLocalAccessToken() {
    return localStorage.getItem(StorageKeys.access)
  }
  updateLocalAccessToken(token: any) {
    localStorage.setItem(StorageKeys.access, token)
  }
  updateLocalRefreshToken(token: any) {
    localStorage.setItem(StorageKeys.refresh, token)
  }

  getUser() {
    if (localStorage.getItem(StorageKeys.user) !== null) {
      return JSON.parse(localStorage.getItem(StorageKeys.user) as string)
    }
  }
  setUser(user: any) {
    localStorage.setItem(StorageKeys.user, JSON.stringify(user))
  }

  removeUser() {
    localStorage.removeItem(StorageKeys.user)
    localStorage.removeItem(StorageKeys.access)
    localStorage.removeItem(StorageKeys.refresh)
  }
}
export default new UtilsToken()
