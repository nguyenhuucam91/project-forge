import LoadingButton, { LoadingButtonProps } from '@mui/lab/LoadingButton'

export default function ButtonCreate({ children, ...prop }: LoadingButtonProps) {
  return (
    <LoadingButton variant='contained' sx={{ minWidth: '96px' }} {...prop}>
      {children}
    </LoadingButton>
  )
}
