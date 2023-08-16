export interface SuccessResponse<Data> {
  message: string
  status: number
  data: Data
}
export interface ErrorResponse<Data> {
  message: string
  status: number
  data?: Data
}

export type NoUndefinedField<T> = {
  [P in keyof T]-?: NoUndefinedField<NonNullable<T[P]>>
}
