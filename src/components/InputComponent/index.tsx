import { TextField, StandardTextFieldProps } from '@mui/material'

export default function InputComponent({ id, onChange, disabled, value, fullWidth = false }: StandardTextFieldProps) {
  return (
    <>
      <TextField
        fullWidth={fullWidth}
        color='primary'
        variant='outlined'
        id={id}
        value={value}
        onChange={onChange}
        disabled={disabled}
        sx={{ '& .MuiInputBase-input': { paddingX: '10px', paddingY: '6px' } }}
      />
    </>
  )
}
