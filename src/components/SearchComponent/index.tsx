import React from 'react'
import SearchIcon from '@mui/icons-material/Search'

type SearchType = {
  handleChange: () => void
  placeholder: string
}
export default function SearchComponent({ handleChange, placeholder }: SearchType) {
  return (
    <div className='w-full flex items-center border-b-2 border-b-blueColor'>
      <SearchIcon sx={{ color: '#206bc4' }}></SearchIcon>
      <input
        className='text-base p-[5px] pl-2 rounded-lg outline-none flex-1 '
        placeholder={placeholder}
        onChange={handleChange}
        onBlur={handleChange}
      ></input>
    </div>
  )
}
