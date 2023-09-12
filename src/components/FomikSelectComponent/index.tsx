import { MenuItem, Select, SelectProps, SxProps, Theme } from '@mui/material'
import { FormikErrors } from 'formik'
import { IssueType } from 'src/types/issue.type'

interface SelectInterface extends SelectProps {
  value: string
  name: string
  options: { value: string; label: string }[]
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => Promise<void | FormikErrors<IssueType>>
  sx?: SxProps<Theme> | undefined
}

export default function FomikSelectComponent({
  value,
  name,
  options,
  setFieldValue,
  sx,
  fullWidth = false
}: SelectInterface) {
  console.log('🚀 ~ file: index.tsx:25 ~ value:', value)
  return (
    <Select
      value={value}
      name={name}
      onChange={(e) => {
        setFieldValue(name, e.target.value)
      }}
      sx={{
        '& .MuiSelect-select': { fontSize: '15px', paddingX: 1, paddingY: 0 },
        height: '36px',
        minWidth: '100px',
        ...sx
      }}
      fullWidth={fullWidth}
    >
      {options.map((op) => (
        <MenuItem value={op.value} key={op.value}>
          {op.label}
        </MenuItem>
      ))}
    </Select>
  )
}