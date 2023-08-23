import axios, { AxiosError } from 'axios'
import { FormikErrors } from 'formik'
import HttpStatusCode from 'src/config/constants/httpStatusCode.enum'
import { ErrorResponse, SuccessResponse } from 'src/types/response.type'

export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  // eslint-disable-next-line import/no-named-as-default-member
  return axios.isAxiosError(error)
}

export function isAxiosUnprocessableEntityError<FormError>(error: unknown): error is AxiosError<FormError> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
}

export function isAxiosUnauthorizedError<UnauthorizedError>(error: unknown): error is AxiosError<UnauthorizedError> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.Unauthorized
}

export function isAxiosExpiredTokenError<UnauthorizedError>(error: unknown): error is AxiosError<UnauthorizedError> {
  return (
    isAxiosUnauthorizedError<ErrorResponse<{ message: string }>>(error) &&
    error.response?.data?.data?.message === 'EXPIRED_TOKEN'
  )
}

export function setUnprocessableEntityErrorToForm<FormError, FormState>(
  error: unknown,
  setErrors: (errors: FormikErrors<FormState>) => void
): void {
  if (isAxiosUnprocessableEntityError<SuccessResponse<FormError>>(error) && error.response?.status === 422) {
    const formError = error.response.data.data
    if (formError) {
      setErrors(formError)
    }
  }
}
