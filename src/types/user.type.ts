type Role = 'User' | 'Admin'

export default interface User {
  _id: string
  role: Role
  email: string
  name?: string
  date_of_birth?: string // ISO 8610
  avatar?: string
  createdAt: string
  updatedAt: string
}
