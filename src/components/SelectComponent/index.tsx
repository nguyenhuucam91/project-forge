import { MenuItem, Select, SelectChangeEvent, SelectProps, SxProps, Theme } from '@mui/material'

interface SelectInterface extends SelectProps {
  value: string
  options: { value: string; label: string }[]
  handleChange: (event: SelectChangeEvent) => void
  sx?: SxProps<Theme> | undefined
}

export default function SelectComponent({ value, options, handleChange, sx }: SelectInterface) {
  return (
    <Select
      value={value}
      onChange={handleChange}
      sx={{ '& .MuiSelect-select': { paddingX: 1, paddingY: 0 }, height: '36px', minWidth: '100px', ...sx }}
    >
      {options.map((op) => (
        <MenuItem value={op.value} key={op.value}>
          {op.label}
        </MenuItem>
      ))}
    </Select>
  )
}
