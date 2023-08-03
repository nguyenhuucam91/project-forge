import { Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { routers } from 'src/config/routers'

export default function Home() {
  const navigate = useNavigate()
  return (
    <div className='flex items-center justify-center gap-3 flex-col h-full'>
      <h2>Home</h2>
      <Button
        onClick={() => {
          navigate(routers.web.project.project)
        }}
      >
        Goto Page Projects
      </Button>
    </div>
  )
}
