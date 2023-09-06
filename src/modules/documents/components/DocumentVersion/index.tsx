import { Drawer } from '@mui/material'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined'
type DrawerType = {
  handleClose: () => void
  open: boolean
}
export default function DocumentVersion({ open, handleClose }: DrawerType) {
  return (
    <Drawer anchor={'right'} open={open} onClose={handleClose}>
      {/* container */}
      <div className='w-[450px] h-full '>
        {/* Header */}
        <div className='border-b flex justify-between h-[80px] items-start'>
          <h3 className='ml-4 mt-4 text-xl font-medium select-none'>Version history</h3>
          <button onClick={handleClose} className='mt-2 ml-2'>
            <CloseOutlinedIcon></CloseOutlinedIcon>
          </button>
        </div>

        {/* contents */}
        {Array(10)
          .fill(0)
          .map((_, index) => {
            return (
              <div key={index} className='w-full border-b p5 flex items-center justify-around'>
                {/* Avatar version */}
                <div className='w-11 h-11 bg-gray-300 rounded-full flex items-center justify-center text-base mx-4'>
                  V6
                </div>
                {/* content */}
                <div className='flex flex-col flex-1 pr-3 pt-5 pb-2'>
                  <div className='flex items-center justify-between '>
                    <span className='text-base font-medium'>BLVD OFFICE_PLAN_AU.dwg</span>
                    <div className='text-sm text-gray-500 py-[5px] px-[3px] bg-gray-200 rounded-[4px] leading-3'>
                      CURRENT
                    </div>
                  </div>
                  <span className='text-sm text-gray-500 mt-1'>
                    Upload by <b>Hiep Nguyen</b> on Jun 27, 2022 9:44PM
                  </span>
                  <div className='flex items-center justify-between mt-3'>
                    <button>
                      <FileDownloadOutlinedIcon className='text-gray-500'></FileDownloadOutlinedIcon>
                    </button>
                    <button className='text-primary-800'>Make Current</button>
                  </div>
                </div>
              </div>
            )
          })}
      </div>
    </Drawer>
  )
}
