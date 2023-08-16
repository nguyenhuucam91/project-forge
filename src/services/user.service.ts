import StorageKeys from 'src/config/constants/StorageKeys.enum'
import User from 'src/types/user.type'

export const UserService = {
  getUser: (): User | undefined => {
    if (localStorage.getItem(StorageKeys.user) !== null) {
      return JSON.parse(localStorage.getItem(StorageKeys.user) as string) as User
    }
  },
  isAdmin: (): boolean => {
    const user = UserService.getUser()
    if (user?.roles.includes('Admin')) {
      return true
    }
    return false
  },
  setUser: (user: any) => {
    localStorage.setItem(StorageKeys.user, JSON.stringify(user))
  },
  removeUser: () => {
    localStorage.removeItem(StorageKeys.user)
    localStorage.removeItem(StorageKeys.access)
    localStorage.removeItem(StorageKeys.refresh)
  }
}
