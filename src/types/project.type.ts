type ProjectRole = 'View' | 'Modify'

export default interface ProjectType {
  _id: string
  project_name: string
  project_description?: string
  project_image?: string
  create_at?: Date
  update_at?: Date
  project_owner_id: string
  shared_users?: {
    _id: string
    username: string
    project_role: ProjectRole
    email: string
    avatar: string
    isPending: boolean
  }[]
  project_folders?: string[]
}
