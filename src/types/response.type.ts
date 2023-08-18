export interface SuccessResponse<Data> {
  message: string
  success: boolean
  data: Data
}
export interface ErrorResponse<Data> {
  message: string
  success: boolean
  data?: Data
}

export type NoUndefinedField<T> = {
  [P in keyof T]-?: NoUndefinedField<NonNullable<T[P]>>
}
