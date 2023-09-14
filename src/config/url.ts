export const url = {
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
      projectStringFormat: '/projects/{0}',
      projectsAdmin: '/admin/projects/',
      projects: '/projects',
      projectsArchived: '/projects/archived'
    },
    documents: {
      document: '/projects/:projectId/documents',
      documentStringFormat: '/projects/{0}/documents',
      view: '/projects/:projectId/documents/:docId',
      viewStringFormat: '/projects/{0}/documents/{1}'
    },
    errors: {
      notFound: '/404',
      unauthorized: '/403',
      internalError: '/500'
    }
  },
  api: {
    authentication: {
      login: 'users/login',
      register: 'users/register',
      logout: 'users/logout',
      refresh_token: 'refresh-token'
    },
    user: {
      allUser: 'users'
    },
    projectAdmin: {
      projects: '/project/projects',
      projectsArchived: '/project/projects/archived',
      projectsStringFormat: '/project/projects/{0}',
      projectUserStringFormat: '/project/projects/{0}/shared',
      projectUpdateUserStringFormat: '/project/projects/{0}/shared/{1}',
      activeProject: '/project/projects/{0}/active',
      archiveProject: '/project/projects/{0}/archive'
    },
    forge: {
      accessToken: '/forge/token',
      addMarkup: '/project/projects/{0}/files/{1}/markup',
      addIssue: '/project/projects/{0}/files/{1}/issue'
    },
    document: {
      folders: '/project/projects/{0}/folders'
    }
  }
}
