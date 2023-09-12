import * as React from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import InputAdornment from '@mui/material/InputAdornment'
import AccountCircle from '@mui/icons-material/AccountCircle'
import IconButton from '@mui/material/IconButton'
import Visibility from '@mui/icons-material/Visibility'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import SvgIcon from '@mui/material/SvgIcon'

const currencies = [
  {
    value: 'USD',
    label: '$'
  },
  {
    value: 'EUR',
    label: '€'
  },
  {
    value: 'BTC',
    label: '฿'
  },
  {
    value: 'JPY',
    label: '¥'
  }
]

export default function SelectTextFields() {
  return (
    <Box>
      <Select
        sx={{ width: 130 }}
        defaultValue=''
        displayEmpty
        renderValue={(value) => {
          console.log(value)
          return (
            <Box sx={{ display: 'flex', gap: 1 }}>
              <img
                alt='img'
                style={{ height: '40px', width: '40px' }}
                src='https://images.unsplash.com/photo-1693922874336-fd3c4b0084b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80'
              />
              {value}
            </Box>
          )
        }}
      >
        {currencies.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            <div style={{ display: 'flex' }}>
              <img
                alt='img'
                style={{ height: '40px', width: '40px', marginRight: '15px' }}
                src='https://images.unsplash.com/photo-1693922874336-fd3c4b0084b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80'
              />
              {option.value}
            </div>
          </MenuItem>
        ))}
      </Select>
    </Box>
  )
}
