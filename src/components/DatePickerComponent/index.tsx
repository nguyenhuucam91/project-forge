import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import { FormikErrors } from 'formik'
import { IssueType } from 'src/types/issue.type'

type DatePickerType = {
  name?: string
  value: string
  disable?: boolean
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => Promise<void | FormikErrors<IssueType>>
}
export default function DatePickerComponent({ value, name, disable = false, setFieldValue }: DatePickerType) {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          disabled={disable}
          defaultValue={dayjs(value)}
          onChange={(date) => setFieldValue(name as string, date?.format('YYYY-MM-DD'))}
          sx={{
            width: '100%',
            '& .MuiInputBase-input': { padding: 1 }
          }}
        />
      </LocalizationProvider>
    </>
  )
}
