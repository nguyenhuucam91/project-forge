export const routers = {
  web: {
    local_host: '',
    authentication: {
      login: 'login',
      logout: 'logout'
    }
  },
  api: {
    local_host: 'https://localhost:44367/api',
    forge: {
      accessToken: '/forge/oauth/token'
    }
  }
}
