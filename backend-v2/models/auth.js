var express = require("express");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var crypto = require("crypto");
var db = require("../db");
var router = express.Router();
const User = require("../models/user");

passport.use(
  new LocalStrategy(function verify(username, password, cb) {
    const user = User.findOne({ email: username }, function (err, user) {
      if (err) return cb(err);
      if (user === null)
        return cb(null, false, { message: "Incorrect username or password." });
      crypto.pbkdf2(
        password,
        user.salt,
        310000,
        32,
        "sha256",
        function (err, hashedPassword) {
          if (err) {
            return cb(err);
          }
          if (
            !crypto.timingSafeEqual(
              user.hashed_password,
              hashedPassword.toString("hex")
            )
          ) {
            return cb(null, false, {
              message: "Incorrect username or password.",
            });
          }
          return cb(null, row);
        }
      );
    });
  })
);
passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, user);
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

router.post(
  "/login/password",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);
router.get("/login", function (req, res, next) {
  res.render("login");
});

router.post("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

router.get("/signup", function (req, res, next) {
  res.render("signup");
});

router.post("/signup", function (req, res, next) {
  var salt = crypto.randomBytes(16);
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
      const user = await User.create({
        ...req.body,
        hashed_password: hashedPassword.toString("hex"),
        salt: salt.toString("hex"),
        isAdmin: true
      });

      let tmpUser = user._id;
      req.login(tmpUser, function (err) {
        if (err) {
          console.log(err);
          return next(err);
        }
        res.redirect("/");
      });
    }
  );
});

router.get("/session", passport.authenticate('session'),function (req, res, next) {
  res.send(req.user);
});

module.exports = router;
