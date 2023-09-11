export type FolderType = {
  _id: number
  folder_name: string
  files: {
    id: any
    file_name: string
    version: number
  }[]
}
