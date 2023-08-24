import configs from 'src/config'

export const LocalStorageEventTarget = new EventTarget()

export const setAccessTokenToLS = (access_token: string) => {
  localStorage.setItem(configs.StorageKeys.access, access_token)
}

export const setRefreshTokenToLS = (refresh_token: string) => {
  localStorage.setItem(configs.StorageKeys.refresh, refresh_token)
}

export const clearLS = () => {
  localStorage.removeItem(configs.StorageKeys.access)
  localStorage.removeItem(configs.StorageKeys.refresh)
  localStorage.removeItem(configs.StorageKeys.user)
  const clearLSEvent = new Event('clearLS')
  LocalStorageEventTarget.dispatchEvent(clearLSEvent)
}

export const getAccessTokenFromLS = () => localStorage.getItem(configs.StorageKeys.access) || ''

export const getRefreshTokenFromLS = () => localStorage.getItem(configs.StorageKeys.refresh) || ''
