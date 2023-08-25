const express = require('express')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const crypto = require('crypto')
const User = require('../models/user')
const router = express.Router()

passport.use('local-sign',
  new LocalStrategy({
    usernameField: "email",
    passwordField: "password"
  },async (email, password, cb) => {
    const user = User.findOne({ email }, function (err, user) {
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
  console.log(user,cb)
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
  '/login',
  passport.authenticate('local-sign', {
    successRedirect: '/',
    failureRedirect: '/',
  })
);

router.post('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err)
    }
    res.redirect('/')
  })
})

router.post('/signup', async function (req, res, next) {
  let salt = crypto.randomBytes(16)
  try {
    const hashedPassword = crypto.scryptSync(req.body.password, salt, 310000)
console.log(req.body)
    const user = await User.create({
      ...req.body,
      password: hashedPassword,
      salt,
      orderItems: [],
    })


    let tmpUser = user._id
    req.login(tmpUser, function (err) {
      if (err) {
        console.log(err)
        return next(err)
      }
      res.redirect('/')
    })
  } catch (e) {
    console.log(e)
    next(e)
  }
})

module.exports = router
