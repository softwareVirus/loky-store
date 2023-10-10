require("dotenv").config();

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var passport = require("passport");
var session = require("express-session");
const mongoose = require("mongoose");
const MongoStore = require('connect-mongo')

require('./db-connection')

const usersRouter = require('./routes/users')
const authRouter = require('./routes/auth')
const productRouter = require('./routes/product')
const contactRouter = require('./routes/contact')
const orderRouter = require('./routes/order')

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    secret: "loky store",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
      mongoUrl: process.env.MONGODB_CONNECTION_STRING,
      stringify: false,
    }),
  })
);
app.use(passport.authenticate("session"));
app.use('/users', usersRouter)
app.use('/auth', authRouter)
app.use('/order', orderRouter)
app.use('/contact', contactRouter)
app.use('/product', productRouter)
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.listen(3005, () => console.log('listen'))

module.exports = app;