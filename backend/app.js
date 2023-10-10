require("dotenv").config();

const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const passport = require("passport");
const session = require("express-session");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");
const cors = require("cors");
const bodyParser = require('body-parser')
console.log(process.env.MONGODB_CONNECTION_STRING)
const connectionString =
  process.env.MONGODB_CONNECTION_STRING || "mongodb://localhost";

mongoose.set("debug", true);

mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connection established."))
  .catch((e) => console.log(e,'dsadsadsa'));
  console.log(process.env.MONGODB_CONNECTION_STRING)

const usersRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const productRouter = require("./routes/product");
const contactRouter = require("./routes/contact");
const orderRouter = require("./routes/order");

const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  })
)
app.locals.pluralize = require("pluralize");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json())
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
      mongoUrl: connectionString,
      stringify: false,
    }),
  })
);
console.log(process.env.MONGODB_CONNECTION_STRING)
app.use(passport.session())
app.use('/users', usersRouter)
app.use('/auth', authRouter)
app.use('/order', orderRouter)
app.use('/contact', contactRouter)
app.use('/product', productRouter)
app.get('/error', (req,res) => {
  console.log('error')
  res.status(200).send('Error')
})
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

app.listen(3005, (port) => console.log('listen',port) )
module.exports = app;
