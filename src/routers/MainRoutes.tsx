import LayoutProject from 'src/views/pages/LayoutProject'
import { createBrowserRouter } from 'react-router-dom'
import ErrorPage404 from 'src/views/errors/ErrorPage404'
import MustLogin from 'src/middlewares/MustLogin'

import AuthenticationRoutes from './authentication.routes'
import projectRoutes from './project.routes'

export const router = createBrowserRouter([
  ...AuthenticationRoutes,
  {
    element: (
      <MustLogin>
        <LayoutProject />
      </MustLogin>
    ),
    children: [...projectRoutes]
  },
  {
    path: '*',
    element: <ErrorPage404 />
  }
])
