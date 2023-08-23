import { Avatar, Badge, IconButton, MenuItem, Tooltip } from '@mui/material'
import React from 'react'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import PopoverComponent from 'src/components/PopoverComponent'
import toast from 'react-hot-toast'
import authenticationService from 'src/modules/authentication/services/authentication.service'
import { getRefreshTokenFromLS } from 'src/utils/utilsLocalStorage'
import { useNavigate } from 'react-router'
import { routers } from 'src/config/routers'

// const settings = ['Profile', 'Account', 'Dashboard', 'Logout']
export default function AvatarComponent() {
  const navigate = useNavigate()
  const [anchorElUser, setAnchorElUser] = React.useState(null)

  const handleOpenUserMenu = (event: any) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const handleGoToProfile = () => {
    setAnchorElUser(null)
  }

  const handleLogout = async () => {
    try {
      const refresh_token = getRefreshTokenFromLS()
      const result = await authenticationService.logout({ refresh_token })
      console.log('🚀 ~ file: index.tsx:32 ~ handleLogout ~ result:', result)
      if (result.data.success) {
        toast.success(result.data.message)
        navigate(routers.web.authentication.login)
      } else {
        toast.error(result.data.message)
      }
    } catch (error) {
      console.log(error)
    }
    setAnchorElUser(null)
  }
  return (
    <div className='flex items-center justify-center gap-5'>
      <Badge badgeContent={4} color='primary' className='cursor-pointer mt-3'>
        <NotificationsNoneIcon className='text-primary-800' />
      </Badge>
      <Tooltip title='Profile'>
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar
            alt='Remy Sharp'
            src='https://images.unsplash.com/photo-1690671514802-266fa79d2151?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=718&q=80'
          />
        </IconButton>
      </Tooltip>

      <PopoverComponent anchorElement={anchorElUser} handleClose={handleCloseUserMenu}>
        {/* {settings.map((setting) => (
          <MenuItem
            key={setting}
            onClick={handleCloseUserMenu}
            sx={{
              ':hover': {
                color: '#206bc4',
                backgroundColor: '#E6F7FF',
                fontWeight: '500'
              }
            }}
            className='hover:bg-primary-50'
          >
            <span className='hover:bg-primary-50'>{setting}</span>
          </MenuItem>
        ))} */}
        <MenuItem
          key={'Profile'}
          onClick={handleGoToProfile}
          sx={{
            ':hover': {
              color: '#206bc4',
              backgroundColor: '#E6F7FF',
              fontWeight: '500'
            }
          }}
          className='hover:bg-primary-50'
        >
          <span className='hover:bg-primary-50'>Profile</span>
        </MenuItem>
        <MenuItem
          key={'Logout'}
          onClick={handleLogout}
          sx={{
            ':hover': {
              color: '#206bc4',
              backgroundColor: '#E6F7FF',
              fontWeight: '500'
            }
          }}
          className='hover:bg-primary-50'
        >
          <span className='hover:bg-primary-50'>Logout</span>
        </MenuItem>
      </PopoverComponent>
    </div>
  )
}
