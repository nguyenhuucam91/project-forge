export default interface FileType {
  _id: string
  create_at: Date
  update_at: Date

  user_id: string
  folder_id: string
  file_name: string
  file_ext: string
  urn: string
  version: number
}
