import { IssueType } from 'src/types/issue.type'

export default function IssueComponent({ issue }: { issue: IssueType }) {
  return (
    <button className='flex border-b text-sm w-full'>
      <div className='border-b text-sm w-full flex flex-col gap-[6px] p-3 shadow-b'>
        <div className='flex items-center justify-between w-full'>
          <span className='px-2 py-[3px] text-sm font-normal text-white rounded-full bg-yellow-500'>
            {issue.status}
          </span>
          <span className='text-left text-text_secondary font-normal'>{issue.due_date}</span>
        </div>
        <h4 className='text-left text-base font-medium text-text_primary'>{issue.title}</h4>
        <span className='text-left'>Assigned to: {issue.assigned_id}</span>
      </div>
    </button>
  )
}
