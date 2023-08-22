import { TextField, StandardTextFieldProps } from '@mui/material'

export default function InputComponent({ id, onChange, disabled }: StandardTextFieldProps) {
  return (
    <>
      <TextField
        color='primary'
        variant='outlined'
        id={id}
        onChange={onChange}
        disabled={disabled}
        sx={{ '& .MuiInputBase-input': { paddingX: '6px', paddingY: '6px' } }}
      />
    </>
  )
}
