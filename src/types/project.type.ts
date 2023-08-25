type ProjectRole = 'View' | 'Modify'

export default interface ProjectType {
  project_name: string
  project_description?: string
  project_image?: string
  create_at?: Date
  update_at?: Date
  project_owner_id: string
  shared_users?: {
    user_id: string
    project_role: ProjectRole
  }[]
  project_folders?: string[]
}
