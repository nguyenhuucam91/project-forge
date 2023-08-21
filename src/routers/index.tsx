import Home from 'src/modules/home/index'
import LayoutProject from 'src/views/pages/LayoutProject'
import { createBrowserRouter } from 'react-router-dom'
import { routers } from 'src/config/routers'
import Projects from 'src/modules/project'
import ForgeView from 'src/modules/ForgeView'
import Documents from 'src/modules/documents'
import Login from 'src/modules/authentication/page/Login'
import Register from '../modules/authentication/page/Register/index'
import ErrorPage404 from 'src/views/errors/ErrorPage404'
import MustLogin from 'src/middlewares/MustLogin'
import ProjectDetail from 'src/modules/project/pages/ProjectDetail/ProjectDetail'
import ProjectAdmin from 'src/modules/project/pages/ProjectAdmin'

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
    element: (
      <MustLogin>
        <LayoutProject />
      </MustLogin>
    ),
    children: [
      {
        path: routers.web.project.projects,
        element: <Projects />
      },
      {
        path: routers.web.project.projectsArchived,
        element: <Projects />
      },
      {
        path: routers.web.project.projectsAdmin,
        element: <ProjectAdmin />
      },
      {
        path: routers.web.project.projectDetail,
        element: <ProjectDetail />
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
  },
  {
    path: '*',
    element: <ErrorPage404 />
  }
])
