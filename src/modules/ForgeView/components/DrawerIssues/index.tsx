import DrawerBase from '../DrawerBase'
import IssueComponent from '../IssueComponent'
import { ButtonCreate } from 'src/components/ButtonComponent'
import { useState } from 'react'
import IssueCreateComponent from '../IssueCreateComponent'
import { useQuery } from 'react-query'
import queryKeys from 'src/config/queryKeys'
import { forgeAPI } from '../../services/forge.service'
import { useParams } from 'react-router'
import IssueModifyComponent from '../IssueModifyComponent'
import { IssueType } from 'src/types/issue.type'

type DrawerType = {
  handleClose: () => void
  open: boolean
}

export default function DrawerIssues({ open, handleClose }: DrawerType) {
  const [createMode, setCreateMode] = useState<boolean>(false)
  const [modifyMode, setModifyMode] = useState<boolean>(false)
  const [selectedIssue, setSelectedIssue] = useState<IssueType | undefined>()
  const { projectId, docId } = useParams()

  const { data: issues } = useQuery({
    queryKey: [queryKeys.files.issues],
    queryFn: () => forgeAPI.getIssues(projectId as string, docId as string)
  })
  const handleModify = (issue: any) => {
    setSelectedIssue(issue)
    setModifyMode(true)
    setCreateMode(false)
  }

  return (
    <DrawerBase
      open={open}
      handleClose={() => {
        handleClose()
        setCreateMode(false)
      }}
    >
      <div className='h-full w-full relative'>
        {!createMode && !modifyMode && (
          <>
            <div className='text-lg text-text_primary font-medium ml-4 my-3 w-full'>
              <span>Issues</span>
            </div>
            <div className='text-lg text-text_primary font- border-b w-full border-gray-400'></div>
            <div className='max-h-[770px] overflow-y-auto' style={{ maxHeight: 'calc(100% - 48px - 50px)' }}>
              {issues &&
                issues.length > 0 &&
                issues.map((issue) => (
                  <IssueComponent key={issue._id} issue={issue} handleModify={handleModify}></IssueComponent>
                ))}
            </div>
            <div className=' w-full text-center absolute left-0 bottom-3 bg-white pt-2 pb-2 border-t'>
              <ButtonCreate onClick={() => setCreateMode(true)}>Create Issue</ButtonCreate>
            </div>
          </>
        )}
        {createMode && <IssueCreateComponent handleClose={() => setCreateMode(false)}></IssueCreateComponent>}
        {modifyMode && (
          <IssueModifyComponent
            handleClose={() => setModifyMode(false)}
            issue={selectedIssue as IssueType}
          ></IssueModifyComponent>
        )}
      </div>
    </DrawerBase>
  )
}
