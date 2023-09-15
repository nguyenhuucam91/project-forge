import { Dialog } from '@mui/material'
import styles from './LoadingComponent.module.css'

export default function LoadingComponent() {
  return (
    <Dialog
      open={true}
      onClose={() => {}}
      sx={{
        backgroundColor: 'transparent',
        opacity: '1',
        '& .MuiPaper-root': { backgroundColor: 'transparent', boxShadow: 'none' }
      }}
    >
      <div className='overflow-hidden rounded-full'>
        <div className={styles.ldsDefault}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </Dialog>
  )
}
