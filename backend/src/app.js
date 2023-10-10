const createError = require('http-errors')
const express = require('express')
const path = require('path')
require('dotenv').config()
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')
const session = require('express-session')
const MongoStore = require('connect-mongo');
const passport = require('passport')
const usersRouter = require('./routes/users')
const authRouter = require('./routes/auth')
const productRouter = require('./routes/product')
const contactRouter = require('./routes/contact')
const orderRouter = require('./routes/order')
const { sanitize } = require('express-mongo-sanitize')
const helmet = require('helmet')
require('./database-connection')

const app = express()
app.use(helmet())
app.use(
  cors({
    origin: true,
    credentials: true,
  })
)
app.get('/',(req,res) => {
  res.send('HEEELLLO')
})
// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.all('*', (req, res, next) => {
  req.body = sanitize(req.body)
  req.headers = sanitize(req.headers)
  req.params = sanitize(req.params)

  next()
})

app.use(
  session({
    secret: 'tombala session secret',
    store: new MongoStore({
      mongoUrl: process.env.MONGODB_CONNECTION_STRING,
      stringify: false,
    }),
    resave: false,
    saveUninitialized: false,
  })
)

app.use(passport.session());
app.use('/users', usersRouter)
app.use('/auth', authRouter)
app.use('/order', orderRouter)
app.use('/contact', contactRouter)
app.use('/product', productRouter)
//app.get('/login', (req,res) => console.log('here'))

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

app.listen(3000, () => console.log('login')) 
module.exports = app
