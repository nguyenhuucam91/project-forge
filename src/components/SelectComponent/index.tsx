import { MenuItem, Select, SelectChangeEvent } from '@mui/material'

interface SelectInterface {
  value: string
  options: { value: string; label: string }[]
  handleChange: (event: SelectChangeEvent) => void
}

export default function SelectComponent({ value, options, handleChange }: SelectInterface) {
  return (
    <Select
      value={value}
      onChange={handleChange}
      sx={{ '& .MuiSelect-select': { paddingX: 1, paddingY: 0 }, height: '36px', minWidth: '100px' }}
    >
      {options.map((op) => (
        <MenuItem value={op.value} key={op.value}>
          {op.label}
        </MenuItem>
      ))}
    </Select>
  )
}
