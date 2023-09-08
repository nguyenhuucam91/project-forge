type MarkupStatus = 'Public' | 'Private'
export type MarkupType = {
  _id: string
  img: string
  status: MarkupStatus
  user_id: string
  create_at?: string
  update_at: string
}
