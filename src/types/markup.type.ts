type MarkupStatus = 'Public' | 'Private'
export type MarkupType = {
  _id: string
  img: string
  status: MarkupStatus

  create_at?: string
  update_at?: string
  username: string
  file_id: string

  svg: string
  viewerStateOptions: string
}
