import { Button, ButtonProps } from '@mui/material'

export default function ButtonSecondary({ children, ...prop }: ButtonProps) {
  return (
    <Button variant='outlined' sx={{ minWidth: '96px', textTransform: 'none' }} {...prop}>
      {children}
    </Button>
  )
}
