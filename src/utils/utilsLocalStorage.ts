import StorageKeys from 'src/config/constants/StorageKeys.enum'

export const LocalStorageEventTarget = new EventTarget()

export const setAccessTokenToLS = (access_token: string) => {
  localStorage.setItem(StorageKeys.access, access_token)
}

export const setRefreshTokenToLS = (refresh_token: string) => {
  localStorage.setItem(StorageKeys.refresh, refresh_token)
}

export const clearLS = () => {
  localStorage.removeItem(StorageKeys.access)
  localStorage.removeItem(StorageKeys.refresh)
  localStorage.removeItem(StorageKeys.user)
  const clearLSEvent = new Event('clearLS')
  LocalStorageEventTarget.dispatchEvent(clearLSEvent)
}

export const getAccessTokenFromLS = () => localStorage.getItem(StorageKeys.access) || ''

export const getRefreshTokenFromLS = () => localStorage.getItem(StorageKeys.refresh) || ''
