import { Menu, PopoverProps, SxProps, Theme } from '@mui/material'
import React from 'react'

type PopoverComponentType = {
  sx: SxProps<Theme> | undefined
  handleClose: () => void
  anchorElement: PopoverProps['anchorEl'] | undefined | null
  children: React.ReactNode
  horizontal: 'left' | 'center' | 'right' | number
}

export default function PopoverComponent({
  sx,
  anchorElement,
  children,
  horizontal = 'center',
  handleClose
}: PopoverComponentType) {
  return (
    <>
      <Menu
        sx={{ mt: '45px', ...sx }}
        anchorEl={anchorElement}
        anchorOrigin={{
          vertical: 'top',
          horizontal: horizontal
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: horizontal
        }}
        open={Boolean(anchorElement)}
        onClose={handleClose}
      >
        {children}
      </Menu>
    </>
  )
}
