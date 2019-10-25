require('dotenv').config()
const passport = require('passport')
const GitHubStrategy = require('passport-github').Strategy

const db = require('../../dbConfig')

passport.serializeUser((user, done) => done(null, user.id))

passport.deserializeUser((id, done) => {
  db('users')
    .where({ id: id })
    .first()
    .then(user => {
      if (!user) {
        done(new Error('User not found ' + id))
      }
      done(null, user)
    })
})

/*  ================== GITHUB ================== */

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: '/auth/github/cb',
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await db('users')
          .where('provider_id', profile.id)
          .first()
        if (existingUser) {
          return done(null, existingUser)
        } else {
          await db('users')
            .insert({
              provider_id: profile.id,
              username: profile.username,
              avatar: profile.photos[0].value,
            })
            .returning('*')
            .then(async user_obj => {
              user_obj = user_obj[0]
              // if (process.env.NODE_ENV === 'production') {
              //   await learnLockerToms(user_obj.id)
              // }
              return done(null, user_obj)
            })
        }
      } catch (err) {
        return done(err)
      }
    }
  )
)
