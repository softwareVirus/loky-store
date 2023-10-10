const express = require('express')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const crypto = require('crypto')
const User = require('../models/user')
const { ensureSession } = require('./middleware')
const router = express.Router()

passport.use(
  'local-sign',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, cb) => {
      console.log('here', email, password)
      User.findOne({ email }, function (err, user) {
        console.log(err, user._id)
        if (err !== null) return cb(err)
        if (user === null) {
          console.log('here1')
          return cb(null, false, { message: 'Incorrect username or password.' })
        }
        try {
          const hashedPassword = crypto.scryptSync(password, user.salt, 32)
          if (hashedPassword.toString('hex') !== user.password) {
            return cb(null, false, { message: 'Incorrect email or password.' })
          }

          return cb(null, user)
        } catch (e) {
          console.log(e)
          cb(e)
        }
      })
    }
  )
)

passport.serializeUser((user, cb) => {
  console.log(user, 'here')
  cb(null, user)
})

passport.deserializeUser(async (userId, cb) => {
  const user = await User.findById(userId)
  console.log(user, 1)
  if (!user) return cb(new Error('User not found'))

  return cb(null, false)
})

router.post(
  '/login',
  passport.authenticate('local-sign', { failureRedirect: '/login', failureMessage: true }),
  function (req, res) {
    res.send(req.user)
  }
)
router.post('/login/password', passport.authenticate('local'), (req, res, next) => {
  var user = {
    id: req.user.id,
  }
  if (req.user.name) {
    user.name = req.user.name
  }
  if (req.user.username) {
    user.username = req.user.username
  }
  res.json({ user })
})

router.get('/logout', (req, res, next) => {
  req.logout(err => {
    console.log(err)
    if (err) return next(err)

    return res.redirect('/')
  })
})
/*
router.post('/logout', passport.authenticate('session'),function (req, res, next) {
  req.logout((err) => console.log(err))
  req.session.destroy(err => console.log(err))
  res.end()
})*/

router.post('/signup', async function (req, res, next) {
  let salt = crypto.randomBytes(16)
  try {
    const hashedPassword = crypto.scryptSync(req.body.password, salt.toString('hex'), 32)
    console.log(hashedPassword.toString('hex'))
    const user = await User.create({
      ...req.body,
      isAdmin: true,
      password: hashedPassword.toString('hex'),
      salt: salt.toString('hex'),
      favoriteProducts: [],
    })

    let tmpUser = user
    req.login(tmpUser, function (err) {
      console.log(err)
      if (err) {
        return next(err)
      }
      /*req.session.save(async err => {
        const { _id, firstName, lastName, email, favoriteProducts } = req.user
        console.log(req.session)
        res.send({
          _id,
          firstName,
          lastName,
          email,
          favoriteProducts,
        })
      })*/
      console.log(req.session)
      res.json(user)
    })
  } catch (e) {
    console.log(e)
    next(e)
  }
})

router.get('/session', ensureSession, (req, res) => {
  res.json(req.user)
})
module.exports = router
