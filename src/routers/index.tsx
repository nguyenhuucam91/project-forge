import Home from '../modules/home/index'
import LayoutProject from '../views/pages/LayoutProject'
import { createBrowserRouter } from 'react-router-dom'
import { routers } from '../config/routers'
import Project from 'src/modules/project'
import ForgeView from 'src/modules/ForgeView'
import Documents from 'src/modules/documents'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home></Home>
  },
  {
    element: <LayoutProject />,
    children: [
      {
        path: routers.web.project.project,
        element: <Project />
      },
      {
        path: routers.web.documents.document,
        element: <Documents />
      },
      {
        path: routers.web.documents.view,
        element: <ForgeView />
      }
    ]
  }
])
