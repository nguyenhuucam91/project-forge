// export type FolderType = {
//   _id: number
//   folder_name: string
//   files: {
//     id: any
//     file_name: string
//     version: number
//      extension: 'string'
//   }[]
// }

export type FolderType = {
  _id: string
  folder_name: string
  user_id: string
  create_at: string
  update_at: string
  files: never[]
}
