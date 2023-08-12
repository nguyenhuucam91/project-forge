import { Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { format } from 'react-string-format'
import { routers } from 'src/config/routers'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import PhoneIcon from '@mui/icons-material/Phone'
import SearchIcon from '@mui/icons-material/Search'
import LanguageIcon from '@mui/icons-material/Language'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

export default function Home() {
  const navigate = useNavigate()
  return (
    <div className='flex items-center justify-center gap-3 flex-col h-full'>
      {/* header */}
      <div className='w-full fixed h-screen top-0 left-0'>
        <div className='shadow-sm shadow-[#b2cded] h-[58px] '>
          <div className='max-w-[1344px] mx-auto my-0 h-full '>
            <ul className='flex items-center justify-around gap-4 h-full text-textColor text-base font-medium leading-5'>
              <li>
                <a href='/#'>
                  <img
                    alt='logo'
                    srcSet='https://www.autodesk.com/bim-360/app/themes/bim360/assets/img/logos/nav-logo-desktop.png 1x, https://www.autodesk.com/bim-360/app/themes/bim360/assets/img/logos/nav-logo-desktop@2x.png 2x, https://www.autodesk.com/bim-360/app/themes/bim360/assets/img/logos/nav-logo-desktop@3x.png 3x'
                  />
                </a>
              </li>
              <li className='border-b-2 border-transparent hover:border-b-2 hover:border-b-textColor h-full flex items-center pt-[2px]'>
                <a href='/#'>
                  Solution<ExpandMoreIcon className='mb-1'></ExpandMoreIcon>
                </a>
              </li>
              <li className='border-b-2 border-transparent hover:border-b-2 hover:border-b-textColor h-full flex items-center pt-[2px]'>
                <a href='/#'>
                  Product<ExpandMoreIcon className='mb-1'></ExpandMoreIcon>
                </a>
              </li>
              <li className='border-b-2 border-transparent hover:border-b-2 hover:border-b-textColor h-full flex items-center pt-[2px]'>
                <a href='/#'>
                  Resources<ExpandMoreIcon className='mb-1'></ExpandMoreIcon>
                </a>
              </li>
              <li className='border-b-2 border-transparent hover:border-b-2 hover:border-b-textColor h-full flex items-center pt-[2px]'>
                <a href='/#'>Pricing</a>
              </li>
              <li className='border-b-2 border-transparent hover:border-b-2 hover:border-b-textColor h-full flex items-center pt-[2px]'>
                <a href='/#'>Contact & Support</a>
              </li>
              <li className='border-b-2 border-transparent hover:border-b-2 hover:border-b-textColor h-full flex items-center pt-[2px]'>
                <a href='/#'>
                  <PhoneIcon className='mb-1'></PhoneIcon> (800)646-0796
                </a>
              </li>
              <li className=''>
                <a
                  href='/#'
                  className='px-4 py-3 border border-textColor rounded-md hover:scale-125 transform-gpu transition-all duration-300 hover:shadow-lg hover:shadow-[#7db4c9]'
                >
                  Get a demo
                </a>
              </li>
              <li>
                <a href='/login'>Login</a>
              </li>
              <li>
                <a href='/#'>
                  <SearchIcon></SearchIcon>
                </a>
              </li>
              <li>
                <a href='/#'>
                  <LanguageIcon></LanguageIcon>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* content */}
      <div className='flex-1 w-full z-0 mt-[58px] px-[130px] pt-[90px] text-textColor text-sm'>
        {/* desc */}
        <div className='flex flex-col gap-4 justify-start'>
          <h2 className='text-base leading-5'>AUTODESK CONSTRUCTION CLOUD</h2>
          <h1 className='text-[58px] leading-[70px] w-1/2'>Connect your workflows, teams, and data.</h1>
          <p className='text-[20px] leading-[32px] w-1/2'>
            Experience deeper connected construction. BIM 360 is part of the Autodesk Construction Cloud, connecting
            workflows, teams, and data to help you build better.
          </p>
          <div className='flex justify-start items-center gap-4'>
            <a
              href='/#'
              className='bg-gradient-to-r from-[#1858A8]  to-[#0696D7] text-base text-white py-3 px-6 rounded-sm'
            >
              Get a demo
            </a>
            <div className='group text-base cursor-pointer'>
              <span>Explore Autodesk Construction Cloud</span>
              <span className='hover:translate-x-3 ml-2 transition-all'>
                <ArrowForwardIcon className=' cursor-pointer'></ArrowForwardIcon>
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* <h2>Home</h2>
      <Button
        onClick={() => {
          navigate(format(routers.web.project.projectStringFormat, '1'))
        }}
      >
        Goto Page Projects
      </Button> */}
    </div>
  )
}
