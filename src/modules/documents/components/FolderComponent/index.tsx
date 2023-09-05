/* eslint-disable jsx-a11y/click-events-have-key-events */
import FolderOpenOutlinedIcon from '@mui/icons-material/FolderOpenOutlined'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import { FolderType } from 'src/types/folder.type'

export default function FolderComponent({
  folder,
  openFolderId,
  setOpenFolderId
}: {
  folder: FolderType
  openFolderId: string
  setOpenFolderId: React.Dispatch<React.SetStateAction<string>>
}) {
  return (
    /* eslint-disable jsx-a11y/no-static-element-interactions */
    <div className='pl-5 pt-3 transition-all duration-200 ease-linear'>
      <div className='flex items-center gap-2 cursor-pointer justify-between'>
        <div className='flex items-center gap-2 ' onClick={() => setOpenFolderId(folder._id.toString())}>
          <FolderOpenOutlinedIcon
            className={`${openFolderId === folder._id.toString() ? 'text-primary-900' : 'text-gray-800'}`}
          ></FolderOpenOutlinedIcon>
          <span
            className={`${openFolderId === folder._id.toString() ? 'text-primary-900 font-medium' : 'text-gray-800'}`}
          >
            {folder.folder_name}
          </span>
        </div>
        {openFolderId === folder._id.toString() && (
          <MoreHorizIcon className={`mr-5 text-primary-900 font-medium`}></MoreHorizIcon>
        )}
      </div>
      {/* <div className='flex flex-col ml-[60px] gap-[4px]'>
        {open &&
          folder.files &&
          folder.files.length > 0 &&
          folder.files.map((file) => (
            <span key={file._id} className='text-base cursor-pointer hover:text-primary-600'>
              {file.file_name}
            </span>
          ))}
      </div> */}
    </div>
  )
}
