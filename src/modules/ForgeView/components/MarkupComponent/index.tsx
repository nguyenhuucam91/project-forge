import { MarkupType } from 'src/types/markup.type'
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import SelectComponent from 'src/components/SelectComponent'

export default function MarkupComponent({ markup }: { markup: MarkupType }) {
  return (
    <div className='flex p-3 gap-3 border-b'>
      <img alt='markup' className='w-[80px] h-[80px] object-cover rounded-sm' src={markup.img}></img>
      <div className='flex flex-col justify-between'>
        <div className='flex items-center'>
          {markup.status === 'Public' && (
            <PublicOutlinedIcon className='w-3 h-3 text-text_secondary' sx={{ width: '18px' }}></PublicOutlinedIcon>
          )}
          {markup.status === 'Private' && (
            <LockOutlinedIcon className=' text-text_secondary' sx={{ width: '18px' }}></LockOutlinedIcon>
          )}
          <SelectComponent
            value={markup.status}
            options={[
              {
                value: 'Public',
                label: 'Public'
              },
              {
                value: 'Private',
                label: 'Private'
              }
            ]}
            handleChange={() => {}}
            sx={{
              fontSize: '14px',
              width: '20px',
              '& .MuiSelect-select': { border: 'none' },
              '.MuiOutlinedInput-notchedOutline': { border: 0 },
              '.MuiSvgIcon-root': { right: '10px' }
            }}
          ></SelectComponent>
        </div>
        <div className='flex flex-col'>
          <span className='text-sm text-text_primary'>{markup.user_id}</span>
          <span className='text-sm text-text_secondary'>{markup.update_at}</span>
        </div>
      </div>
    </div>
  )
}