import { DataGrid, GridColDef } from '@mui/x-data-grid'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import PopoverModifyFile from '../PopoverModifyFile'
import { useState } from 'react'

export default function DocumentTable({
  files,
  setSelectedFile
}: {
  files: {
    id: number
    file_name: string
    version: number
  }[]
  setSelectedFile: React.Dispatch<React.SetStateAction<never[]>>
}) {
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleOpen = (event: any) => {
    setAnchorEl(event.currentTarget)
  }

  const columns: GridColDef[] = [
    {
      field: 'file_name',
      headerName: 'Name',
      width: 230,
      renderCell(params) {
        return (
          <div className='flex items-center justify-between w-full '>
            <span>{params.row.file_name}</span>
            <button onClick={handleOpen}>
              <MoreHorizIcon className={`mr-5 text-primary-900 font-medium cursor-pointer`}></MoreHorizIcon>
            </button>
            <PopoverModifyFile anchorElement={anchorEl} handleClose={handleClose}></PopoverModifyFile>
          </div>
        )
      }
    },
    { field: 'version', headerName: 'Version', width: 130 }
  ]

  return (
    <div style={{ height: '100%', width: '100%', backgroundColor: 'white' }}>
      <DataGrid
        sx={{
          '& .MuiDataGrid-main .MuiDataGrid-columnHeaders': {
            backgroundColor: '#e9eced'
          },
          '& .MuiDataGrid-footerContainer .MuiDataGrid-selectedRowCount': {
            display: 'none'
          }
        }}
        rows={files}
        columns={columns}
        hideFooterPagination
        hideFooter
        checkboxSelection
        onCellDoubleClick={(e) => console.log(e)}
        onRowSelectionModelChange={(e) => setSelectedFile(e as any)}
      />
    </div>
  )
}
