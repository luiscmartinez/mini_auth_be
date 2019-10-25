require('dotenv').config()
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const passport = require('passport')
const logger = require('morgan')
const cookieSession = require('cookie-session')

const corsOptions = {
  credentials: true,
  origin: [
    'http://localhost:3000',
    'http://localhost:5000',
    'http://localhost:3001',
    'https://learnedadev.netlify.com',
    'https://learnlocker.dev',
    'http://127.0.0.1:80',
    'https://127.0.0.1:80',
  ],
}

module.exports = server => {
  server.use(express.json())
  server.use(
    cookieSession({
      name: 'learned-a',
      keys: [process.env.COOKIE_KEY],
      maxAge: 24 * 60 * 60 * 1000,
    })
  )
  server.use(cors(corsOptions))
  server.use(helmet())
  server.use(logger('dev'))
  server.use(passport.initialize())
  server.use(passport.session())
}
