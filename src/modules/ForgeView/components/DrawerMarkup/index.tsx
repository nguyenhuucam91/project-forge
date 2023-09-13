import DrawerBase from '../DrawerBase'
import MarkupComponent from '../MarkupComponent'
import { useQuery } from 'react-query'
import queryKeys from 'src/config/queryKeys'
import { forgeAPI } from '../../services/forge.service'
import { useParams } from 'react-router'

type DrawerType = {
  handleClose: () => void
  open: boolean
  handleLoadMasksUp: (svg: any, viewPortObject: any) => void
}

export default function DrawerMarkup({ open, handleClose, handleLoadMasksUp }: DrawerType) {
  const { projectId, docId } = useParams()
  const { data: markups } = useQuery({
    queryKey: [queryKeys.files.markups],
    queryFn: () => forgeAPI.getMarkups(projectId as string, docId as string)
  })
  return (
    <DrawerBase open={open} handleClose={handleClose}>
      <div className='h-full w-full'>
        <div className='text-lg text-text_primary font-medium ml-4 my-3 w-full'>
          <span>Markups</span>
        </div>
        <div className='text-lg text-text_primary font-medium border-b w-full border-gray-400'></div>

        <div>
          {markups &&
            markups.length > 0 &&
            markups.map((markup) => (
              <MarkupComponent key={markup._id} markup={markup} handleLoadMasksUp={handleLoadMasksUp}></MarkupComponent>
            ))}
        </div>
      </div>
    </DrawerBase>
  )
}
