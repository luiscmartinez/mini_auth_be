const router = require('express').Router()
const controllers = require('./authControllers')
const db = require('../../dbConfig')
const passport = require('passport')

router.get('/github', passport.authenticate('github'))

router.get(
  '/github/cb',
  passport.authenticate('github', { failureRedirect: '/' }),
  controllers.gitHubHandler
)

router.get('/current_user', (req, res) => {
  try {
    console.log('holy shit am i logged in ???\n \n', req.user)
    if (req.user) {
      res.status(200).json(req.user)
    } else {
      res.status(200).send(false)
    }
  } catch (error) {}
})
/*  ================== LOGOUT ================== */

router.get('/logout', controllers.logoutHandler)

module.exports = router
