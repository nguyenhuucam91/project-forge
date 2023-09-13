import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Autocomplete, Button, Chip, MenuItem, SelectChangeEvent, TextField } from '@mui/material'
import { useState } from 'react'
import { ButtonPrimary } from 'src/components/ButtonComponent'
import ControlPointIcon from '@mui/icons-material/ControlPoint'
import SelectComponent from 'src/components/SelectComponent'
import PopoverComponent from 'src/components/PopoverComponent'
import { useMutation, useQuery } from 'react-query'
import projectServices from '../../services/project.service'
import { SharedUser } from 'src/types/user.type'
import toast from 'react-hot-toast'
import useRefreshQuery from 'src/hook/useRefreshQuery'
import queryKeys from 'src/config/queryKeys'
import { UserService } from 'src/services/user.service'
import ProjectType from 'src/types/project.type'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#187acb',
    color: theme.palette.common.white
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    padding: '6px 16px'
  }
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover
  },
  '&:last-child td, &:last-child th': {
    border: 0
  }
}))

export default function TableMember({ project }: { project: ProjectType }) {
  const [selectedEmail, setSelectedEmail] = useState<string>('')
  const [anchorElMenu, setAnchorElMenu] = useState(null)
  const [role, setRole] = useState('User')
  const { refreshQuery } = useRefreshQuery([queryKeys.projects.listActive])

  const { data: listUsers } = useQuery({ queryKey: ['user'], queryFn: projectServices.getAllUsers })
  const userId = UserService.getUser()?._id
  const myOptions = listUsers?.filter((u) => u._id !== userId).map((u) => u.email) as string[]

  const { mutate } = useMutation({
    mutationFn: (user: SharedUser) => projectServices.addUserToProject(project._id, user)
  })

  const handleCloseUserMenu = () => {
    setAnchorElMenu(null)
  }

  const handleChange = (event: SelectChangeEvent) => {
    setRole(event.target.value as string)
  }
  const handleClickRole = (event: any) => {
    setAnchorElMenu(event.currentTarget)
  }

  const handleAddUser = () => {
    const foundUser = listUsers?.find((user) => user.email === selectedEmail)
    if (!foundUser) {
      toast.error('Not Found Email')
      return
    }

    const user = {
      user_id: foundUser?._id,
      project_role: role
    } as SharedUser

    mutate(user, {
      onError: () => {
        toast.error('Cant add user to project')
      },
      onSuccess: () => {
        toast.success('Add user success')
        refreshQuery()
      }
    })
  }
  return (
    <>
      <Autocomplete
        onChange={(event, value) => {
          if (value) {
            setSelectedEmail(value)
          }
        }}
        style={{ width: '100%' }}
        freeSolo
        autoComplete
        autoHighlight
        options={myOptions}
        renderInput={(params) => (
          <div className='flex justify-around gap-3 items-center'>
            <div className='relative flex-1'>
              <TextField
                {...params}
                variant='outlined'
                placeholder='Search User'
                sx={{
                  paddingTop: '1px',
                  '& .MuiInputBase-root .MuiInputBase-input': { paddingX: '6px', paddingY: '5px' },
                  height: '36px'
                }}
              />
            </div>
            <SelectComponent
              value={role}
              options={[
                { label: 'User', value: 'User' },
                { label: 'Admin', value: 'Admin' }
              ]}
              handleChange={handleChange}
            ></SelectComponent>
            <ButtonPrimary startIcon={<ControlPointIcon></ControlPointIcon>} onClick={handleAddUser}>
              Add
            </ButtonPrimary>
          </div>
        )}
        sx={{ '& .MuiInputBase-root': { paddingX: '6px', paddingY: '1px' }, marginTop: '10px', width: '100%' }}
      />
      <TableContainer component={Paper} sx={{ maxHeight: 280, marginTop: '10px', height: 280 }}>
        <Table sx={{ minWidth: 700 }} stickyHeader aria-label='sticky table'>
          <TableHead className='bg-slate-200'>
            <TableRow>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell align='center'>Status</StyledTableCell>
              <StyledTableCell align='center'>Role</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {project?.shared_users &&
              project?.shared_users?.length > 0 &&
              project?.shared_users?.map((user) => (
                <StyledTableRow key={user.user_id}>
                  <StyledTableCell component='th' scope='row'>
                    {user.email}
                  </StyledTableCell>
                  <StyledTableCell align='center'>
                    {user?.isPending && <Chip label='Pending' size='small' variant='outlined' color='warning' />}
                    {!user?.isPending && <Chip label='Access' size='small' variant='outlined' color='success' />}
                  </StyledTableCell>
                  <StyledTableCell align='center'>
                    <Button
                      onClick={handleClickRole}
                      sx={{ width: '96px' }}
                      endIcon={<ExpandMoreIcon></ExpandMoreIcon>}
                    >
                      User
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <PopoverComponent anchorElement={anchorElMenu} handleClose={handleCloseUserMenu}>
        <MenuItem
          onClick={() => {}}
          sx={{
            ':hover': {
              color: '#206bc4',
              backgroundColor: '#E6F7FF',
              fontWeight: '500'
            }
          }}
          className='hover:bg-primary-50'
        >
          <span className='hover:bg-primary-50'>Admin</span>
        </MenuItem>
        <MenuItem
          onClick={() => {}}
          sx={{
            ':hover': {
              color: '#206bc4',
              backgroundColor: '#E6F7FF',
              fontWeight: '500'
            }
          }}
          className='hover:bg-primary-50'
        >
          <span className='hover:bg-primary-50'>User</span>
        </MenuItem>
        <hr></hr>
        <MenuItem
          onClick={() => {}}
          sx={{
            ':hover': {
              color: '#206bc4',
              backgroundColor: '#E6F7FF',
              fontWeight: '500'
            }
          }}
          className='hover:bg-primary-50'
        >
          <span className='hover:bg-primary-50'>Remove Access</span>
        </MenuItem>
      </PopoverComponent>
    </>
  )
}
