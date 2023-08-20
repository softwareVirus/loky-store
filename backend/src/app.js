const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const passport = require('passport')
const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const authRouter = require('./routes/auth')
require('./database-connection')

const app = express()
app.use(
  cors({
    origin: true,
    credentials: true,
  })
)
// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(
  session({
    secret: 'loky store session secret',
    store: new MongoStore({
      mongoUrl: process.env.MONGODB_CONNECTION_STRING,
      stringify: false,
    }),
    resave: false,
    saveUninitialized: false,
  })
)
app.all('*', (req, res, next) => {
  req.body = sanitize(req.body)
  req.headers = sanitize(req.headers)
  req.params = sanitize(req.params)

  next()
})

app.use(passport.authenticate('session'));
app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/auth', authRouter)


// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404))
})

// error handler
/* eslint-disable-next-line */
app.use((err, req, res, next) => {
  const error = {
    status: err.status || 500,
    message: err.message,
  }

  if (req.app.get('env') === 'development') {
    error.stack = err.stack
  }

  res.status(error.status)

  res.send(error)
})

module.exports = app
