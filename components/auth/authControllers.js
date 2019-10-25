const localhost_url = 'http://localhost:3000'
const url = 'https://teamallegiance.com'

const selectRedirect = (res, route) => {
  process.env.NODE_ENV === 'production'
    ? res.redirect(`${url}${route}`)
    : res.redirect(`${localhost_url}${route}`)
}
module.exports = {
  gitHubHandler(req, res, next) {
    selectRedirect(res, '/success')
  },
  logoutHandler(req, res, next) {
    req.session = null
    selectRedirect(res, '/')
  },
}
