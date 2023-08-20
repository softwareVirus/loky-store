const express = require('express')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const crypto = require('crypto')
const User = require('../models/user')
const router = express.Router()

passport.use(
  new LocalStrategy(function verify(email, password, cb) {
    const user = User.findOne({ email }, '', function (err, user) {
      if (err) return cb(err)
      if (user === null) return cb(null, false, { message: 'Incorrect username or password.' })
      crypto.scrypt(password, user.salt, 32, (err, hashedPassword) => {
        if (err) return cb(err)

        if (hashedPassword.toString('hex') !== user.password) {
          return cb(null, false, { message: 'Incorrect email or password.' })
        }

        return cb(null, user)
      })
    })
  })
)

passport.serializeUser((user, cb) => {
  process.nextTick(() => {
    cb(null, user._id)
  })
})

passport.deserializeUser(async (userId, cb) => {
  const user = await User.findById(userId)

  if (!user) return cb(new Error('User not found'))

  return cb(null, user)
})

router.post(
  '/login/password',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
  })
)

router.post('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err)
    }
    res.redirect('/sign-up')
  })
})

router.post('/signup', function (req, res, next) {
  let salt = crypto.randomBytes(16)
  crypto.scrypt(req.body.password, salt, 310000, 32, 'sha256', function (err, hashedPassword) {
    if (err) {
      return next(err)
    }
    User.create(
      {
        ...req.body,
        salt,
        orderItems: []
      },
      function (err) {
        if (err) {
          return next(err)
        }
        let user = {
          id: this.lastID,
          username: req.body.username,
        }
        req.login(user, function (err) {
          if (err) {
            return next(err)
          }
          res.redirect('/')
        })
      }
    )
  })
})

module.exports = router
