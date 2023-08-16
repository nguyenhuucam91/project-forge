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
      project: '/project/:id',
      projectStringFormat: '/project/{0}'
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
    baseUrl: 'https://localhost:44367/api',
    forge: {
      accessToken: '/forge/oauth/token'
    }
  }
}
