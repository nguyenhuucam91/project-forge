import { DataGrid, GridColDef } from '@mui/x-data-grid'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import PopoverModifyFile from '../PopoverModifyFile'
import { useState } from 'react'
import { Button } from '@mui/material'
import DocumentVersion from '../DocumentVersion'
import { useNavigate, useParams } from 'react-router'
import { format } from 'react-string-format'
import { url } from 'src/config/url'

import { ReactComponent as IconAutocad } from '../../assets/icon-autocad.svg'
import { ReactComponent as IconNavisworks } from '../../assets/icon-navisworks.svg'
import { ReactComponent as IconPdf } from '../../assets/icon-pdf.svg'
import { ReactComponent as IconRevit } from '../../assets/icon-revit.svg'
import FileType from 'src/types/file.type'

interface FileIcons {
  [key: string]: JSX.Element // Hoặc thay JSX.Element bằng kiểu dữ liệu phù hợp với các icon
}

const fileIcons: FileIcons = {
  pdf: <IconPdf></IconPdf>,
  dwg: <IconAutocad></IconAutocad>,
  nwd: <IconNavisworks></IconNavisworks>,
  rvt: <IconRevit></IconRevit>
}

export default function DocumentTable({
  files,
  setSelectedFile,
  selectedFileIds
}: {
  files: FileType[]
  setSelectedFile: React.Dispatch<React.SetStateAction<never[]>>
  selectedFileIds: string[]
}) {
  const newFile = files.map((f) => {
    return { ...f, id: f._id }
  })
  const [anchorEl, setAnchorEl] = useState(null)
  const [openDocVersion, setOpenDocVersion] = useState(false)
  const navigate = useNavigate()
  const { projectId } = useParams()
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleOpen = (event: any) => {
    setAnchorEl(event.currentTarget)
  }

  const handleOpenDocumentVersion = () => {
    setOpenDocVersion(!openDocVersion)
  }

  const handleCellClick = (e: any) => {
    navigate(format(url.web.documents.viewStringFormat, projectId as string, e?.id))
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
            <div className='flex items-center gap-2'>
              {fileIcons[params.row.file_ext as string] ?? ''}
              <span className='text-base leading-4'>{params.row.file_name}</span>
            </div>

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
          <Button variant='text' onClick={() => handleOpenDocumentVersion()}>
            V{params.row.version}
          </Button>
        )
      }
    },
    {
      field: 'file_ext',
      headerName: 'Type',
      width: 100,
      renderCell(params) {
        return <span className='text-primary-900 text-base'>{params.row.file_ext}</span>
      }
    },
    {
      field: 'update_at',
      headerName: 'Last Updated',
      width: 150,
      renderCell(params) {
        return (
          <span className='text-primary-900 text-base'>{params.row.update_at.replace('T', ' ').substring(0, 16)}</span>
        )
      }
    },
    {
      field: 'user_id',
      headerName: 'Updated by',
      width: 100,
      renderCell(params) {
        return <span className='text-primary-900 text-base'>{params.row.user_id}</span>
      }
    }
  ]

  return (
    <div style={{ height: '100%', width: '100%', backgroundColor: 'white' }}>
      <DataGrid
        sx={{
          '& .MuiDataGrid-main .MuiDataGrid-columnHeaders': {
            backgroundColor: '#fff',
            minHeight: '46px !important',
            maxHeight: '46px !important'
          },
          '& .MuiDataGrid-footerContainer .MuiDataGrid-selectedRowCount': {
            display: 'none'
          }
        }}
        rows={newFile}
        columns={columns}
        hideFooterPagination
        hideFooter
        checkboxSelection
        disableRowSelectionOnClick
        rowSelectionModel={selectedFileIds}
        onCellDoubleClick={handleCellClick}
        onRowSelectionModelChange={(e) => {
          setSelectedFile(e as any)
        }}
      />
      <PopoverModifyFile
        anchorElement={anchorEl}
        handleClose={handleClose}
        selectedRowsCount={selectedFileIds.length}
      ></PopoverModifyFile>
      <DocumentVersion open={openDocVersion} handleClose={() => setOpenDocVersion(false)}></DocumentVersion>
    </div>
  )
}
