import { IssueType } from 'src/types/issue.type'

export default function IssueComponent({ issue }: { issue: IssueType }) {
  return (
    <button className='flex border-b text-sm w-full'>
      <div className='border-b text-sm w-full flex flex-col gap-[6px] p-3 shadow-b'>
        <div className='flex items-center justify-between w-full'>
          <div className='flex items-center gap-1'>
            {issue.status === 'open' && (
              <span className='px-2 py-[3px] text-sm font-normal text-white rounded-full bg-green-600'>
                {issue.status}
              </span>
            )}
            {issue.status === 'close' && (
              <span className='px-2 py-[3px] text-sm font-normal text-white rounded-full bg-gray-500'>
                {issue.status}
              </span>
            )}
            {issue.type === 'high' && (
              <span className='px-2 py-[3px] text-sm font-normal text-white rounded-full bg-red-500'>
                high priority
              </span>
            )}
            {issue.type === 'low' && (
              <span className='px-2 py-[3px] text-sm font-normal text-white rounded-full bg-gray-500'>
                low priority
              </span>
            )}
          </div>
          <span className='text-left text-text_secondary  font-medium'>
            Due date: {issue.due_date.substring(0, 10)}
          </span>
        </div>
        <h4 className='text-left text-base font-medium text-text_primary'>{issue.title}</h4>
        <span className='text-left'>
          Assigned to: <b>{issue.assigned_name}</b>
        </span>
      </div>
    </button>
  )
}
