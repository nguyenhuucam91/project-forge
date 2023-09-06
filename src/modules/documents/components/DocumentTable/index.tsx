import { DataGrid, GridColDef } from '@mui/x-data-grid'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import PopoverModifyFile from '../PopoverModifyFile'
import { useState } from 'react'
import { Button } from '@mui/material'
import DocumentVersion from '../DocumentVersion'

export default function DocumentTable({
  files,
  setSelectedFile,
  selectedFile
}: {
  files: {
    id: number
    file_name: string
    version: number
  }[]
  setSelectedFile: React.Dispatch<React.SetStateAction<never[]>>
  selectedFile: string[]
}) {
  const [anchorEl, setAnchorEl] = useState(null)
  const [openDocVersion, setOpenDocVersion] = useState(false)
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleOpen = (event: any) => {
    setAnchorEl(event.currentTarget)
  }

  const handleOpenDocumentVersion = () => {
    setOpenDocVersion(!openDocVersion)
  }

  const columns: GridColDef[] = [
    {
      field: 'file_name',
      headerName: 'Name',
      width: 230,
      renderCell(params) {
        let isSelected = false
        const selectedRows = params.api.getSelectedRows()
        selectedRows.forEach((_, key) => {
          if (key === params.row.id) {
            isSelected = true
          }
        })
        return (
          <div className='flex items-center justify-between w-full '>
            <span>{params.row.file_name}</span>
            {isSelected && (
              <>
                <button onClick={handleOpen}>
                  <MoreHorizIcon className={`mr-5 text-primary-900 font-medium cursor-pointer`}></MoreHorizIcon>
                </button>
              </>
            )}
          </div>
        )
      }
    },
    {
      field: 'version',
      headerName: 'Version',
      width: 100,
      renderCell(params) {
        return (
          <div className='text-center w-full'>
            <Button variant='text' onClick={() => handleOpenDocumentVersion()}>
              V{params.row.version}
            </Button>
          </div>
        )
      }
    }
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
        disableRowSelectionOnClick
        onCellDoubleClick={(e) => console.log(e)}
        onRowSelectionModelChange={(e) => {
          setSelectedFile(e as any)
        }}
      />
      <PopoverModifyFile
        anchorElement={anchorEl}
        handleClose={handleClose}
        selectedRowsCount={selectedFile.length}
      ></PopoverModifyFile>
      <DocumentVersion open={openDocVersion} handleClose={() => setOpenDocVersion(false)}></DocumentVersion>
    </div>
  )
}
