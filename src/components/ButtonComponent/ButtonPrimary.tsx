import { Button, ButtonProps } from '@mui/material'

export default function ButtonPrimary({ children, ...prop }: ButtonProps) {
  return (
    <Button variant='contained' sx={{ minWidth: '96px' }} {...prop}>
      {children}
    </Button>
  )
}
