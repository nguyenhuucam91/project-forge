import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { useQuery } from 'react-query'
import queryKeys from 'src/config/queryKeys'
import { forgeAPI } from '../../services/forge.service'
import { FormikErrors } from 'formik'
import { IssueType } from 'src/types/issue.type'
import { SelectProps } from '@mui/material'
import { useParams } from 'react-router'
interface SelectMarkupType extends SelectProps {
  value: string
  name: string
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => Promise<void | FormikErrors<IssueType>>
}
export default function SelectMarkup({ name, value, setFieldValue }: SelectMarkupType) {
  const { projectId, docId } = useParams()
  const { data: markups } = useQuery({
    queryKey: [queryKeys.files.markups],
    queryFn: () => forgeAPI.getMarkups(projectId as string, docId as string)
  })
  return (
    <Box>
      <Select
        value={value}
        defaultValue=''
        displayEmpty
        onChange={(e) => {
          setFieldValue(name, e.target.value)
        }}
        renderValue={(value) => {
          const selectedMarkup = markups?.find((m) => m._id === value)
          return (
            <Box sx={{ display: 'flex', gap: 1 }}>
              {selectedMarkup && (
                <div className='flex items-center gap-2'>
                  <img alt='img' className='h-[40px] w-[40px] object-cover' src={selectedMarkup?.img} />
                  <span className='text-sm text-text_primary font-medium'>{selectedMarkup?.username}</span>
                </div>
              )}
            </Box>
          )
        }}
        fullWidth
        sx={{ '& .MuiSelect-select': { paddingX: 1, paddingY: 0 }, height: '50px', minWidth: '100px' }}
      >
        {markups &&
          markups.map((markup) => (
            <MenuItem key={markup._id} value={markup._id}>
              <div className='flex gap-1 items-center justify-between'>
                <img alt='img' className='h-[40px] w-[40px] object-cover' src={markup.img} />
                <div className='flex flex-col'>
                  <span className='text-sm text-text_primary font-medium'>{markup.username}</span>
                  <span className='text-sm text-text_secondary'>
                    {markup.update_at?.replace('T', ' ').substring(0, 16)}
                  </span>
                </div>
              </div>
            </MenuItem>
          ))}
      </Select>
    </Box>
  )
}
