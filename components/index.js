const router = require('express').Router()

module.exports = server => {
  require('./auth')(server)
  // require('./users')(server)
}
