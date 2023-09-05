import { Button, ButtonProps } from '@mui/material'

export default function ButtonPrimary({ children, ...prop }: ButtonProps) {
  return (
    <Button variant='contained' sx={{ minWidth: '96px', height: '36px', textTransform: 'none' }} {...prop}>
      {children}
    </Button>
  )
}
