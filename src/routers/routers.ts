export const routers = {
  web: {
    local_host: '',
    authentication: {
      login: 'login',
      logout: 'logout'
    },
    project: {
      project: 'project/:id',
      view: 'project/:id/:urn',
      projectStringFormat: 'project/{0}',
      viewStringFormat: 'project/{0}/{1}'
    }
  },
  api: {
    local_host: 'https://localhost:44367/api',
    forge: {
      accessToken: '/forge/oauth/token'
    }
  }
}
