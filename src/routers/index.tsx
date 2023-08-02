import Home from '../modules/home/index'
import LayoutProject from '../views/pages/LayoutProject'
import { createBrowserRouter } from 'react-router-dom'
import { routers } from './routers'
import Project from 'src/modules/project'
import ForgeView from 'src/modules/ForgeView'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home></Home>
  },
  {
    path: '/',
    element: <LayoutProject />,
    children: [
      {
        path: routers.web.project.project,
        element: <Project />
      },
      {
        path: routers.web.project.view,
        element: <ForgeView />
      }
    ]
  }
])
