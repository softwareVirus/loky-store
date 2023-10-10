const express = require("express");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const crypto = require("crypto");
const router = express.Router();
const User = require("../models/user");
const { ensureSession } = require("./middleware");

passport.use(
  "local-login",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async function verify(username, password, cb) {
      try {
        console.log("here", username, password);
        const user = await User.findOne(
          { email: username },
          {
            salt: 1,
            hashed_password: 1,
            firstName: 1,
            lastName: 1,
            email: 1,
            isAdmin: 1,
            favoriteProducts: 1,
          }
        ).exec();
        console.log(user);
        if (user === null)
          return cb(null, false, {
            message: "Incorrect username or password.",
          });
        crypto.pbkdf2(
          password,
          user.salt.toString("hex"),
          310000,
          32,
          "sha256",
          function (err, hashedPassword) {
            if (err) {
              return cb(err);
            }
            console.log(
              hashedPassword.toString("hex") === user.hashed_password
            );
            if (user.hashed_password !== hashedPassword.toString("hex")) {
              return cb(null, false, {
                message: "Incorrect username or password.",
              });
            }
            return cb(null, {
              _id: user._id,
              firstName: user.firstName,
              lastName: user.lastName,
              isAdmin: user.isAdmin,
              email: user.email,
              favoriteProducts: user.favoriteProducts,
            });
          }
        );
      } catch (e) {
        console.log(e);
        cb(e);
      }
    }
  )
);
passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      isAdmin: user.isAdmin,
      email: user.email,
      favoriteProducts: user.favoriteProducts,
    });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      isAdmin: user.isAdmin,
      email: user.email,
      favoriteProducts: user.favoriteProducts,
    });
  });
});

router.post(
  "/login/password",
  passport.authenticate("local-login", {
    successRedirect: "/auth/session",
    failureRedirect: "/error",
  })
);

router.get("/login", function (req, res, next) {
  res.send("login");
});

router.post("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.status(200).send("Success");
  });
});

router.get("/signup", function (req, res, next) {
  res.render("signup");
});

router.post("/signup", function (req, res, next) {
  const salt = crypto.randomBytes(16);
  console.log(req.body);
  crypto.pbkdf2(
    req.body.password,
    salt.toString("hex"),
    310000,
    32,
    "sha256",
    async function (err, hashedPassword) {
      if (err) {
        return next(err);
      }
      try {
        const user = await User.create({
          ...req.body,
          hashed_password: hashedPassword.toString("hex"),
          salt: salt.toString("hex"),
          favoriteProducts: [],
          isAdmin: true,
        });
        let tmpUser = user;
        req.login(tmpUser, function (err) {
          if (err) {
            console.log(err);
            return next(err);
          }
          res.status(200).send({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            isAdmin: user.isAdmin,
            email: user.email,
            favoriteProducts: user.favoriteProducts,
          });
        });
      } catch (e) {
        res.status("401").json({
          message: "Email is exist or server error"
        });
      }
    }
  );
});

router.get("/session", ensureSession, function (req, res, next) {
  const user = req.user;
  res.send({
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    isAdmin: user.isAdmin,
    email: user.email,
    favoriteProducts: user.favoriteProducts,
  });
});

module.exports = router;
