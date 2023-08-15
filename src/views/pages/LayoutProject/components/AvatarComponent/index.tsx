import { Avatar, Badge, IconButton, MenuItem, Tooltip } from '@mui/material'
import React from 'react'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import PopoverComponent from 'src/components/PopoverComponent'

const settings = ['Profile', 'Account', 'Dashboard', 'Logout']
export default function AvatarComponent() {
  const [anchorElUser, setAnchorElUser] = React.useState(null)

  const handleOpenUserMenu = (event: any) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
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
        {settings.map((setting) => (
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
        ))}
      </PopoverComponent>
    </div>
  )
}
