export const routers = {
  web: {
    authentication: {
      login: 'login',
      register: 'register',
      signup: 'signup',
      logout: 'logout',
      refresh_token: 'refresh-token'
    },
    project: {
      projectDetail: '/projects/:id',
      projectsAdmin: '/admin/projects/',
      projects: '/projects',
      projectStringFormat: '/projects/{0}',
      projectsArchived: '/projects/archived'
    },
    documents: {
      document: '/project/:id/documents',
      documentStringFormat: '/project/{0}/documents',
      view: '/project/:projectid/documents/:docid',
      viewStringFormat: '/project/{0}/documents/{1}'
    },
    errors: {
      notFound: '/404',
      unauthorized: '/403',
      internalError: '/500'
    }
  },
  api: {
    baseUrl: 'http://localhost:3031/v1/api/',
    authentication: {
      login: 'users/login',
      register: 'users/register',
      logout: 'users/logout',
      refresh_token: 'refresh-token'
    },
    forge: {
      accessToken: '/forge/token'
    }
  }
}
