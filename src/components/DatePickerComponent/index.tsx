import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'

type DatePickerType = {
  name?: string
  id?: string
  value: string
  handleChange: {
    (e: React.ChangeEvent<any>): void
    <T = string | React.ChangeEvent<any>>(
      field: T
    ): T extends React.ChangeEvent<any> ? void : (e: string | React.ChangeEvent<any>) => void
  }
}
export default function DatePickerComponent({ value, handleChange }: DatePickerType) {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          defaultValue={dayjs(value || '2023-04-17')}
          onChange={(value) => handleChange(['due_date'], )}
          sx={{
            width: '100%',
            '& .MuiInputBase-input': { padding: 1 }
          }}
        />
      </LocalizationProvider>
    </>
  )
}
