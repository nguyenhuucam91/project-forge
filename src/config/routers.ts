export const routers = {
  web: {
    local_host: '',
    authentication: {
      login: 'login',
      logout: 'logout'
    },
    project: {
      project: '/project/:id',
      projectStringFormat: '/project/{0}'
    },
    documents: {
      document: '/project/:id/documents',
      documentStringFormat: '/project/{0}/documents',
      view: '/project/:projectid/documents/:docid',
      viewStringFormat: '/project/{0}/documents/{1}'
    }
  },
  api: {
    local_host: 'https://localhost:44367/api',
    forge: {
      accessToken: '/forge/oauth/token'
    }
  }
}
