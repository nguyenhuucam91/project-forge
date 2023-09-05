export type FolderType = {
  _id: number
  folder_name: string
  files: {
    id: number
    file_name: string
    version: number
  }[]
}
