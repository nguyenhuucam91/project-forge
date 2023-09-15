import { url } from 'src/config/url'
import { lazy } from 'react'
import Loadable from 'src/components/Loadable'

const Projects = Loadable(lazy(() => import('src/modules/project')))
const ProjectAdmin = Loadable(lazy(() => import('src/modules/project/pages/ProjectAdmin')))
const ProjectArchived = Loadable(lazy(() => import('src/modules/project/pages/ProjectArchived')))
const ProjectDetail = Loadable(lazy(() => import('src/modules/project/pages/ProjectDetail/ProjectDetail')))
const Documents = Loadable(lazy(() => import('src/modules/documents')))
const ForgeView = Loadable(lazy(() => import('src/modules/ForgeView')))

const projectRoutes = [
  {
    path: url.web.project.projects,
    element: Projects
  },
  {
    path: url.web.project.projectsArchived,
    element: ProjectArchived
  },
  {
    path: url.web.project.projectsAdmin,
    element: ProjectAdmin
  },
  {
    path: url.web.project.projectDetail,
    element: ProjectDetail
  },
  {
    path: url.web.documents.document,
    element: Documents
  },
  {
    path: url.web.documents.view,
    element: ForgeView
  }
]
export default projectRoutes
