import Home from '../modules/home/index'
import LayoutProject from '../views/pages/LayoutProject'
import { createBrowserRouter } from 'react-router-dom'
import { routers } from '../config/routers'
import Project from 'src/modules/project'
import ForgeView from 'src/modules/ForgeView'
import Documents from 'src/modules/documents'
import Login from 'src/modules/authentication/page/Login'
import Register from '../modules/authentication/page/Register/index'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home></Home>
  },
  {
    path: routers.web.authentication.login,
    element: <Login></Login>
  },
  {
    path: routers.web.authentication.signup,
    element: <Register></Register>
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
