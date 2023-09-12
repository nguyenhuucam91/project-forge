import { IssueType } from 'src/types/issue.type'
import DrawerBase from '../DrawerBase'
import IssueComponent from '../IssueComponent'
import { ButtonCreate } from 'src/components/ButtonComponent'
import { useState } from 'react'
import IssueCreateComponent from '../IssueCreateComponent'

type DrawerType = {
  handleClose: () => void
  open: boolean
}
const issues: IssueType[] = [
  {
    _id: '1',
    status: 'Open',
    type: 'Khan Cap',
    title: 'Bo sung noi that cho ban cong',
    owner_id: '1',
    assigned_id: '2',
    due_date: '2023-01-01',
    update_at: '2023-01-01'
  },
  {
    _id: '2',
    status: 'Open',
    type: 'Khan Cap',
    title: 'Bo sung noi that cho ban cong',
    owner_id: '1',
    assigned_id: '2',
    due_date: '2023-01-01',
    update_at: '2023-01-01'
  },
  {
    _id: '3',
    status: 'Open',
    type: 'Khan Cap',
    title: 'Bo sung noi that cho ban cong',
    owner_id: '1',
    assigned_id: '2',
    due_date: '2023-01-01',
    update_at: '2023-01-01'
  },
  {
    _id: '4',
    status: 'Open',
    type: 'Khan Cap',
    title: 'Bo sung noi that cho ban cong',
    owner_id: '1',
    assigned_id: '2',
    due_date: '2023-01-01',
    update_at: '2023-01-01'
  },
  {
    _id: '6',
    status: 'Open',
    type: 'Khan Cap',
    title: 'Bo sung noi that cho ban cong',
    owner_id: '1',
    assigned_id: '2',
    due_date: '2023-01-01',
    update_at: '2023-01-01'
  },
  {
    _id: '7',
    status: 'Open',
    type: 'Khan Cap',
    title: 'Bo sung noi that cho ban cong',
    owner_id: '1',
    assigned_id: '2',
    due_date: '2023-01-01',
    update_at: '2023-01-01'
  },
  {
    _id: '8',
    status: 'Open',
    type: 'Khan Cap',
    title: 'Bo sung noi that cho ban cong',
    owner_id: '1',
    assigned_id: '2',
    due_date: '2023-01-01',
    update_at: '2023-01-01'
  },
  {
    _id: '9',
    status: 'Open',
    type: 'Khan Cap',
    title: 'Bo sung noi that cho ban cong',
    owner_id: '1',
    assigned_id: '2',
    due_date: '2023-01-01',
    update_at: '2023-01-01'
  },
  {
    _id: '10',
    status: 'Open',
    type: 'Khan Cap',
    title: 'Bo sung noi that cho ban cong',
    owner_id: '1',
    assigned_id: '2',
    due_date: '2023-01-01',
    update_at: '2023-01-01'
  },
  {
    _id: '11',
    status: 'Open',
    type: 'Khan Cap',
    title: 'Bo sung noi that cho ban cong',
    owner_id: '1',
    assigned_id: '2',
    due_date: '2023-01-01',
    update_at: '2023-01-01'
  },
  {
    _id: '12',
    status: 'Open',
    type: 'Khan Cap',
    title: 'Bo sung noi that cho ban cong',
    owner_id: '1',
    assigned_id: '2',
    due_date: '2023-01-01',
    update_at: '2023-01-01'
  },
  {
    _id: '13',
    status: 'Open',
    type: 'Khan Cap',
    title: 'Bo sung noi that cho ban cong',
    owner_id: '1',
    assigned_id: '2',
    due_date: '2023-01-01',
    update_at: '2023-01-01'
  },
  {
    _id: '14',
    status: 'Open',
    type: 'Khan Cap',
    title: 'Bo sung noi that cho ban cong',
    owner_id: '1',
    assigned_id: '2',
    due_date: '2023-01-01',
    update_at: '2023-01-01'
  }
]
export default function DrawerIssues({ open, handleClose }: DrawerType) {
  const [createMode, setCreateMode] = useState<boolean>(false)
  return (
    <DrawerBase open={open} handleClose={handleClose}>
      <div className='h-full w-full relative'>
        {!createMode && (
          <>
            <div className='text-lg text-text_primary font-medium ml-4 my-3 w-full'>
              <span>Issues</span>
            </div>
            <div className='text-lg text-text_primary font- border-b w-full border-gray-400'></div>
            <div className='max-h-[770px] overflow-y-auto'>
              {issues &&
                issues.length > 0 &&
                issues.map((issue) => <IssueComponent key={issue._id} issue={issue}></IssueComponent>)}
            </div>
            <div className=' w-full text-center absolute left-0 bottom-3 bg-white pt-2 pb-2 border-t'>
              <ButtonCreate onClick={() => setCreateMode(true)}>Create Issue</ButtonCreate>
            </div>
          </>
        )}
        {createMode && <IssueCreateComponent></IssueCreateComponent>}
      </div>
    </DrawerBase>
  )
}
