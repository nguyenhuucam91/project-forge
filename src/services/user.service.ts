import configs from 'src/config'
import User from 'src/types/user.type'

export const UserService = {
  getUser: (): User | undefined => {
    if (localStorage.getItem(configs.StorageKeys.user) !== null) {
      return JSON.parse(localStorage.getItem(configs.StorageKeys.user) as string) as User
    }
  },
  isAdmin: (): boolean => {
    const user = UserService.getUser()
    if (user?.role === 'Admin') {
      return true
    }
    return false
  },
  setUser: (user: any) => {
    localStorage.setItem(configs.StorageKeys.user, JSON.stringify(user))
  },
  removeUser: () => {
    localStorage.removeItem(configs.StorageKeys.user)
    localStorage.removeItem(configs.StorageKeys.access)
    localStorage.removeItem(configs.StorageKeys.refresh)
  }
}
